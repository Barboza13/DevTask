<script lang="ts" setup>
    const props = defineProps({
        message: {
            type: String,
            required: true,
        },
    })
</script>

<template>
    <div
        class="fixed bottom-6 right-4 flex justify-center items-center w-[300px] h-16 text-base text-gray-200 bg-primary shadow-lg shadow-black/35 rounded-md z-[1003] px-4"
    >
        {{ props.message }}
    </div>
</template>

<style scoped></style>
