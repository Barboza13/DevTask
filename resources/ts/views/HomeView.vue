<script lang="ts" setup>
    import { ref, onMounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import HomeCard from "@components/HomeCard.vue"
    import ProjectService from "@services/ProjectService"
    import TaskService from "@services/TaskService"
    import MemberService from "@services/MemberService"

    import homeProjectIcon from "@icons/home-project-icon.svg"
    import homeTaskIcon from "@icons/home-task-icon.svg"
    import homeMemberIcon from "@icons/home-member-icon.svg"

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
                class="grid grid-cols-1 lg:grid-cols-3 place-content-start place-items-center w-full h-full p-4 gap-4 md:gap-0"
            >
                <HomeCard
                    :record-name="'Proyectos'"
                    :link="'/projects'"
                    :record-number="numberOfProjects"
                />
                <HomeCard
                    :record-name="'Tareas'"
                    :link="'/tasks'"
                    :record-number="numberOfTasks"
                />
                <HomeCard
                    :record-name="'Miembros'"
                    :link="'/members'"
                    :record-number="numberOfMembers"
                />
            </section>
        </template>
    </MainLayout>
</template>

<style scoped></style>
