<script lang="ts" setup></script>

<template>
    <nav
        class="w-full flex justify-around items-center h-full text-white bg-red-500"
    >
        <div class="">
            <router-link to="/">
                <img src="" alt="" />
                <h1 class="">DevTask</h1>
            </router-link>
        </div>
        <ul class="flex gap-12">
            <li class="">
                <router-link class="link" to="/">Home</router-link>
            </li>
            <li class="">
                <router-link class="link" to="/projects">
                    Projects
                </router-link>
            </li>
            <li class="">
                <router-link class="link" to="/tasks">Tasks</router-link>
            </li>
            <li class="">
                <router-link class="link" to="/members">Members</router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>
