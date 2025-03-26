<script lang="ts" setup>
    const props = defineProps({
        recordName: {
            type: String,
            required: true,
        },
        recordNumber: {
            type: Number,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
    })

    const lowerCaseName: string = props.recordName.toLowerCase()
</script>

<template>
    <div
        class="flex flex-col justify-between items-center w-3/4 h-28 bg-gray-200 shadow-lg shadow-black/35 dark:shadow-gray-200/35 rounded-md p-4"
    >
        <div class="flex justify-start items-center w-full gap-2">
            <h1 class="text-2xl">{{ props.recordName }}</h1>
        </div>
        <div class="flex justify-evenly items-center w-full gap-2">
            <h3 class="w-1/2">Registros: {{ props.recordNumber }}</h3>
            <router-link
                :to="props.link"
                class="flex justify-evenly items-center w-1/2 h-8 text-white bg-green-500 hover:bg-green-600 transition-color duration-200 ease-in rounded-md"
            >
                <span class="text-sm md:text-md">
                    Ver {{ lowerCaseName }}
                </span>
                <v-icon name="hi-arrow-sm-right" fill="white" scale="1.5" />
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
