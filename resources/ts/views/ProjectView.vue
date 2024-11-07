<script lang="ts" setup>
    import MainLayout from "@layouts/MainLayout.vue"
    import CreateProjectForm from "@components/CreateProjectForm.vue"
    import { useStoreProject } from "@store/storeProject"
    import { ref, Ref, onMounted, onUnmounted } from "vue"

    import type { ProjectResponse } from "@interfaces/projects"

    const store = useStoreProject()
    store.getProjects()

    const isFormVisible: Ref = ref(false)
    const showForm = (): void => (isFormVisible.value = true)
    const hideForm = (): void => (isFormVisible.value = false)

    onMounted(() => {})

    const projects: Array<ProjectResponse> = store.projects

    onUnmounted(() => {
        projects.length = 0
    })
</script>

<template>
    <MainLayout>
        <template v-slot:main>
            <table
                class="flex flex-col bg-background w-[1200px] h-[590px] rounded-xl p-2"
            >
                <thead
                    class="border-b-[1px] border-b-secondary h-[60px] w-full"
                >
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl text-secondary">
                            Proyectos existentes
                        </h1>
                        <button
                            class="bg-green-600 hover:bg-green-700 text-white rounded-md p-2"
                            @click="showForm"
                        >
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                </thead>
                <tbody class="grid grid-cols-8 w-full h-full gap-2">
                    <div
                        v-for="project in projects"
                        :key="project.id"
                        class="flex justify-center items-center w-32 h-32 bg-primary text-white rounded-xl cursor-pointer hover:scale-105 duration-300 mt-2"
                    >
                        <h1 class="flex flex-col justify-center items-center">
                            <v-icon name="fa-file-code" scale="3" />
                            {{ project.name }}
                        </h1>
                    </div>
                </tbody>
            </table>
            <CreateProjectForm :isVisible="isFormVisible" @close="hideForm" />
        </template>
    </MainLayout>
</template>

<style scoped></style>
