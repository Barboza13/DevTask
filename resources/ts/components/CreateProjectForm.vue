<script lang="ts" setup>
    import { Ref, ref } from "vue"
    import { useStoreProject } from "@store/storeProject"

    import type { Project, SaveProjectResponse } from "@interfaces/projects"

    const props = defineProps({
        isVisible: {
            type: Boolean,
            required: true,
        },
    })

    const emit = defineEmits(["close"])

    const store = useStoreProject()
    const name: Ref<string> = ref("")
    const description: Ref<string> = ref("")
    const deadline: Ref<string> = ref("")
    let status: Ref<boolean> = ref(false)
    let message: Ref<string> = ref("")

    const closeForm = (): void => emit("close")

    const handleSubmit = (event: Event): void => {
        event.preventDefault()

        const project: Project = {
            name: name.value,
            deadline: deadline.value,
            description: description.value,
        }

        store
            .saveProject(project)
            .then((data) => {
                message.value = data.message
                status.value = data.status

                name.value = ""
                deadline.value = ""
                description.value = ""

                store.getProjects()
            })
            .catch((error) => {
                console.log(error)
            })
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

        <p :class="status.value ? 'text-green-500' : 'text-red-500'">
            {{ message.value }}
        </p>

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
            <label class="mb-2" for="description">Descripcion</label>
            <textarea
                class="w-full h-20 bg-white text-black outline-none rounded-lg p-2"
                type="text"
                v-model="description"
                name="description"
                required
            ></textarea>
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
