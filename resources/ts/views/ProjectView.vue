<script lang="ts" setup>
    import MainLayout from "@layouts/MainLayout.vue"
    import CreateProjectForm from "@components/CreateProjectForm.vue"
    import { useStoreProject } from "@store/storeProject"
    import { ref, Ref, onMounted, onUnmounted } from "vue"

    import type { ProjectResponse } from "@interfaces/projects"

    const store = useStoreProject()
    const isFormVisible: Ref = ref(false)

    const showForm = (): void => (isFormVisible.value = true)
    const hideForm = (): void => (isFormVisible.value = false)

    onMounted(() => {
        store.getProjects()
    })

    const projects: Array<ProjectResponse> = store.projects

    onUnmounted(() => {
        projects.length = 0
    })
</script>

<template>
    <MainLayout>
        <template v-slot:main>
            <table
                class="flex flex-col bg-gray-200 w-[1200px] h-[590px] rounded-xl p-2"
            >
                <thead class="border-b-[1px] border-b-black h-[60px] w-full">
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl">Proyectos existentes</h1>
                        <button
                            class="bg-green-500 text-white rounded-md p-2"
                            @click="showForm"
                        >
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                </thead>
                <tbody class="w-full h-full">
                    <tr>
                        <td
                            v-for="project in projects"
                            :key="project.id"
                            class="flex flex-col bg-red-500"
                        >
                            {{ project.name }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <CreateProjectForm :isVisible="isFormVisible" @close="hideForm" />
        </template>
    </MainLayout>
</template>

<style scoped></style>
