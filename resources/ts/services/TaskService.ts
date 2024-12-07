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

    getMembers(): Member[] {
        return this.members
    }

    getMembersById(id: string): Member | undefined {
        return this.members.find((member) => member.id == id)
    }

    clearMembers(): void {
        this.members = []
    }

    async fetchMembers(): Promise<void> {
        try {
            const response = await fetch("/api/members-names", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: MemberResponse = await response.json()

            json.members?.forEach((member: Member) => this.members.push(member))
        } catch (error) {
            console.error(`Error al obtener las tareas: ${error}`)
        }
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

            json.tasks?.forEach((task: Task) => this.tasks.push(task))
        } catch (error) {
            console.error(`Error al obtener las tareas: ${error}`)
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
}

export default TaskService
