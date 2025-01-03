<script lang="ts" setup>
    import { ref, onMounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import ProjectService from "@services/ProjectService"
    import TaskService from "@services/TaskService"
    import MemberService from "@services/MemberService"

    import type { Ref } from "vue"

    const projectService = new ProjectService()
    const taskService = new TaskService()
    const memberService = new MemberService()
    const numberOfProjects: Ref<number> = ref(0)
    const numberOfTasks: Ref<number> = ref(0)
    const numberOfMembers: Ref<number> = ref(0)

    onMounted(async () => {
        await projectService.fetchProjects()
        await taskService.fetchTasks()
        await memberService.fetchMembers()

        numberOfProjects.value = projectService.getProjects().length
        numberOfTasks.value = taskService.getTasks().length
        numberOfMembers.value = memberService.getMembers().length
    })
</script>

<template>
    <MainLayout>
        <template v-slot:main>
            <section
                class="grid grid-cols-1 lg:grid-cols-3 place-content-start place-items-center w-full h-full p-4"
            >
                <div
                    class="flex flex-col justify-center items-start w-3/4 h-30 bg-gray-200 rounded-md gap-4 p-4"
                >
                    <div class="flex justify-evenly items-center w-full gap-2">
                        <v-icon name="md-foldercopy" fill="black" scale="3" />
                        <h1 class="text-3xl">Proyectos</h1>
                    </div>
                    <div class="flex justify-evenly items-center w-full gap-2">
                        <h3 class="w-1/2">Registros: {{ numberOfProjects }}</h3>
                        <router-link
                            class="flex justify-evenly items-center w-1/2 h-8 text-white bg-green-400 hover:bg-green-500 rounded-md"
                            to="/projects"
                        >
                            Ver proyectos
                            <v-icon
                                name="hi-arrow-sm-right"
                                fill="white"
                                scale="1.5"
                            />
                        </router-link>
                    </div>
                </div>
                <div
                    class="flex flex-col justify-center items-start w-3/4 h-30 bg-gray-200 rounded-md gap-4 p-4"
                >
                    <div class="flex justify-evenly items-center w-full gap-2">
                        <v-icon name="fa-file-code" fill="black" scale="3" />
                        <h1 class="text-3xl">Tareas</h1>
                    </div>
                    <div class="flex justify-evenly items-center w-full gap-2">
                        <h3 class="w-1/2">Registros: {{ numberOfTasks }}</h3>
                        <router-link
                            class="flex justify-evenly items-center w-1/2 h-8 text-white bg-green-400 hover:bg-green-500 rounded-md"
                            to="/tasks"
                        >
                            Ver tareas
                            <v-icon
                                name="hi-arrow-sm-right"
                                fill="white"
                                scale="1.5"
                            />
                        </router-link>
                    </div>
                </div>
                <div
                    class="flex flex-col justify-center items-start w-3/4 h-30 bg-gray-200 rounded-md gap-4 p-4"
                >
                    <div class="flex justify-evenly items-center w-full gap-2">
                        <v-icon name="io-person" fill="black" scale="3" />
                        <h1 class="text-3xl">Miembros</h1>
                    </div>
                    <div class="flex justify-evenly items-center w-full gap-2">
                        <h3 class="w-1/2">Registros: {{ numberOfMembers }}</h3>
                        <router-link
                            class="flex justify-evenly items-center w-1/2 h-8 text-white bg-green-400 hover:bg-green-500 rounded-md"
                            to="/members"
                        >
                            Ver miembros
                            <v-icon
                                name="hi-arrow-sm-right"
                                fill="white"
                                scale="1.5"
                            />
                        </router-link>
                    </div>
                </div>
            </section>
        </template>
    </MainLayout>
</template>

<style scoped></style>
