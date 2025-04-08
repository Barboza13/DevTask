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

    /**
     * @description Get all project names.
     * @returns {ProjectName[]} Project names.
     */
    getProjectNames(): ProjectName[] {
        return this.projectNames
    }

    /**
     * @description Get all project members.
     * @returns {MemberName[]} Project members.
     */
    getProjectMembers(): MemberName[] {
        return this.projectMembers
    }

    /**
     * @description Get all projects.
     * @returns {Project[]} Projects.
     */
    getProjects(): Project[] {
        return this.projects
    }

    /**
     * @description Get specified project.
     * @param {string} id Project id.
     * @returns {Project | undefined} Project or undefined.
     */
    getProjectById(id: string): Project | undefined {
        return this.projects.find((project) => project.id == id)
    }

    /**
     * @description Clean projects.
     * @returns {void}
     */
    clearProjects(): void {
        this.projects = []
    }

    /**
     * @description Fetch all projects.
     * @returns {Promise<void>}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async fetchProjects(): Promise<void> {
        try {
            const response = await fetch("/api/projects", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: ProjectResponse = await response.json()

            json.projects?.forEach((project: Project) =>
                this.projects.push(project),
            )
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Fetch all project members.
     * @param {string} id Project id.
     * @returns {Promise<void>}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
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
                return Promise.reject(errorData)
            }

            const json: MemberNameResponse = await response.json()

            json.members?.forEach((member: MemberName) =>
                this.projectMembers.push(member),
            )
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Fetch all project names.
     * @returns {void}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async fetchProjectNames(): Promise<void> {
        try {
            const response = await fetch("/api/projects/project-names", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: ProjectNameResponse = await response.json()

            json.projects?.forEach((project: ProjectName) =>
                this.projectNames.push(project),
            )
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Add a new member to project.
     * @param {string} project_id Project id.
     * @param {string} member_id Member id.
     * @returns {Promise<MemberNameResponse>} Added member or message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async addMember(
        project_id: string,
        member_id: string,
    ): Promise<MemberNameResponse> {
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
                return Promise.reject(errorData)
            }

            const json: MemberNameResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Save a new project.
     * @param {Project} project Project.
     * @returns {Promise<ProjectResponse>} Created project or message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
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

    /**
     * @description Delete a specified project.
     * @param {string} id Project id.
     * @returns {Promise<ProjectResponse>} Message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async deleteProject(id: string): Promise<ProjectResponse> {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
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

    /**
     * @description Update a specified project.
     * @param {Project} project Project.
     * @param {string} id Project id.
     * @returns {Promise<ProjectResponse | undefined>} Updated project and message or undefined.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
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
