<script lang="ts" setup>
    import { ref, Ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import TaskForm from "@components/TaskForm.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import TaskService from "@services/TaskService"

    import type { Member, Project, Task } from "@interfaces/interfaces"

    const service = new TaskService()
    const tasks: Ref<Task[]> = ref([])
    const isTaskFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const isTaskCardVisible: Ref<boolean> = ref(false)
    const task: Ref<Task> = ref({
        id: "",
        title: "",
        description: "",
        deadline: "",
        status: false,
        project_id: "",
        member_id: "",
        member: {} as Member,
        project: {} as Project,
    })

    const resetTasks = async (): Promise<void> => {
        service.clearTasks()
        await service.fetchTasks()
        tasks.value = service.getTasks()
    }

    onMounted(async () => {
        await service.fetchTasks()
        tasks.value = service.getTasks()
    })

    onUnmounted(() => service.clearTasks())

    const showTaskCard = (): boolean => (isTaskCardVisible.value = true)
    const hideTaskCard = (): boolean => (isTaskCardVisible.value = false)

    const showTaskForm = (isEdit: boolean): void => {
        isUpdate.value = isEdit
        isTaskFormVisible.value = true
    }
    const hideTaskForm = (): boolean => (isTaskFormVisible.value = false)

    const handleTaskCardClick = (id: string): void => {
        const taskData: Task | undefined = service.getTaskById(id)

        if (!taskData) {
            alert("¡Tarea no encontrada!")
            return
        }

        task.value = taskData
        showTaskCard()
    }

    const handleDeleteTask = (id: string): void => {
        service
            .deleteTask(id)
            .then((data) => {
                if (data) {
                    alert(data.message)
                }

                resetTasks()
                hideTaskCard()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEditTask = (): void => {
        hideTaskCard()
        showTaskForm(true)
    }
</script>

<template>
    <div
        v-if="isTaskCardVisible"
        class="absolute w-full h-full z-[999] bg-black opacity-70"
    ></div>
    <div
        v-if="isTaskFormVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <MainLayout>
        <template v-slot:main>
            <section
                class="flex flex-col bg-gray-200 w-[1200px] h-[500px] rounded-xl p-2"
            >
                <div class="border-b-[1px] border-b-secondary h-[60px] w-full">
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl text-secondary">
                            Tareas existentes
                        </h1>
                    </div>
                </div>
                <div
                    class="grid grid-cols-7 place-content-start w-full h-full overflow-y-auto gap-2 px-4"
                >
                    <div
                        v-for="task in tasks"
                        :key="task.id"
                        @click="handleTaskCardClick(task.id ?? '')"
                        class="flex justify-center items-center w-32 h-32 bg-primary rounded-lg cursor-pointer hover:scale-105 duration-300 mt-2"
                    >
                        <h1
                            :class="[
                                task.status ? 'text-green-500' : 'text-white',
                                'flex flex-col justify-center items-center',
                            ]"
                        >
                            <v-icon name="fa-file-code" scale="3" />
                            {{ task.title }}
                        </h1>
                    </div>
                </div>
            </section>

            <ShowComponent>
                <div
                    v-if="isTaskCardVisible"
                    class="flex flex-col justify-start items-center absolute bg-primary w-[500px] h-[300px] text-white rounded-md z-[1000]"
                >
                    <div
                        class="flex justify-between w-full h-14 border-b-2 border-gray-200 p-2"
                    >
                        <div class="flex gap-2">
                            <button
                                class="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 rounded-sm"
                                @click="handleEditTask"
                            >
                                <v-icon name="md-modeeditoutline" scale="1.5" />
                            </button>
                            <button
                                class="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 rounded-sm"
                                @click="handleDeleteTask(task.id ?? '')"
                            >
                                <v-icon name="fa-trash" scale="1.5" />
                            </button>
                        </div>

                        <v-icon
                            class="cursor-pointer"
                            name="io-close"
                            scale="1.5"
                            @click="hideTaskCard"
                        />
                    </div>

                    <section
                        class="flex flex-col justify-center items-start w-full px-4"
                    >
                        <h1>Nombre: {{ task.title }}</h1>
                        <h1>Descripcion: {{ task.description }}</h1>
                        <h1>Fecha de entrega: {{ task.deadline }}</h1>
                        <h1>
                            Responsable:
                            {{ task.member.name }} {{ task.member.last_name }}
                        </h1>
                        <h1>Proyecto: {{ task.project.name }}</h1>
                        <h1>
                            Estado:
                            {{
                                task.status == 0 ? "Sin terminar" : "Terminado"
                            }}
                        </h1>
                    </section>
                </div>
            </ShowComponent>

            <ShowComponent>
                <TaskForm
                    v-if="isTaskFormVisible"
                    :isUpdate="isUpdate"
                    :project_id="parseInt(task.project_id) ?? 0"
                    :task="task"
                    @close="hideTaskForm"
                    @resetTasks="resetTasks"
                />
            </ShowComponent>
        </template>
    </MainLayout>
</template>

<style scoped></style>
