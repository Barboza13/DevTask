<script lang="ts" setup>
    import { Ref, ref, onMounted, onUnmounted } from "vue"
    import MemberService from "@services/MemberService"

    import type { MemberName } from "@interfaces/interfaces"

    const emit = defineEmits(["close"])

    const service = new MemberService()
    const members: Ref<MemberName[]> = ref([])
    const message: Ref<string> = ref("")

    onMounted(async () => {
        await service.fetchMembersNames()
        members.value = service.getMembersNames()
    })

    onUnmounted(() => service.clearMembersNames())

    const handleSubmit = (): void => {}
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute top-[100px] bg-primary w-[500px] h-[300px] text-white rounded-md z-[1000]"
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
                class="bg-green-600 hover:bg-green-700 text-1xl text-white rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>

<style scoped></style>
