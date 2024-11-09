interface Project {
    id: string
    name: string
    deadline: string
    description: string
}

interface SaveProjectResponse {
    project: Object
    message: string
    status: boolean
}

export { Project, SaveProjectResponse }
