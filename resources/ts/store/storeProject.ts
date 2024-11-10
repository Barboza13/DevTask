import { defineStore } from "pinia"
import { Ref, ref } from "vue"
import type { Project, SaveProjectResponse } from "@interfaces/projects"

export const useStoreProject = defineStore("project", () => {
    const API: string = "http://localhost:8000/api/projects"

    const projects: Ref<Array<Project>> = ref([])

    const getProjects = async (): Promise<void> => {
        try {
            const response = await fetch(API, {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const json = await response.json()

            json.projects.forEach((project: Project) =>
                projects.value.push(project),
            )
        } catch (error) {
            console.error(`Ocurrio un error: ${error}`)
        }
    }

    const resetProjects = (): void => {
        projects.value = []
    }

    const getProject = async (id: string): Promise<Project | null> => {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const json = await response.json()

            return json.project
        } catch (error) {
            console.error(`Ocurrio un error: ${error}`)
            return null
        }
    }

    const saveProject = async (
        project: Project,
    ): Promise<SaveProjectResponse | null> => {
        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(
                    `Error en la creacion del proyecto: ${errorData.message}`,
                )
                return null
            }

            const json: SaveProjectResponse = await response.json()

            resetProjects()
            await getProjects()

            return json
        } catch (error) {
            console.error(`Ocurrio un error: ${error}`)
            return null
        }
    }

    const deleteProject = async (id: string): Promise<void> => {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const json = response.json()

            resetProjects()
            await getProjects()

            return json
        } catch (error) {
            console.error(error)
        }
    }

    return {
        projects,
        getProjects,
        getProject,
        saveProject,
        resetProjects,
        deleteProject,
    }
})
