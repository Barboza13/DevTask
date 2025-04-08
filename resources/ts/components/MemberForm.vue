<script lang="ts" setup>
    import { Ref, ref, PropType } from "vue"
    import MemberService from "@services/MemberService"

    import type { Member } from "@interfaces/interfaces"

    const props = defineProps({
        isUpdate: {
            type: Boolean,
            required: false,
        },
        member: {
            type: Object as PropType<Member>,
            required: false,
        },
    })

    const emits = defineEmits([
        "close",
        "resetMembers",
        "showMessageDialog",
        "hideMessageDialog",
    ])

    const service = new MemberService()
    const name: Ref<string> = ref("")
    const last_name: Ref<string> = ref("")
    const email: Ref<string> = ref("")

    if (props.isUpdate) {
        name.value = props.member?.name ?? ""
        last_name.value = props.member?.last_name ?? ""
        email.value = props.member?.email ?? ""
    }

    const handleSubmit = async (event: Event): Promise<void> => {
        event.preventDefault()

        const member: Member = {
            name: name.value,
            last_name: last_name.value,
            email: email.value,
        }

        if (props.isUpdate) {
            try {
                const response = await service.updateMember(
                    member,
                    props.member?.id ?? "",
                )

                if (response) {
                    emits("showMessageDialog", response.message)
                }

                setTimeout(() => emits("hideMessageDialog"), 3000)

                emits("resetMembers")
                emits("close")
            } catch (error) {
                emits("showMessageDialog", (error as Error).message)
                setTimeout(() => emits("hideMessageDialog"), 3000)
            }
        } else {
            try {
                const response = await service.saveMember(member)

                if (response) {
                    emits("showMessageDialog", response.message)
                }

                setTimeout(() => emits("hideMessageDialog"), 3000)

                emits("resetMembers")
            } catch (error) {
                emits("showMessageDialog", (error as Error).message)
                setTimeout(() => emits("hideMessageDialog"), 3000)
            } finally {
                name.value = ""
                last_name.value = ""
                email.value = ""
            }
        }
    }
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute top-10 bg-primary w-[500px] h-[500px] text-white rounded-md z-[1002]"
        @submit="handleSubmit"
    >
        <div class="flex justify-end w-full p-2">
            <v-icon
                class="cursor-pointer"
                name="io-close"
                scale="1.5"
                @click="emits('close')"
            />
        </div>
        <h1 v-if="props.isUpdate" class="text-3xl mb-8">Editar miembro</h1>
        <h1 v-else class="text-3xl mb-8">Nuevo miembro</h1>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="name">Nombre</label>
            <input
                class="w-full h-10 bg-white text-black outline-none rounded-lg p-2"
                type="text"
                v-model="name"
                name="name"
                id="name"
                required
            />
        </div>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="last_name">Apellido</label>
            <input
                class="w-full h-10 bg-white text-black outline-none rounded-lg p-2"
                type="text"
                v-model="last_name"
                name="last_name"
                id="last_name"
                required
            />
        </div>

        <div class="flex flex-col w-[90%] mb-6">
            <label class="mb-2" for="email">Email</label>
            <input
                class="w-full h-10 bg-white text-black outline-none p-2 rounded-lg"
                type="email"
                v-model="email"
                name="email"
                id="email"
                required
            />
        </div>

        <div class="flex justify-end w-full">
            <button
                v-if="props.isUpdate"
                class="text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Actualizar
            </button>
            <button
                v-else
                class="text-white bg-green-600 hover:bg-green-700 transition-color duration-200 ease-in rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>
