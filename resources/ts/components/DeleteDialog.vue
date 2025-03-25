<script lang="ts" setup>
    const emits = defineEmits(["deleteRecord", "changeDeleteDialogVisibility"])

    const deleteRecord = () => {
        emits("deleteRecord")
        emits("changeDeleteDialogVisibility")
    }
</script>

<template>
    <dialog
        class="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center w-[400px] h-[150px] bg-primary shadow-lg shadow-black/35 rounded-md z-[1002] gap-6 p-4"
    >
        <h1 class="text-xl text-white">
            ¿Seguro que desea eliminar el registro?
        </h1>
        <section
            class="flex justify-center items-center w-full text-white gap-4 px-2"
        >
            <button
                class="bg-gray-500 hover:bg-gray-600 rounded-md w-1/2 h-10 transition-colors duration-200 ease-in"
                @click="emits('changeDeleteDialogVisibility')"
            >
                Cancelar
            </button>
            <button
                class="bg-red-500 hover:bg-red-600 rounded-md w-1/2 h-10 transition-colors duration-200 ease-in"
                @click="deleteRecord"
            >
                Eliminar
            </button>
        </section>
    </dialog>
</template>

<style scoped></style>
