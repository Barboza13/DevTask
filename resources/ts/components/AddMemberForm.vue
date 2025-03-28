<script lang="ts" setup>
    import { Ref, ref, onMounted, onUnmounted } from "vue"
    import MemberService from "@services/MemberService"
    import ProjectService from "@services/ProjectService"

    import type { MemberName } from "@interfaces/interfaces"

    const props = defineProps({
        project_id: {
            type: Number,
            required: true,
        },
    })

    const emit = defineEmits([
        "close",
        "showMessageDialog",
        "hideMessageDialog",
    ])

    const service = new MemberService()
    const serviceProject = new ProjectService()
    const members: Ref<MemberName[]> = ref([])
    const selectMemberId: Ref<string> = ref("")
    const message: Ref<string> = ref("")

    onMounted(async () => {
        await service.fetchMembersNames()
        members.value = service.getMembersNames()
    })

    onUnmounted(() => service.clearMembersNames())

    const handleSubmit = (event: Event): void => {
        event.preventDefault()

        serviceProject
            .addMember(
                props.project_id.toString(),
                selectMemberId.value.toString(),
            )
            .then((data) => {
                if (data) {
                    emit("showMessageDialog", data.message)
                }

                setTimeout(() => emit("hideMessageDialog"), 3000)

                selectMemberId.value = ""
            })
            .catch((error) => {
                console.error(error)
            })
    }
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute top-[100px] bg-primary w-[500px] h-[300px] text-white rounded-md z-[1002]"
        @submit="handleSubmit"
    >
        <div class="flex justify-end w-full p-2">
            <v-icon
                class="cursor-pointer"
                name="io-close"
                scale="1.5"
                @click="emit('close')"
            />
        </div>
        <h1 class="text-3xl mb-8">Agregar miembro al proyecto</h1>

        <p v-if="message" class="text-white">
            {{ message }}
        </p>

        <div class="flex flex-col w-[90%] mb-6">
            <label for="member_id">Miembro</label>
            <select
                class="w-full h-10 bg-white text-black outline-none p-2 rounded-lg cursor-pointer"
                name="member_id"
                id="member_id"
                v-model="selectMemberId"
            >
                <option disabled selected value="">
                    Seleccione una opcion
                </option>
                <option
                    v-for="member in members"
                    :key="member.id"
                    :value="member.id"
                >
                    {{ member.name }}
                </option>
            </select>
        </div>

        <div class="flex justify-end w-[90%] mb-6">
            <button
                class="text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>

<style scoped></style>
