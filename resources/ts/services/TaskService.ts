import { Task, TaskResponse } from "@/interfaces/interfaces"

class TaskService {
    private tasks: Task[]

    constructor() {
        this.tasks = []
    }

    getTasks(): Task[] {
        return this.tasks
    }

    async fetchTasks(): Promise<void> {
        try {
            const response = await fetch("/api/members-names", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: TaskResponse = await response.json()
            console.log(json)

            json.tasks?.forEach((task: Task) => this.tasks.push(task))
        } catch (error) {
            console.error(`Error al obtener las tareas: ${error}`)
        }
    }
}

export default TaskService
