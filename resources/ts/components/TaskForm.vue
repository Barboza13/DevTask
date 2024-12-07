<script lang="ts" setup>
    import TaskService from "@services/TaskService"
    import { Ref, ref, PropType, onMounted } from "vue"

    import type { Member, Task, TaskResponse } from "@interfaces/interfaces"

    const props = defineProps({
        isUpdate: {
            type: Boolean,
            required: false,
        },
        project_id: {
            type: String,
            required: true,
        },
    })

    const emit = defineEmits(["close"])

    const service = new TaskService()
    const tasks: Ref<Task[]> = ref([])
    const members: Ref<Member[]> = ref([])

    const title: Ref<string> = ref("")
    const description: Ref<string> = ref("")
    const deadline: Ref<string> = ref("")
    const status: Ref<boolean> = ref(false)
    const memberSelect: Ref<string> = ref("")
    const message: Ref<string> = ref("")

    onMounted(async () => {
        await service.fetchTasks()
        tasks.value = service.getTasks()

        await service.fetchMembers()
        members.value = service.getMembers()
    })

    const closeForm = (): void => emit("close")

    const handleSubmit = (event: Event): void => {
        event.preventDefault()

        const task: Task = {
            title: title.value,
            deadline: deadline.value,
            description: description.value,
            status: status.value,
            project_id: props.project_id,
            member_id: memberSelect.value,
        }

        if (props.isUpdate) {
            // service
            //     .updateProject(project, props.project?.id ?? "")
            //     .then((data) => {
            //         if (data) {
            //             message.value = data.message
            //         }
            //         setTimeout(() => (message.value = ""), 3000)
            //         emit("resetProjects")
            //     })
            //     .catch((error) => {
            //         console.error(error)
            //     })
        } else {
            service
                .saveTask(task)
                .then((data) => {
                    if (data) {
                        message.value = data.message
                    }

                    setTimeout(() => (message.value = ""), 3000)

                    title.value = ""
                    deadline.value = ""
                    description.value = ""
                    memberSelect.value = ""

                    // emit("resetProjects")
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute top-10 w-[900px] h-[550px] bg-primary text-white rounded-md z-[1000]"
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
        <h1 v-if="props.isUpdate" class="text-3xl mb-5">Editar Tarea</h1>
        <h1 v-else="props.isUpdate" class="text-3xl mb-5">Nueva Tarea</h1>

        <p v-if="message" class="text-white">
            {{ message }}
        </p>

        <section class="flex justify-center items-center w-full h-[380px]">
            <div class="flex flex-col justify-center items-center w-1/2 h-full">
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
            </div>

            <div class="flex flex-col justify-center items-center w-1/2 h-full">
                <div class="flex flex-col w-[90%] mb-6">
                    <label class="mb-2" for="member_id">Miembro</label>
                    <select
                        class="w-full h-10 bg-white text-black outline-none p-2 rounded-lg cursor-pointer"
                        v-model="memberSelect"
                        name="member_id"
                        id="member_id"
                    >
                        <option disabled selected value="">
                            Seleccione una opcion
                        </option>
                        <option
                            v-for="member in members"
                            :key="member.id"
                            :value="member.id"
                        >
                            {{ member.name }}
                        </option>
                    </select>
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
                <input
                    v-else
                    type="checkbox"
                    name="status"
                    v-model="status"
                    hidden
                />
            </div>
        </section>

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
