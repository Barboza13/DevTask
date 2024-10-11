import { defineStore } from "pinia"
import type { ProjectResponse, Project } from "@interfaces/projects"

export const useStoreProject = defineStore("project", () => {
    const API: string = "http://localhost:8000/api/projects"

    const projects: Array<ProjectResponse> = []

    const getProjects = async (): Promise<void> => {
        try {
            const response = await fetch(API, {
                method: "GET",
            })

            const json = await response.json()

            json.data.forEach((project: ProjectResponse) =>
                projects.push(project),
            )
        } catch (error) {
            console.error(`Ocurrio un error: ${error}`)
        }
    }

    const saveProject = async (project: Project): Promise<void> => {
        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project),
            })

            const json = await response.json()
        } catch (error) {
            console.error(`Ocurrio un error: ${error}`)
        }
    }

    return { projects, getProjects, saveProject }
})
