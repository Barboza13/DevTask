import { defineStore } from "pinia"
import { ref } from "vue"

export const useProjectStore = defineStore("project-view", () => {
    const typeProjectView = ref("card")
    const setTypeProjectView = (view: string) => (typeProjectView.value = view)

    return { typeProjectView, setTypeProjectView }
})
