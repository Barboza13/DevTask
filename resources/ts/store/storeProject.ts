import { defineStore } from "pinia"
import { Ref, ref } from "vue"
import type { Project, ProjectResponse } from "@interfaces/projects"

export const useStoreProject = defineStore("project", () => {
    const API: string = "/api/projects"

    const projects: Ref<Array<Project>> = ref([])

    const getProjects = async (): Promise<void> => {
        try {
            const response = await fetch(API, {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: ProjectResponse = await response.json()

            json.projects?.forEach((project: Project) =>
                projects.value.push(project),
            )
        } catch (error) {
            console.error(`Error al obtener los proyectos: ${error}`)
        }
    }

    const resetProjects = (): void => {
        projects.value = []
    }

    const getProject = async (id: string): Promise<ProjectResponse | null> => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: ProjectResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al obtener el proyecto: ${error}`)
            return null
        }
    }

    const saveProject = async (
        project: Project,
    ): Promise<ProjectResponse | null> => {
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
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: ProjectResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al guardar el proyecto: ${error}`)
            return null
        }
    }

    const deleteProject = async (
        id: string,
    ): Promise<ProjectResponse | null> => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: ProjectResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al eliminar el proyecto: ${error}`)
            return null
        }
    }

    const updateProject = async (
        project: Project,
        id: string,
    ): Promise<ProjectResponse | null> => {
        if (!id) return null

        try {
            const response = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: ProjectResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al actualizar el proyecto: ${error}`)
            return null
        }
    }

    return {
        projects,
        getProjects,
        getProject,
        saveProject,
        resetProjects,
        deleteProject,
        updateProject,
    }
})
