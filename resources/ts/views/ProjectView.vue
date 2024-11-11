<script lang="ts" setup>
    import { ref, Ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import CreateProjectForm from "@components/CreateProjectForm.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import { useStoreProject } from "@store/storeProject"

    import type { Project } from "@interfaces/projects"

    const store = useStoreProject()

    const isFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const isProjectCardVisible: Ref<boolean> = ref(false)
    const project: Ref<Project> = ref({
        id: "",
        name: "",
        deadline: "",
        description: "",
    })

    const showProjectCard = (): boolean => (isProjectCardVisible.value = true)
    const hideProjectCard = (): boolean => (isProjectCardVisible.value = false)

    const showForm = (isEdit: boolean): void => {
        isUpdate.value = isEdit
        isFormVisible.value = true
    }

    const hideForm = (): boolean => (isFormVisible.value = false)

    onMounted(async () => {
        await store.getProjects()
    })

    onUnmounted(() => {
        store.resetProjects()
    })

    const handleProjectCardClick = (id: string): void => {
        showProjectCard()

        store
            .getProject(id)
            .then((data) => {
                if (data) {
                    project.value = data
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleDeleteProject = (id: string): void => {
        store
            .deleteProject(id)
            .then((data) => {
                hideProjectCard()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEditProject = (currentProject: Project): void => {
        showForm(true)
    }
</script>

<template>
    <MainLayout>
        <template v-slot:main>
            <section
                class="flex flex-col bg-gray-200 w-[1200px] h-[590px] rounded-xl p-2"
            >
                <div class="border-b-[1px] border-b-secondary h-[60px] w-full">
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl text-secondary">
                            Proyectos existentes
                        </h1>
                        <button
                            class="bg-green-600 hover:bg-green-700 text-white rounded-md p-2"
                            @click="showForm(false)"
                        >
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                </div>
                <div
                    class="grid grid-cols-7 place-content-start w-full h-full overflow-y-auto gap-2 px-4"
                >
                    <div
                        v-for="project in store.projects"
                        :key="project.id"
                        @click="handleProjectCardClick(project.id ?? '')"
                        class="flex justify-center items-center w-32 h-32 bg-primary text-white rounded-xl cursor-pointer hover:scale-105 duration-300 mt-2"
                    >
                        <h1 class="flex flex-col justify-center items-center">
                            <v-icon name="fa-file-code" scale="3" />
                            {{ project.name }}
                        </h1>
                    </div>
                </div>
            </section>

            <ShowComponent>
                <div
                    v-if="isProjectCardVisible"
                    class="flex flex-col justify-start items-center absolute bg-primary w-[600px] h-[600px] text-white rounded-md z-[1000]"
                >
                    <div
                        class="flex justify-between w-full h-14 border-b-2 border-gray-200 p-2"
                    >
                        <div class="flex gap-2">
                            <button
                                class="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 rounded-sm"
                                @click="handleEditProject(project)"
                            >
                                <v-icon name="md-modeeditoutline" scale="1.5" />
                            </button>
                            <button
                                class="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 rounded-sm"
                                @click="handleDeleteProject(project.id ?? '')"
                            >
                                <v-icon name="fa-trash" scale="1.5" />
                            </button>
                        </div>

                        <v-icon
                            class="cursor-pointer"
                            name="io-close"
                            scale="1.5"
                            @click="hideProjectCard"
                        />
                    </div>

                    <h1>Nombre: {{ project.name }}</h1>
                    <h1>Descripcion: {{ project.description }}</h1>
                    <h1>Fecha de entrega: {{ project.deadline }}</h1>
                </div>
            </ShowComponent>

            <ShowComponent>
                <CreateProjectForm
                    v-if="isFormVisible"
                    :isUpdate="isUpdate"
                    :project="project"
                    @close="hideForm"
                />
            </ShowComponent>
        </template>
    </MainLayout>
</template>

<style scoped></style>
