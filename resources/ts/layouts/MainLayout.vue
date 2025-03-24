<script lang="ts" setup>
    import Navbar from "@components/Navbar.vue"
</script>

<template>
    <header class="w-full h-[10vh]">
        <Navbar />
    </header>
    <main class="flex justify-center items-center w-full h-[90vh] dark:bg-dark">
        <slot name="main"></slot>
    </main>
</template>

<style scoped></style>
