<script lang="ts" setup>
    import { Ref, ref, onMounted, onUnmounted } from "vue"
    import MainLayout from "@layouts/MainLayout.vue"
    import MemberForm from "@components/MemberForm.vue"
    import DeleteDialog from "@components/DeleteDialog.vue"
    import MessageDialog from "@components/MessageDialog.vue"
    import ShowComponent from "@transitions/ShowComponent.vue"
    import ShowMessageComponent from "@transitions/ShowMessageComponent.vue"
    import MemberService from "@services/MemberService"

    import type { Member } from "@interfaces/interfaces"

    const service = new MemberService()
    const members: Ref<Member[]> = ref([])
    const isFormVisible: Ref<boolean> = ref(false)
    const isUpdate: Ref<boolean> = ref(false)
    const isMemberCardVisible: Ref<boolean> = ref(false)
    const isDeleteDialogVisible: Ref<boolean> = ref(false)
    const isMessageDialogVisible: Ref<boolean> = ref(false)
    const dialogMessage: Ref<string> = ref("")
    const isLoading: Ref<boolean> = ref(false)
    const member: Ref<Member> = ref({
        id: "",
        name: "",
        last_name: "",
        email: "",
    })

    onMounted(async () => {
        isLoading.value = true

        try {
            await service.fetchMembers()
            members.value = service.getMembers()
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    })

    onUnmounted((): void => service.clearMembers())

    const resetMembers = async (): Promise<void> => {
        service.clearMembers()
        await service.fetchMembers()
        members.value = service.getMembers()
    }

    const changeMemberCardVisibility = (): boolean =>
        (isMemberCardVisible.value = !isMemberCardVisible.value)

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
        changeMemberCardVisibility()
    }

    const changeDeleteDialogVisibility = () =>
        (isDeleteDialogVisible.value = !isDeleteDialogVisible.value)

    const showMessageDialog = (message: string): void => {
        if (message === "") message = "¡Evento desconocido!"

        dialogMessage.value = message
        isMessageDialogVisible.value = true
    }

    const hideMessageDialog = (): boolean =>
        (isMessageDialogVisible.value = false)

    const handleDeleteMember = async (id: string): Promise<void> => {
        try {
            const response = await service.deleteMember(id)

            if (response) {
                showMessageDialog(response.message)
                setTimeout(() => hideMessageDialog(), 3000)
            }

            resetMembers()
            changeMemberCardVisibility()
        } catch (error) {
            showMessageDialog((error as Error).message)
            setTimeout(() => hideMessageDialog(), 3000)
        }
    }

    const handleEditMember = (): void => {
        changeMemberCardVisibility()
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
    <div
        v-if="isDeleteDialogVisible"
        class="absolute w-full h-full z-[1001] bg-black opacity-70"
    ></div>
    <MainLayout>
        <template #main>
            <section
                class="relative flex flex-col bg-gray-200 w-[1200px] h-[500px] rounded-xl p-2"
            >
                <div class="border-b-[1px] border-b-secondary h-[60px] w-full">
                    <div class="flex h-full justify-around items-center">
                        <h1 class="text-2xl text-secondary">
                            Miembros existentes
                        </h1>
                        <button
                            class="flex justify-center text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 gap-1"
                            @click="showForm(false)"
                        >
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                </div>

                <!-- Loading icon -->
                <v-icon
                    v-if="isLoading"
                    class="absolute inset-0 m-auto w-20 h-20"
                    name="ri-loader-4-line"
                    scale="1"
                    animation="spin"
                />
                <!--  -->

                <div
                    class="relative grid grid-cols-1 place-content-start place-items-center w-full h-full overflow-y-auto gap-2 px-2 pt-2"
                >
                    <!-- Member Card -->
                    <div
                        v-if="!isLoading && members.length > 0"
                        v-for="member in members"
                        :key="member.id"
                        @click="handleMemberCardClick(member.id ?? '')"
                        class="flex justify-start items-center w-full h-10 bg-primary text-white rounded-lg cursor-pointer hover:scale-[1.01] shadow-lg shadow-black/35 transition-transform duration-200 ease-in"
                    >
                        <div class="flex justify-center items-center pl-4">
                            <v-icon name="io-person" scale="1" />
                            <h1 class="text-xl pl-2">
                                {{ member.name }} {{ member.last_name }}
                            </h1>
                        </div>
                    </div>
                    <!-- ----------- -->

                    <h1
                        v-else-if="!isLoading"
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 text-secondary"
                    >
                        ¡No hay registros!
                    </h1>
                </div>
            </section>

            <!-- Member floating card -->
            <ShowComponent>
                <div
                    v-if="isMemberCardVisible"
                    class="absolute top-20 flex flex-col justify-start items-center bg-primary w-[500px] h-[300px] text-white rounded-md z-[1000]"
                >
                    <div
                        class="flex justify-between w-full h-14 border-b-2 border-gray-200 p-2"
                    >
                        <div class="flex gap-2">
                            <button
                                class="w-[40px] h-[40px] bg-blue-500 hover:bg-blue-600 transition-color duration-200 ease-in rounded-sm"
                                @click="handleEditMember"
                            >
                                <v-icon name="md-modeeditoutline" scale="1.5" />
                            </button>
                            <button
                                class="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 transition-color duration-200 ease-in rounded-sm"
                                @click="changeDeleteDialogVisibility"
                            >
                                <v-icon name="fa-trash" scale="1.5" />
                            </button>
                        </div>

                        <v-icon
                            class="cursor-pointer"
                            name="io-close"
                            scale="1.5"
                            @click="changeMemberCardVisibility"
                        />
                    </div>

                    <h1>Nombre: {{ member.name }}</h1>
                    <h1>Apellido: {{ member.last_name }}</h1>
                    <h1>Email: {{ member.email }}</h1>
                </div>
            </ShowComponent>
            <!-- -------------------- -->

            <ShowComponent>
                <MemberForm
                    v-if="isFormVisible"
                    :isUpdate="isUpdate"
                    :member="member"
                    @close="hideForm"
                    @resetMembers="resetMembers"
                    @showMessageDialog="showMessageDialog"
                    @hideMessageDialog="hideMessageDialog"
                />
            </ShowComponent>

            <!-- Delete dialog -->
            <ShowComponent>
                <DeleteDialog
                    v-if="isDeleteDialogVisible"
                    @deleteRecord="handleDeleteMember(member.id ?? '')"
                    @changeDeleteDialogVisibility="changeDeleteDialogVisibility"
                />
            </ShowComponent>
            <!-- ------------ -->

            <!-- Message dialog -->
            <ShowMessageComponent>
                <MessageDialog
                    v-show="isMessageDialogVisible"
                    :message="dialogMessage"
                />
            </ShowMessageComponent>
            <!-- -------------- -->
        </template>
    </MainLayout>
</template>

<style scoped></style>
