import {
    Member,
    MemberName,
    MemberResponse,
    MemberNameResponse,
} from "@interfaces/interfaces"

class MemberService {
    private members: Member[]
    private membersNames: MemberName[]

    constructor() {
        this.members = []
        this.membersNames = []
    }

    /**
     * @description Get all members.
     * @returns {Member[]} Members.
     */
    getMembers(): Member[] {
        return this.members
    }

    /**
     * @description Get specified member.
     * @param {string} id Member id.
     * @returns {Member} Member.
     */
    getMemberById(id: string): Member | undefined {
        return this.members.find((member) => member.id == id)
    }

    /**
     * @description Get all members names.
     * @returns {MemberName[]} member names.
     */
    getMembersNames(): MemberName[] {
        return this.membersNames
    }

    /**
     * @description Clean members.
     * @returns {void}
     */
    clearMembers(): void {
        this.members = []
    }

    /**
     * @description Clean members names.
     * @returns {void}
     */
    clearMembersNames(): void {
        this.membersNames = []
    }

    /**
     * @description Fetch all members names.
     * @returns {Promise<void>}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async fetchMembersNames(): Promise<void> {
        try {
            const response = await fetch("/api/members/members-names", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: MemberNameResponse = await response.json()

            json.members?.forEach((member: MemberName) =>
                this.membersNames.push(member),
            )
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Fetch all members.
     * @returns {Promise<void>}
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async fetchMembers(): Promise<void> {
        try {
            const response = await fetch("/api/members", {
                method: "GET",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: MemberResponse = await response.json()

            json.members?.forEach((member) => {
                this.members.push(member)
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Save a new member.
     * @param {Member} member Member.
     * @returns {Promise<MemberResponse>} Created member or message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async saveMember(member: Member): Promise<MemberResponse> {
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
                return Promise.reject(errorData)
            }

            const json: MemberResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Update a specified member.
     * @param {Member} member Member.
     * @param {string} id Member id.
     * @returns {Promise<MemberResponse | undefined>} Updated member and message or undefined.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async updateMember(
        member: Member,
        id: string,
    ): Promise<MemberResponse | undefined> {
        if (!id) return

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
                return Promise.reject(errorData)
            }

            const json: MemberResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Delete a specified member.
     * @param {string} id Member id.
     * @returns {Promise<MemberResponse>} Message.
     * @throws {PromiseRejectedResult} Promise rejected.
     */
    async deleteMember(id: string): Promise<MemberResponse> {
        try {
            const response = await fetch(`/api/members/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                return Promise.reject(errorData)
            }

            const json: MemberResponse = await response.json()

            return json
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default MemberService
