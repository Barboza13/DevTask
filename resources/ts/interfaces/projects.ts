interface Project {
    id?: string
    name: string
    deadline: string
    description: string
}

interface ProjectResponse {
    project?: Project
    message: string
    error?: string
}

export { Project, ProjectResponse }
