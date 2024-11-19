<script lang="ts" setup>
    import { Ref, ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import MemberForm from "@components/MemberForm.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import MemberService from "@services/MemberService"

    import type { Member } from "@interfaces/projects.ts"

    const service = new MemberService()
    const members: Ref<Member[]> = ref([])
    const isFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const isMemberCardVisible: Ref<boolean> = ref(false)
    const member: Ref<Member> = ref({
        id: "",
        name: "",
        last_name: "",
        email: "",
    })

    onMounted(async (): Promise<void> => {
        await service.fetchMembers()
        members.value = service.getMembers()
    })

    onUnmounted((): void => service.clearMembers())

    const resetMembers = async (): Promise<void> => {
        service.clearMembers()
        await service.fetchMembers()
        members.value = service.getMembers()
    }

    const showMemberCard = (): boolean => (isMemberCardVisible.value = true)
    const hideMemberCard = (): boolean => (isMemberCardVisible.value = false)

    const showForm = (isEdit: boolean): void => {
        isUpdate.value = isEdit
        isFormVisible.value = true
    }

    const hideForm = (): boolean => (isFormVisible.value = false)

    const handleMemberCardClick = (id: string): void => {}
    const handleDeleteMember = (id: string): void => {}
    const handleEditMember = (): void => {}
</script>

<template>
    <MainLayout>
        <template v-slot:main>
            <section
                class="flex flex-col bg-gray-200 w-[1200px] h-[590px] rounded-xl p-2"
            >
                <div class="border-b-[1px] border-b-secondary h-[60px] w-full">
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl text-secondary">
                            Miembros existentes
                        </h1>
                        <button
                            class="flex justify-center bg-green-600 hover:bg-green-700 text-white rounded-md p-2 gap-1"
                            @click="showForm(false)"
                        >
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                </div>
                <div
                    class="grid grid-cols-7 place-content-start w-full h-full overflow-y-auto gap-2 px-4"
                >
                    <div
                        v-for="member in members"
                        :key="member.id"
                        @click="handleMemberCardClick(member.id ?? '')"
                        class="flex justify-center items-center w-32 h-32 bg-primary text-white rounded-lg cursor-pointer hover:scale-105 duration-300 mt-2"
                    >
                        <h1 class="flex flex-col justify-center items-center">
                            <v-icon name="fa-file-code" scale="3" />
                            {{ member.name }}
                        </h1>
                    </div>
                </div>
            </section>

            <ShowComponent>
                <div
                    v-if="isMemberCardVisible"
                    class="flex flex-col justify-start items-center absolute bg-primary w-[600px] h-[600px] text-white rounded-md z-[1000]"
                >
                    <div
                        class="flex justify-between w-full h-14 border-b-2 border-gray-200 p-2"
                    >
                        <div class="flex gap-2">
                            <button
                                class="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 rounded-sm"
                                @click="handleEditMember"
                            >
                                <v-icon name="md-modeeditoutline" scale="1.5" />
                            </button>
                            <button
                                class="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 rounded-sm"
                                @click="handleDeleteMember(member.id ?? '')"
                            >
                                <v-icon name="fa-trash" scale="1.5" />
                            </button>
                        </div>

                        <v-icon
                            class="cursor-pointer"
                            name="io-close"
                            scale="1.5"
                            @click="hideMemberCard"
                        />
                    </div>

                    <h1>Nombre: {{ member.name }}</h1>
                    <h1>Apellido: {{ member.last_name }}</h1>
                    <h1>Email: {{ member.email }}</h1>
                </div>
            </ShowComponent>

            <ShowComponent>
                <MemberForm
                    v-if="isFormVisible"
                    :isUpdate="isUpdate"
                    :member="member"
                    @close="hideForm"
                    @resetMembers="resetMembers"
                />
            </ShowComponent>
        </template>
    </MainLayout>
</template>

<style scoped></style>
