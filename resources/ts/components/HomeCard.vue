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
        img: {
            type: String,
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
        class="flex flex-col justify-between items-center w-3/4 h-36 bg-gray-200 rounded-md gap-4 p-4"
    >
        <div class="flex justify-start items-center w-full gap-2">
            <img class="w-12" :src="props.img" :alt="lowerCaseName + ' icon'" />
            <h1 class="text-3xl">{{ props.recordName }}</h1>
        </div>
        <div class="flex justify-evenly items-center w-full gap-2">
            <h3 class="w-1/2">Registros: {{ props.recordNumber }}</h3>
            <router-link
                :to="props.link"
                class="flex justify-evenly items-center w-1/2 h-8 text-white bg-green-500 hover:bg-green-600 rounded-md"
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
