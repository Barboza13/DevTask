interface ProjectResponse {
    id: number
    name: string
    deadline: string
    created_at: string
    updated_at: string
    deleted_at: string
}

interface Project {
    name: string
    deadline: string
}

export { ProjectResponse, Project }
