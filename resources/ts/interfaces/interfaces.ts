//Projects types.
interface Project {
    id?: string
    name: string
    deadline: string
    description: string
    members: Member[]
}

interface ProjectResponse {
    projects?: Project[]
    project?: Project
    message: string
    error?: string
}

//Members types.
interface Member {
    id?: string
    name: string
    last_name: string
    email: string
}

interface MemberResponse {
    members?: Member[]
    member?: Member
    message: string
    error?: string
}

interface MemberName {
    id: string
    name: string
}

interface MemberNameResponse {
    members?: MemberName[]
    message: string
    error?: string
}

//Tasks types.
interface Task {
    id?: string
    member_id: string
    project_id: string
    title: string
    description: string
    deadline: string
    status: boolean | number
    member: Member
    project: Project
}

interface TaskResponse {
    tasks?: Task[]
    task?: Task
    message: string
    error?: string
}

export {
    Project,
    ProjectResponse,
    Member,
    MemberName,
    MemberResponse,
    MemberNameResponse,
    Task,
    TaskResponse,
}
