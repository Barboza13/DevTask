import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@views/HomeView.vue"
import TaskView from "@views/TaskView.vue"
import MemberView from "@views/MemberView.vue"
import ProjectView from "@views/ProjectView.vue"

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
