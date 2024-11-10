interface Project {
    id?: string
    name: string
    deadline: string
    description: string
}

interface SaveProjectResponse {
    project?: Project
    message: string
    error?: string
}

export { Project, SaveProjectResponse }
