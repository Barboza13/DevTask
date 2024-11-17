import { Ref, ref } from "vue"
import { Member, MemberResponse } from "@/interfaces/projects"

class MemberService {
    private members: Member[]

    constructor() {
        this.members = []
    }

    getMembers(): Member[] {
        return this.members
    }

    async fetchMembers(): Promise<void> {
        try {
            const response = await fetch("/api/members", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
            }

            const json: MemberResponse = await response.json()

            json.members?.forEach((member) => {
                this.members.push(member)
            })
        } catch (error) {
            console.error(`Error al obtener los miembros: ${error}`)
        }
    }

    resetMembers(): void {
        this.members = []
    }
}

export default MemberService
