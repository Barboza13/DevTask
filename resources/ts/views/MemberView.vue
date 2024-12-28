<script lang="ts" setup>
    import { Ref, ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import MemberForm from "@components/MemberForm.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import MemberService from "@services/MemberService"

    import type { Member } from "@/interfaces/interfaces"

    const service = new MemberService()
    const members: Ref<Member[]> = ref([])
    const isFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const isMemberCardVisible: Ref<boolean> = ref(false)
    const isLoading: Ref<boolean> = ref(false)
    const member: Ref<Member> = ref({
        id: "",
        name: "",
        last_name: "",
        email: "",
    })

    onMounted(async () => {
        isLoading.value = true
        await service
            .fetchMembers()
            .then(() => {
                members.value = service.getMembers()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                isLoading.value = false
            })
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

    const handleMemberCardClick = (id: string): void => {
        const memberData: Member | undefined = service.getMemberById(id)

        if (!memberData) {
            alert("¡Proyecto no encontrado!")
            return
        }

        member.value = memberData
        showMemberCard()
    }

    const handleDeleteMember = (id: string): void => {
        service
            .deleteMember(id)
            .then(async (data) => {
                if (data) {
                    alert(data.message)
                }

                resetMembers()
                hideMemberCard()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEditMember = (): void => {
        hideMemberCard()
        showForm(true)
    }
</script>

<template>
    <div
        v-if="isMemberCardVisible"
        class="absolute w-full h-full z-[999] bg-black opacity-70"
    ></div>
    <div
        v-if="isFormVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <MainLayout>
        <template v-slot:main>
            <section
                class="flex flex-col bg-gray-200 w-[1200px] h-[500px] rounded-xl p-2"
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

                <!-- Loading icon -->
                <div
                    v-if="isLoading"
                    class="flex justify-center items-center w-full h-full"
                >
                    <v-icon
                        name="ri-loader-4-line"
                        scale="4"
                        animation="spin"
                    />
                </div>
                <!--  -->

                <div
                    v-else
                    class="flex flex-col justify-start items-center w-full h-full overflow-y-auto gap-2 px-2 pt-2"
                >
                    <!-- Member Card -->
                    <div
                        v-for="member in members"
                        :key="member.id"
                        @click="handleMemberCardClick(member.id ?? '')"
                        class="flex justify-start items-center w-full h-10 bg-primary text-white rounded-full cursor-pointer hover:scale-[1.01] duration-75 mt-[.5px]"
                    >
                        <div class="flex justify-center items-center pl-4">
                            <v-icon name="io-person" scale="1" />
                            <h1 class="text-xl pl-2">{{ member.name }}</h1>
                        </div>
                    </div>
                    <!-- ----------- -->
                </div>
            </section>

            <ShowComponent>
                <div
                    v-if="isMemberCardVisible"
                    class="flex flex-col justify-start items-center absolute bg-primary w-[500px] h-[500px] text-white rounded-md z-[1000]"
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
