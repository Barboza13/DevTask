<script lang="ts" setup>
    import Navbar from "@components/Navbar.vue"
</script>

<template>
    <div class="">
        <header class="h-[10vh]">
            <Navbar />
        </header>
        <main class="flex justify-center items-center h-[90vh]">
            <slot name="main"></slot>
        </main>
        <footer class=""></footer>
    </div>
</template>

<style scoped></style>
