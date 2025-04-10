<script lang="ts" setup>
    import { ref, Ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import CardProjectLayout from "@layouts/CardProjectLayout.vue"
    import ListProjectLayout from "@layouts/ListProjectLayout.vue"
    import ProjectForm from "@components/ProjectForm.vue"
    import TaskForm from "@components/TaskForm.vue"
    import AddMemberForm from "@components/AddMemberForm.vue"
    import ProjectCardItem from "@components/ProjectCardItem.vue"
    import ProjectListItem from "@components/ProjectListItem.vue"
    import DeleteDialog from "@components/DeleteDialog.vue"
    import MessageDialog from "@components/MessageDialog.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import ShowMessageComponent from "@transitions/ShowMessageComponent.vue"
    import ProjectService from "@services/ProjectService"
    import { useProjectStore } from "@stores/projectStore"

    import type { Project } from "@interfaces/interfaces"

    const service = new ProjectService()
    const store = useProjectStore()
    const projects: Ref<Project[]> = ref([])
    const isProjectFormVisible: Ref<boolean> = ref(false)
    const isAddMemberFormVisible: Ref<boolean> = ref(false)
    const isTaskFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const seeBy: Ref<string> = ref(store.typeProjectView)
    const isProjectCardVisible: Ref<boolean> = ref(false)
    const isDeleteDialogVisible: Ref<boolean> = ref(false)
    const isMessageDialogVisible: Ref<boolean> = ref(false)
    const dialogMessage: Ref<string> = ref("")
    const isLoading: Ref<boolean> = ref(false)
    const project: Ref<Project> = ref({
        id: "",
        name: "",
        deadline: "",
        description: "",
        status: "in_progress",
        members: [],
    })

    const resetProjects = async (): Promise<void> => {
        service.clearProjects()
        await service.fetchProjects()
        projects.value = service.getProjects()
    }

    onMounted(async () => {
        isLoading.value = true

        try {
            await service.fetchProjects()
            projects.value = service.getProjects()
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    })

    onUnmounted(() => service.clearProjects())

    const changeProjectCardVisibility = (): boolean =>
        (isProjectCardVisible.value = !isProjectCardVisible.value)

    const showProjectForm = (isEdit: boolean): void => {
        isUpdate.value = isEdit
        isProjectFormVisible.value = true
    }

    const hideProjectForm = (): boolean => (isProjectFormVisible.value = false)

    const showAddMemberForm = (): boolean =>
        (isAddMemberFormVisible.value = true)
    const hideAddMemberForm = (): boolean =>
        (isAddMemberFormVisible.value = false)

    const showTaskForm = (isEdit: boolean): void => {
        isUpdate.value = isEdit
        isTaskFormVisible.value = true
    }
    const hideTaskForm = (): boolean => (isTaskFormVisible.value = false)

    const handleProjectClick = (id: string): void => {
        const projectData: Project | undefined = service.getProjectById(id)

        if (!projectData) {
            alert("¡Proyecto no encontrado!")
            return
        }

        project.value = projectData
        changeProjectCardVisibility()
    }

    const changeDeleteDialogVisibility = (): boolean =>
        (isDeleteDialogVisible.value = !isDeleteDialogVisible.value)

    const showMessageDialog = (message: string): void => {
        if (message === "") message = "¡Evento desconocido!"

        dialogMessage.value = message
        isMessageDialogVisible.value = true
    }

    const hideMessageDialog = (): boolean =>
        (isMessageDialogVisible.value = false)

    const handleDeleteProject = async (id: string): Promise<void> => {
        try {
            const response = await service.deleteProject(id)

            if (response) {
                showMessageDialog(response.message)
                setTimeout(() => hideMessageDialog(), 3000)
            }

            resetProjects()
            changeProjectCardVisibility()
        } catch (error) {
            showMessageDialog((error as Error).message)
            setTimeout(() => hideMessageDialog(), 3000)
        }
    }

    const handleEditProject = (): void => {
        changeProjectCardVisibility()
        showProjectForm(true)
    }
</script>

<template>
    <div
        v-if="isProjectCardVisible"
        class="absolute w-full h-full z-[999] bg-black opacity-70"
    ></div>
    <div
        v-if="isProjectFormVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <div
        v-if="isAddMemberFormVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <div
        v-if="isTaskFormVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <div
        v-if="isDeleteDialogVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <MainLayout>
        <template #main>
            <section
                class="relative flex flex-col bg-gray-200 w-[1200px] h-[500px] rounded-xl p-2"
            >
                <div class="border-b-[1px] border-b-secondary h-[60px] w-full">
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl text-secondary">
                            Proyectos existentes
                        </h1>
                        <div class="flex items-center h-8 w-48">
                            <h3 class="text-sm w-[30%] text-secondary">
                                Ver por:
                            </h3>
                            <select
                                class="h-full w-[70%] cursor-pointer rounded-md"
                                v-model="seeBy"
                                @change="store.setTypeProjectView(seeBy)"
                            >
                                <option value="card">Tarjeta</option>
                                <option value="list">Lista</option>
                            </select>
                        </div>
                        <button
                            class="flex justify-center text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 gap-1"
                            @click="showProjectForm(false)"
                        >
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                </div>

                <!-- Loading icon -->
                <v-icon
                    v-if="isLoading"
                    class="absolute inset-0 m-auto w-20 h-20"
                    name="ri-loader-4-line"
                    scale="1"
                    animation="spin"
                />
                <!--  -->

                <CardProjectLayout v-show="seeBy === 'card'">
                    <ProjectCardItem
                        :projects="projects"
                        :is-loading="isLoading"
                        @handleProjectClick="handleProjectClick"
                    />
                </CardProjectLayout>

                <ListProjectLayout v-show="seeBy === 'list'">
                    <ProjectListItem
                        :projects="projects"
                        :is-loading="isLoading"
                        @handleProjectClick="handleProjectClick"
                    />
                </ListProjectLayout>
            </section>

            <ShowComponent>
                <div
                    v-if="isProjectCardVisible"
                    class="flex flex-col justify-start items-center absolute top-20 bg-primary w-[500px] h-[300px] text-white rounded-md z-[1000]"
                >
                    <div
                        class="flex justify-between w-full h-14 border-b-2 border-gray-200 p-2"
                    >
                        <div class="flex gap-2">
                            <button
                                class="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 transition-color duration-200 ease-in rounded-sm"
                                @click="handleEditProject"
                            >
                                <v-icon name="md-modeeditoutline" scale="1.5" />
                            </button>
                            <button
                                class="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 transition-color duration-200 ease-in rounded-sm"
                                @click="changeDeleteDialogVisibility"
                            >
                                <v-icon name="fa-trash" scale="1.5" />
                            </button>
                            <button
                                class="w-36 h-[40px] bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-sm"
                                @click="showTaskForm(false)"
                            >
                                Nueva Tarea
                            </button>
                            <button
                                class="w-36 h-[40px] bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-sm"
                                @click="showAddMemberForm"
                            >
                                Agregar miembro
                            </button>
                        </div>

                        <v-icon
                            class="cursor-pointer"
                            name="io-close"
                            scale="1.5"
                            @click="changeProjectCardVisibility"
                        />
                    </div>

                    <section
                        class="flex flex-col justify-center items-start w-full px-4"
                    >
                        <h1>Nombre: {{ project.name }}</h1>
                        <h1>Descripcion: {{ project.description }}</h1>
                        <h1>
                            Estado:
                            {{
                                project.status == "finished"
                                    ? "Terminado"
                                    : project.status == "in_progress"
                                      ? "En progreso"
                                      : "Expirado"
                            }}
                        </h1>
                        <h1>Fecha de entrega: {{ project.deadline }}</h1>
                        <h1>Integrantes:</h1>
                        <ul>
                            <li
                                v-if="project.members.length > 0"
                                v-for="member in project.members"
                                :key="member.id"
                                class="list-disc ml-10"
                            >
                                {{ member.name }}
                            </li>
                            <li v-else class="list-disc ml-10">
                                Sin integrantes
                            </li>
                        </ul>
                    </section>
                </div>
            </ShowComponent>

            <!-- Project form -->
            <ShowComponent>
                <ProjectForm
                    v-if="isProjectFormVisible"
                    :isUpdate="isUpdate"
                    :project="project"
                    @close="hideProjectForm"
                    @resetProjects="resetProjects"
                    @showMessageDialog="showMessageDialog"
                    @hideMessageDialog="hideMessageDialog"
                />
            </ShowComponent>
            <!-- ------------ -->

            <ShowComponent>
                <AddMemberForm
                    v-if="isAddMemberFormVisible"
                    :project_id="parseInt(project.id ?? '0')"
                    @close="hideAddMemberForm"
                    @showMessageDialog="showMessageDialog"
                    @hideMessageDialog="hideMessageDialog"
                />
            </ShowComponent>

            <ShowComponent>
                <TaskForm
                    v-if="isTaskFormVisible"
                    :isUpdate="isUpdate"
                    :project_id="parseInt(project.id ?? '0')"
                    @close="hideTaskForm"
                    @showMessageDialog="showMessageDialog"
                    @hideMessageDialog="hideMessageDialog"
                />
            </ShowComponent>

            <!-- Delete dialog -->
            <ShowComponent>
                <DeleteDialog
                    v-if="isDeleteDialogVisible"
                    @deleteRecord="handleDeleteProject(project.id ?? '')"
                    @changeDeleteDialogVisibility="changeDeleteDialogVisibility"
                />
            </ShowComponent>
            <!-- ------------ -->

            <!-- Message dialog -->
            <ShowMessageComponent>
                <MessageDialog
                    v-show="isMessageDialogVisible"
                    :message="dialogMessage"
                />
            </ShowMessageComponent>
            <!-- -------------- -->
        </template>
    </MainLayout>
</template>

<style scoped></style>
