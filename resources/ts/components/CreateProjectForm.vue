<script lang="ts" setup>
    import { defineProps, defineEmits, Ref, ref } from "vue"
    import { useStoreProject } from "@store/storeProject"

    import type { Project } from "@/interfaces/projects"

    const props = defineProps({
        isVisible: {
            type: Boolean,
            required: true,
        },
    })

    const store = useStoreProject()
    const emit = defineEmits(["close"])
    const name: Ref<string> = ref("")
    const deadline: Ref<string> = ref("")

    const closeForm = (): void => emit("close")

    const handleSubmit = (event: Event): void => {
        event.preventDefault()

        const project: Project = {
            name: name.value,
            deadline: deadline.value,
        }

        store.saveProject(project)
    }
</script>

<template>
    <form
        v-if="isVisible"
        class="flex flex-col justify-start items-center absolute bg-blue-700 w-[600px] h-[600px] text-white rounded-md z-[1000]"
        @submit="handleSubmit"
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
            v-model="name"
            name="name"
            required
        />
        <label for="deadline">Fecha limite</label>
        <input
            class="bg-transparent border-b-2 border-white outline-none"
            type="date"
            v-model="deadline"
            name="deadline"
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
