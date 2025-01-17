<script lang="ts" setup>
    import { Ref, ref } from "vue"
    import { Router, useRouter } from "vue-router"

    interface Link {
        href: string
        text: string
    }

    const router: Router = useRouter()
    const currentPath: string = router.currentRoute.value.fullPath
    const showNavItems: Ref<boolean> = ref(false)
    const links: Link[] = [
        { href: "/", text: "Home" },
        { href: "/projects", text: "Projects" },
        { href: "/tasks", text: "Tasks" },
        { href: "/members", text: "Members" },
    ]

    const handleShowNavItems = (): boolean =>
        (showNavItems.value = !showNavItems.value)
</script>

<template>
    <nav
        class="flex justify-between md:justify-evenly items-center w-full h-full bg-primary text-white px-4 md:px-0"
    >
        <router-link to="/">
            <h1 class="text-3xl">DevTask</h1>
        </router-link>
        <button class="md:hidden" @click="handleShowNavItems">
            <v-icon name="md-menu-round" fill="white" scale="2" />
        </button>
        <ul
            class="hidden justify-center items-center md:flex md:gap-6 h-full text-xl"
        >
            <li v-for="({ href, text }, index) in links" :key="index">
                <router-link
                    v-if="currentPath === href"
                    class="text-primary bg-gray-200 rounded-md py-1 px-5"
                    :to="href"
                >
                    {{ text }}
                </router-link>
                <router-link
                    v-else
                    class="hover:text-primary rounded-md hover:bg-gray-200 py-1 px-5"
                    :to="href"
                >
                    {{ text }}
                </router-link>
            </li>
        </ul>
    </nav>
    <ul
        v-if="showNavItems"
        class="flex md:hidden flex-col absolute justify-center items-center w-full h-44 bg-primary text-xl text-white transition-all duration-500 ease-out gap-3"
    >
        <li
            v-for="({ href, text }, index) in links"
            :key="index"
            class="flex justify-center items-center w-full"
        >
            <router-link
                v-if="currentPath === href"
                class="flex justify-center items-center w-[50%] h-8 text-primary bg-gray-200 rounded-md px-5"
                :to="href"
            >
                {{ text }}
            </router-link>
            <router-link
                v-else
                class="flex justify-center items-center w-[50%] h-8 hover:text-primary hover:bg-gray-200 rounded-md px-5"
                :to="href"
            >
                {{ text }}
            </router-link>
        </li>
    </ul>
</template>

<style scoped></style>
