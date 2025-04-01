//Projects types.
export interface Project {
    id?: string
    name: string
    deadline: string
    description: string
    members: Member[]
}

export interface ProjectResponse {
    projects?: Project[]
    project?: Project
    message: string
    error?: string
}

export interface ProjectName {
    id: string
    name: string
}

export interface ProjectNameResponse {
    projects?: ProjectName[]
    message: string
    error?: string
}

//Members types.
export interface Member {
    id?: string
    name: string
    last_name: string
    email: string
}

export interface MemberResponse {
    members?: Member[]
    member?: Member
    message: string
    error?: string
}

export interface MemberName {
    id: string
    name: string
}

export interface MemberNameResponse {
    members?: MemberName[]
    message: string
    error?: string
}

//Tasks types.
type TaskStatus = "in_progress" | "finished" | "expired"

export interface Task {
    id?: string
    member_id: string
    project_id: string
    title: string
    description: string
    deadline: string
    status: TaskStatus
    member: Member
    project: Project
}

export interface TaskResponse {
    tasks?: Task[]
    task?: Task
    message: string
    error?: string
}
