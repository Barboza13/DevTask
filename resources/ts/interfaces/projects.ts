interface Project {
    id?: string
    name: string
    deadline: string
    description: string
}

interface ProjectResponse {
    projects?: Project[]
    project?: Project
    message: string
    error?: string
}

export { Project, ProjectResponse }
