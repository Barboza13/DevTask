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
        class="grid grid-cols-1 place-content-start w-full h-full overflow-y-auto gap-2 px-2 pt-2"
    >
        <!-- Project Lists -->
        <div
            v-for="project in props.projects"
            :key="project.id"
            @click="emit('handleProjectClick', project.id ?? '')"
            class="flex justify-start items-center w-full h-10 bg-primary text-white rounded-lg cursor-pointer hover:scale-[1.01] shadow-lg shadow-black/35 transition-transform duration-200 ease-in"
        >
            <div class="flex justify-center items-center pl-4">
                <v-icon name="md-foldercopy" scale="1" />
                <h1 class="text-xl pl-2">
                    {{ project.name }}
                </h1>
            </div>
        </div>
        <!-- ------------ -->
    </div>
</template>

<style scoped></style>
