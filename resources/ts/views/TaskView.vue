<script lang="ts" setup>
    import { ref, Ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import TaskForm from "@components/TaskForm.vue"
    import DeleteDialog from "@components/DeleteDialog.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import TaskService from "@services/TaskService"
    import ProjectService from "@services/ProjectService"

    import type {
        Member,
        Project,
        ProjectName,
        Task,
    } from "@interfaces/interfaces"

    const service = new TaskService()
    const projectService = new ProjectService()
    const tasks: Ref<Task[]> = ref([])
    const projectNames: Ref<ProjectName[]> = ref([])
    const projectSelect: Ref<string> = ref("")
    const isTaskFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const isTaskCardVisible: Ref<boolean> = ref(false)
    const isDeleteDialogVisible: Ref<boolean> = ref(false)
    const isLoading: Ref<boolean> = ref(false)
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
        const projectId: string = projectSelect.value

        if (projectId === "") {
            await service.fetchTasks().then(() => {
                tasks.value = service.getTasks()
            })
        } else {
            // If a project filter is applied, it will only restart tasks from that project.
            await service.fetchTasksByProjectId(projectId).then(() => {
                tasks.value = service.getTasks()
            })
        }
    }

    onMounted(async () => {
        isLoading.value = true
        await service
            .fetchTasks()
            .then(() => {
                tasks.value = service.getTasks()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                isLoading.value = false
            })

        await projectService.fetchProjectNames()
        projectNames.value = projectService.getProjectNames()
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

    const changeDeleteDialogVisibility = () =>
        (isDeleteDialogVisible.value = !isDeleteDialogVisible.value)

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

    const sortTasksByProjectId = async (): Promise<void> => {
        const projectId: string = projectSelect.value

        if (projectId === "") {
            await service.fetchTasks().then(() => {
                tasks.value = service.getTasks()
            })
        } else {
            await service.fetchTasksByProjectId(projectId).then(() => {
                tasks.value = service.getTasks()
            })
        }
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
    <div
        v-if="isDeleteDialogVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <MainLayout>
        <template #main>
            <section
                class="relative flex flex-col bg-gray-200 w-[1200px] h-[500px] rounded-xl p-2"
            >
                <div
                    class="flex justify-around items-center border-b-[1px] border-b-secondary h-[60px] w-full"
                >
                    <h1 class="text-2xl text-secondary">Tareas existentes</h1>
                    <div class="flex">
                        <h3 class="text-sm text-secondary">
                            Filtrar por proyecto:
                        </h3>
                        <select
                            class="w-full cursor-pointer rounded-md"
                            name="projectName"
                            id=""
                            v-model="projectSelect"
                            @change="sortTasksByProjectId"
                        >
                            <option selected value="">Todas las tareas</option>
                            <option
                                v-for="project in projectNames"
                                :key="project.id"
                                :value="project.id"
                            >
                                {{ project.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Loading icon -->
                <v-icon
                    v-if="isLoading"
                    class="absolute inset-0 m-auto w-20 h-20"
                    name="ri-loader-4-line"
                    scale="1"
                    animation="spin"
                />
                <!--  -->

                <div
                    class="grid grid-cols-6 place-content-start w-full h-full overflow-y-auto gap-2 px-4"
                >
                    <!-- Tasks Cards -->
                    <div
                        v-for="task in tasks"
                        :key="task.id"
                        @click="handleTaskCardClick(task.id ?? '')"
                        class="flex justify-center items-center w-44 h-32 bg-primary rounded-lg cursor-pointer hover:scale-105 shadow-lg shadow-black/35 transition-transform duration-200 ease-in mt-2"
                    >
                        <div
                            :class="[
                                task.status ? 'text-blue-400' : 'text-white',
                                'flex flex-col justify-evenly items-center w-full h-full px-1',
                            ]"
                        >
                            <div
                                class="flex justify-center items-center w-full"
                            >
                                <v-icon name="fa-file-code" scale="1.5" />
                                <h2 class="text-lg">{{ task.project.name }}</h2>
                            </div>
                            <h3 class="text-sm text-center">
                                {{ task.title }}
                            </h3>
                        </div>
                    </div>
                    <!-- ----------- -->
                </div>
            </section>

            <ShowComponent>
                <div
                    v-if="isTaskCardVisible"
                    class="flex flex-col justify-start items-center absolute top-20 bg-primary w-[500px] h-[300px] text-white rounded-md z-[1000]"
                >
                    <div
                        class="flex justify-between w-full h-14 border-b-2 border-gray-200 p-2"
                    >
                        <div class="flex gap-2">
                            <button
                                class="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 transition-color duration-200 ease-in rounded-sm"
                                @click="handleEditTask"
                            >
                                <v-icon name="md-modeeditoutline" scale="1.5" />
                            </button>
                            <button
                                class="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 transition-color duration-200 ease-in rounded-sm"
                                @click="changeDeleteDialogVisibility"
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

            <!-- Delete dialog -->
            <ShowComponent>
                <DeleteDialog
                    v-if="isDeleteDialogVisible"
                    @deleteRecord="handleDeleteTask(task.id ?? '')"
                    @changeDeleteDialogVisibility="changeDeleteDialogVisibility"
                />
            </ShowComponent>
            <!-- ------------ -->
        </template>
    </MainLayout>
</template>

<style scoped></style>
