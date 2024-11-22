<script lang="ts" setup>
    import { Router, useRouter } from "vue-router"

    interface Link {
        href: string
        text: string
    }

    const router: Router = useRouter()
    const currentPath: string = router.currentRoute.value.fullPath

    const links: Link[] = [
        { href: "/", text: "Home" },
        { href: "/projects", text: "Projects" },
        { href: "/tasks", text: "Tasks" },
        { href: "/members", text: "Members" },
    ]
</script>

<template>
    <nav
        class="w-full flex justify-around items-center h-full text-xl text-white bg-primary"
    >
        <div>
            <router-link to="/">
                <h1 class="text-3xl">DevTask</h1>
            </router-link>
        </div>
        <ul class="flex gap-6">
            <li v-for="({ href, text }, index) in links" :key="index">
                <router-link
                    v-if="currentPath === href"
                    class="link text-primary bg-gray-200 rounded-md py-1 px-5"
                    :to="href"
                >
                    {{ text }}
                </router-link>
                <router-link
                    v-else
                    class="link hover:text-primary rounded-md hover:bg-gray-200 py-1 px-5"
                    :to="href"
                >
                    {{ text }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>
