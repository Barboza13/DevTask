import { Member, MemberResponse } from "@/interfaces/projects"

class MemberService {
    private members: Member[]

    constructor() {
        this.members = []
    }

    getMembers(): Member[] {
        return this.members
    }

    getMemberById(id: string): Member | undefined {
        return this.members.find((member) => member.id == id)
    }

    clearMembers(): void {
        this.members = []
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

    async saveMember(member: Member): Promise<MemberResponse | null> {
        try {
            const response = await fetch("/api/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(member),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: MemberResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al guardar el miembro: ${error}`)
            return null
        }
    }

    async updateMember(
        member: Member,
        id: string,
    ): Promise<MemberResponse | null> {
        if (!id) return null

        try {
            const response = await fetch(`/api/members/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(member),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: MemberResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al actualizar el miembro: ${error}`)
            return null
        }
    }

    async deleteMember(id: string): Promise<MemberResponse | null> {
        try {
            const response = await fetch(`/api/members/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error(`Error: ${errorData.message}`)
                return null
            }

            const json: MemberResponse = await response.json()

            return json
        } catch (error) {
            console.error(`Error al eliminar el miembro: ${error}`)
            return null
        }
    }
}

export default MemberService
