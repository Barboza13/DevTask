<script lang="ts" setup>
    import { PropType } from "vue"

    import type { Project } from "@/interfaces/interfaces"

    const props = defineProps({
        projects: {
            type: Array as PropType<Project[]>,
            required: true,
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
    })

    const emits = defineEmits(["handleProjectClick"])
</script>

<template>
    <div
        v-if="!props.isLoading && props.projects.length > 0"
        v-for="project in props.projects"
        :key="project.id"
        @click="emits('handleProjectClick', project.id ?? '')"
        class="flex justify-start items-center w-full h-10 bg-primary text-white rounded-lg cursor-pointer hover:scale-[1.01] shadow-lg shadow-black/35 transition-transform duration-200 ease-in"
    >
        <div class="flex justify-center items-center pl-4">
            <v-icon name="md-foldercopy" scale="1" />
            <h1 class="text-xl pl-2">
                {{ project.name }}
            </h1>
        </div>
    </div>
    <h1
        v-else-if="!props.isLoading"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 text-secondary"
    >
        ¡No hay registros!
    </h1>
</template>

<style scoped></style>
