import type {
    Member,
    MemberResponse,
    Task,
    TaskResponse,
} from "@interfaces/interfaces"

class TaskService {
    private tasks: Task[]
    private members: Member[]

    constructor() {
        this.tasks = []
        this.members = []
    }

    getTasks(): Task[] {
        return this.tasks
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find((task) => task.id == id)
    }

    clearTasks(): void {
        this.tasks = []
    }

    async fetchTasks(): Promise<void> {
        try {
            const response = await fetch("/api/tasks", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: TaskResponse = await response.json()

            this.clearTasks()
            json.tasks?.forEach((task: Task) => this.tasks.push(task))
        } catch (error) {
            console.error(`Error al obtener las tareas: ${error}`)
        }
    }

    async fetchTasksByProjectId(id: string): Promise<void> {
        try {
            const response = await fetch(
                `/api/projects/tasks-by-project/${id}`,
                {
                    method: "GET",
                },
            )

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: TaskResponse = await response.json()

            this.clearTasks()
            json.tasks?.forEach((task: Task) => this.tasks.push(task))
        } catch (error) {
            console.error(`Error al obtener las tareas por proyecto: ${error}`)
        }
    }

    async saveTask(task: Task): Promise<TaskResponse | null> {
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: TaskResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al guardar la tarea: ${error}`)
            return null
        }
    }

    async updateTask(task: Task, id: string): Promise<TaskResponse | null> {
        if (!id) return null

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: TaskResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al actualizar la tarea: ${error}`)
            return null
        }
    }

    async deleteTask(id: string): Promise<TaskResponse | null> {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: TaskResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al eliminar la tarea: ${error}`)
            return null
        }
    }
}

export default TaskService
