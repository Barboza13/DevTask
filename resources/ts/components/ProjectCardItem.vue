<script lang="ts" setup>
    import { PropType } from "vue"

    import type { Project } from "@interfaces/interfaces"

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
        class="flex justify-center items-center w-52 h-24 bg-gray-200 text-secondary rounded-lg cursor-pointer hover:scale-105 shadow-lg shadow-black/15 transition-transform duration-200 ease-in gap-2"
    >
        <div
            :class="[
                project.status == 'in_progress'
                    ? 'bg-gray-500'
                    : project.status == 'finished'
                      ? 'bg-green-500'
                      : 'bg-red-500',
                'w-2 h-full rounded-l-md',
            ]"
        ></div>
        <div class="flex justify-start items-center w-full h-full gap-2">
            <v-icon name="md-foldercopy" scale="2" />
            <h2 class="text-sm">{{ project.name }}</h2>
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
