<script lang="ts" setup>
    import { Ref, ref, PropType } from "vue"
    import type { Member } from "@interfaces/projects.ts"

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

    const emit = defineEmits(["close"])

    const name: Ref<string> = ref("")
    const last_name: Ref<string> = ref("")
    const email: Ref<string> = ref("")
    const message: Ref<string> = ref("")

    const handleSubmit = (): void => {}
</script>

<template>
    <form
        class="flex flex-col justify-start items-center absolute bg-primary w-[600px] h-[600px] text-white rounded-md z-[1000]"
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
        <h1 v-if="props.isUpdate" class="text-3xl mb-8">Editar miembro</h1>
        <h1 v-else class="text-3xl mb-8">Nuevo miembro</h1>

        <p v-if="message" class="text-white">
            {{ message }}
        </p>

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
                class="bg-green-600 hover:bg-green-700 text-1xl text-white rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Actualizar
            </button>
            <button
                v-else
                class="bg-green-600 hover:bg-green-700 text-1xl text-white rounded-md p-2 mr-4 w-36"
                type="submit"
            >
                Guardar
            </button>
        </div>
    </form>
</template>
