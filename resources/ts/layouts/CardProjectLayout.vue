<script lang="ts" setup>
    import { PropType } from "vue"

    import type { Project } from "@interfaces/interfaces"

    const props = defineProps({
        projects: {
            type: Array as PropType<Project[]>,
            required: true,
        },
    })

    const emit = defineEmits(["handleProjectClick"])
</script>

<template>
    <div
        class="grid grid-cols-5 place-content-start place-items-center w-full h-full overflow-y-auto gap-2 pt-2"
    >
        <!-- Project Cards -->
        <div
            v-for="project in props.projects"
            :key="project.id"
            @click="emit('handleProjectClick', project.id ?? '')"
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
        <!-- ------------ -->
    </div>
</template>

<style scoped></style>
