import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/ts/views/HomeView.vue"
import TaskView from "@/ts/views/TaskView.vue"
import MemberView from "@/ts/views/MemberView.vue"
import ProjectView from "@/ts/views/ProjectView.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/projects",
        name: "projects",
        component: ProjectView,
    },
    {
        path: "/tasks",
        name: "tasks",
        component: TaskView,
    },
    {
        path: "/members",
        name: "members",
        component: MemberView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
