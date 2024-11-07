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
        class="flex flex-col justify-start items-center absolute bg-primary w-[600px] h-[600px] text-white rounded-md z-[1000]"
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
        <h1 class="text-3xl mb-8">Nuevo proyecto</h1>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="name">Nombre del proyecto</label>
            <input
                class="w-full h-10 bg-white text-black outline-none rounded-lg p-2"
                type="text"
                v-model="name"
                name="name"
                required
            />
        </div>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="deadline">Fecha limite</label>
            <input
                class="w-full h-10 bg-white text-black outline-none p-2 rounded-lg"
                type="date"
                v-model="deadline"
                name="deadline"
                required
            />
        </div>

        <div class="flex justify-end w-full">
            <button
                class="bg-green-600 hover:bg-green-700 text-1xl text-white rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>

<style scoped></style>
