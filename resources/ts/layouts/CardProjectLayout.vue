<script lang="ts" setup>
    import { PropType } from "vue"

    import type { Project } from "@/interfaces/interfaces"

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
        class="grid grid-cols-7 place-content-start w-full h-full overflow-y-auto gap-2 px-4"
    >
        <!-- Project Cards -->
        <div
            v-for="project in props.projects"
            :key="project.id"
            @click="emit('handleProjectClick', project.id ?? '')"
            class="flex justify-center items-center w-32 h-32 bg-primary text-white rounded-lg cursor-pointer hover:scale-105 shadow-lg shadow-black/35 transition-transform duration-200 ease-in mt-2"
        >
            <h1 class="flex flex-col justify-center items-center">
                <v-icon name="md-foldercopy" scale="3" />
                {{ project.name }}
            </h1>
        </div>
        <!-- ------------ -->
    </div>
</template>

<style scoped></style>
