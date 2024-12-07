//Projects types.
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

//Tasks types.
interface Task {
    id?: string
    member_id: string
    project_id: string
    title: string
    description: string
    deadline: string
    status: boolean
}

interface TaskResponse {
    tasks?: Task[]
    task?: Task
    message: string
    error?: string
}

export { Project, ProjectResponse, Member, MemberResponse, Task, TaskResponse }
