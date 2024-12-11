import type {
    Project,
    ProjectResponse,
    MemberNameResponse,
} from "@/interfaces/interfaces"

class ProjectService {
    private projects: Project[]

    constructor() {
        this.projects = []
    }

    getProjects(): Project[] {
        return this.projects
    }

    getProjectById(id: string): Project | undefined {
        return this.projects.find((project) => project.id == id)
    }

    clearProjects(): void {
        this.projects = []
    }

    async fetchProjects(): Promise<void> {
        try {
            const response = await fetch("/api/projects", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: ProjectResponse = await response.json()

            json.projects?.forEach((project: Project) =>
                this.projects.push(project),
            )
        } catch (error) {
            console.error(`Error al obtener los proyectos: ${error}`)
        }
    }

    async addMember(
        project_id: string,
        member_id: string,
    ): Promise<MemberNameResponse | null> {
        try {
            const response = await fetch(
                `/api/projects/add-member/${project_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ member_id }),
                },
            )

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: MemberNameResponse = await response.json()

            return json
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async saveProject(project: Project): Promise<ProjectResponse | null> {
        try {
            const response = await fetch("/api/projects", {
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

    async deleteProject(id: string): Promise<ProjectResponse | null> {
        try {
            const response = await fetch(`/api/projects/${id}`, {
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

    async updateProject(
        project: Project,
        id: string,
    ): Promise<ProjectResponse | null> {
        if (!id) return null

        try {
            const response = await fetch(`/api/projects/${id}`, {
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
}

export default ProjectService
