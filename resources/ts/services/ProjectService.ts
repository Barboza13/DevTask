import type {
    Project,
    ProjectResponse,
    ProjectName,
    ProjectNameResponse,
    MemberName,
    MemberNameResponse,
} from "@interfaces/interfaces"

class ProjectService {
    private projects: Project[]
    private projectMembers: MemberName[]
    private projectNames: ProjectName[]

    constructor() {
        this.projects = []
        this.projectMembers = []
        this.projectNames = []
    }

    getProjectNames(): ProjectName[] {
        return this.projectNames
    }

    getProjectMembers(): MemberName[] {
        return this.projectMembers
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

    async fetchProjectMembers(id: string): Promise<void> {
        try {
            const response = await fetch(
                `/api/projects/project-members/${id}`,
                {
                    method: "GET",
                },
            )

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: MemberNameResponse = await response.json()

            json.members?.forEach((member: MemberName) =>
                this.projectMembers.push(member),
            )
        } catch (error) {
            console.error(
                `Error al obtener los miembros del proyecto: ${error}`,
            )
        }
    }

    async fetchProjectNames(): Promise<void> {
        try {
            const response = await fetch("/api/projects/project-names", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: ProjectNameResponse = await response.json()

            json.projects?.forEach((project: ProjectName) =>
                this.projectNames.push(project),
            )
        } catch (error) {
            console.error(
                `Error al obtener los nombres de los proyectos: ${error}`,
            )
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

    async saveProject(project: Project): Promise<ProjectResponse> {
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
                return Promise.reject(errorData)
            }

            const json: ProjectResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
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
    ): Promise<ProjectResponse | undefined> {
        if (!id) return

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
                return Promise.reject(errorData)
            }

            const json: ProjectResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default ProjectService
