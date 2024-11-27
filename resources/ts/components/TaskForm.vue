<script lang="ts" setup>
    import { Ref, ref, PropType } from "vue"

    const props = defineProps({
        isUpdate: {
            type: Boolean,
            required: false,
        },
    })

    const emit = defineEmits(["close"])

    const title: Ref<string> = ref("")
    const description: Ref<string> = ref("")
    const deadline: Ref<string> = ref("")
    const status: Ref<boolean> = ref(false)
    const message: Ref<string> = ref("")

    const closeForm = (): void => emit("close")

    const handleSubmit = (event: Event): void => {
        event.preventDefault()

        const project: Project = {
            name: name.value,
            deadline: deadline.value,
            description: description.value,
        }

        if (props.isUpdate) {
            service
                .updateProject(project, props.project?.id ?? "")
                .then((data) => {
                    if (data) {
                        message.value = data.message
                    }

                    setTimeout(() => (message.value = ""), 3000)

                    emit("resetProjects")
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            service
                .saveProject(project)
                .then((data) => {
                    if (data) {
                        message.value = data.message
                    }

                    setTimeout(() => (message.value = ""), 3000)

                    name.value = ""
                    deadline.value = ""
                    description.value = ""

                    emit("resetProjects")
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute bg-primary w-[500px] h-[500px] text-white rounded-md z-[1000]"
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
        <h1 v-if="props.isUpdate" class="text-3xl mb-8">Editar Tarea</h1>
        <h1 v-else="props.isUpdate" class="text-3xl mb-8">Nueva Tarea</h1>

        <p v-if="message" class="text-white">
            {{ message }}
        </p>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="title">Titulo</label>
            <input
                class="w-full h-10 bg-white text-black outline-none rounded-lg p-2"
                type="text"
                v-model="title"
                name="title"
                id="title"
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
                id="description"
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
                id="deadline"
                required
            />
        </div>

        <div v-if="props.isUpdate" class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="status">Estado</label>
            <input
                class="w-full h-10 bg-white text-black outline-none p-2 rounded-lg"
                type="checkbox"
                v-model="status"
                name="status"
                id="status"
                required
            />
        </div>
        <input v-else type="checkbox" name="status" v-model="status" hidden />

        <div class="flex justify-end w-full">
            <button
                v-if="props.isUpdate"
                class="bg-green-600 hover:bg-green-700 text-1xl text-white rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Actualizar
            </button>
            <button
                v-else
                class="bg-green-600 hover:bg-green-700 text-1xl text-white rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>

<style scoped></style>
