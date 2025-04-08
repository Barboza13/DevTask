<script lang="ts" setup>
    import { Ref, ref, PropType } from "vue"
    import ProjectService from "@services/ProjectService"

    import type { Project } from "@interfaces/interfaces"

    const props = defineProps({
        isUpdate: {
            type: Boolean,
            required: false,
        },
        project: {
            type: Object as PropType<Project>,
            required: false,
        },
    })

    const emits = defineEmits([
        "close",
        "resetProjects",
        "showMessageDialog",
        "hideMessageDialog",
    ])

    const service = new ProjectService()
    const name: Ref<string> = ref("")
    const description: Ref<string> = ref("")
    const deadline: Ref<string> = ref("")
    const status: Ref<boolean> = ref(false)

    if (props.isUpdate) {
        name.value = props.project?.name ?? ""
        description.value = props.project?.description ?? ""
        deadline.value = props.project?.deadline ?? ""
        status.value = props.project?.status == "finished" ? true : false
    }

    const handleSubmit = async (event: Event): Promise<void> => {
        event.preventDefault()

        const project: Project = {
            name: name.value,
            deadline: deadline.value,
            description: description.value,
            status: status.value ? "finished" : "in_progress",
            members: [],
        }

        if (props.isUpdate) {
            try {
                const response = await service.updateProject(
                    project,
                    props.project?.id ?? "",
                )

                if (response) {
                    emits("showMessageDialog", response.message)
                }

                setTimeout(() => emits("hideMessageDialog"), 3000)

                emits("resetProjects")
                emits("close")
            } catch (error) {
                emits("showMessageDialog", (error as Error).message)
                setTimeout(() => emits("hideMessageDialog"), 3000)
            }
        } else {
            try {
                const response = await service.saveProject(project)

                if (response) {
                    emits("showMessageDialog", response.message)
                }

                setTimeout(() => emits("hideMessageDialog"), 3000)

                emits("resetProjects")
            } catch (error) {
                emits("showMessageDialog", (error as Error).message)
                setTimeout(() => emits("hideMessageDialog"), 3000)
            } finally {
                name.value = ""
                deadline.value = ""
                description.value = ""
            }
        }
    }
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute lg:top-10 bg-primary w-[500px] h-[500px] text-white rounded-md z-[1002]"
        @submit="handleSubmit"
    >
        <div class="flex justify-end w-full p-2">
            <v-icon
                class="cursor-pointer"
                name="io-close"
                scale="1.5"
                @click="emits('close')"
            />
        </div>
        <h1 v-if="props.isUpdate" class="text-3xl mb-8">Editar proyecto</h1>
        <h1 v-else="props.isUpdate" class="text-3xl mb-8">Nuevo proyecto</h1>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="name">Nombre del proyecto</label>
            <input
                class="w-full h-10 bg-white text-black outline-none rounded-lg p-2"
                type="text"
                v-model="name"
                name="name"
                id="name"
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

        <div class="flex justify-center items-stretch w-[90%] gap-2 mb-6">
            <div
                :class="[props.isUpdate ? 'w-1/2' : 'w-full', 'flex flex-col']"
            >
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

            <div
                v-if="props.isUpdate"
                class="flex justify-center items-center w-1/2"
            >
                <input
                    class="w-5 h-5 cursor-pointer mr-2"
                    type="checkbox"
                    v-model="status"
                    name="status"
                    id="status"
                />
                <label for="status">Marcar como completado.</label>
            </div>

            <input
                v-else
                type="checkbox"
                name="status"
                v-model="status"
                hidden
            />
        </div>

        <div class="flex justify-end w-full">
            <button
                v-if="props.isUpdate"
                class="text-xl text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Actualizar
            </button>
            <button
                v-else="props.isUpdate"
                class="text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>

<style scoped></style>
