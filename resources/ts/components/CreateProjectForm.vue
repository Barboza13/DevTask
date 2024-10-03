<script lang="ts" setup>
    import { defineProps, defineEmits } from "vue"

    const props = defineProps({
        isVisible: {
            type: Boolean,
            required: true,
        },
    })

    const emit = defineEmits(["close"])

    const closeForm: void = () => emit("close")
</script>

<template>
    <form
        v-if="isVisible"
        class="flex flex-col justify-start items-center absolute bg-blue-700 w-[600px] h-[600px] text-white rounded-md z-[1000]"
        action=""
    >
        <div class="flex justify-end w-full p-2">
            <v-icon
                class="cursor-pointer"
                name="io-close"
                scale="1.5"
                @click="closeForm"
            />
        </div>
        <h1 class="mb-4">Nuevo proyecto</h1>
        <label for="name">Nombre del proyecto</label>
        <input
            class="bg-transparent border-b-2 border-white outline-none"
            type="text"
            id="name"
            required
        />
        <label for="deadline">Fecha limite</label>
        <input
            class="bg-transparent border-b-2 border-white outline-none"
            type="text"
            id="deadline"
            required
        />
        <div class="flex justify-end w-full">
            <button
                class="bg-green-500 hover:bg-green-600 text-1xl rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>

<style scoped></style>
