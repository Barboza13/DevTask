<script lang="ts" setup>
    import Navbar from "@/ts/components/Navbar.vue"
</script>

<template>
    <Navbar />
    <router-view />
</template>

<style lang="scss">
    * {
        font-family: "Ubuntu", sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
</style>
