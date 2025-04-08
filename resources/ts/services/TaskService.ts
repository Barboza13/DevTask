import type { Task, TaskResponse } from "@interfaces/interfaces"

class TaskService {
    private tasks: Task[]

    constructor() {
        this.tasks = []
    }

    /**
     * @description Get all tasks.
     * @returns {Task[]} Tasks.
     */
    getTasks(): Task[] {
        return this.tasks
    }

    /**
     * @description Get specified task.
     * @param {string} id Task id.
     * @returns {Task | undefined} Task or undefined.
     */
    getTaskById(id: string): Task | undefined {
        return this.tasks.find((task) => task.id == id)
    }

    /**
     * @description Clean tasks.
     * @returns {void}
     */
    clearTasks(): void {
        this.tasks = []
    }

    /**
     * @description Fetch all tasks.
     * @returns {Promise<void>}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async fetchTasks(): Promise<void> {
        try {
            const response = await fetch("/api/tasks", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: TaskResponse = await response.json()

            this.clearTasks()
            json.tasks?.forEach((task: Task) => this.tasks.push(task))
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Fetch all tasks by project.
     * @param {string} id Project id.
     * @returns {Promise<void>}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
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
                return Promise.reject(errorData)
            }

            const json: TaskResponse = await response.json()

            this.clearTasks()
            json.tasks?.forEach((task: Task) => this.tasks.push(task))
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Save a new task.
     * @param {Task} task Task.
     * @returns {Promise<TaskResponse>} Created task or message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async saveTask(task: Task): Promise<TaskResponse> {
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
                return Promise.reject(errorData)
            }

            const json: TaskResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Update a specified task.
     * @param {Task} task Task.
     * @param {string} id Task id.
     * @returns {Promise<TaskResponse | undefined>} Updated task and message or undefined.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async updateTask(
        task: Task,
        id: string,
    ): Promise<TaskResponse | undefined> {
        if (!id) return

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
                return Promise.reject(errorData)
            }

            const json: TaskResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Delete a specified task.
     * @param {string} id Task id.
     * @returns {Promise<TaskResponse>} Message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async deleteTask(id: string): Promise<TaskResponse> {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: TaskResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default TaskService
