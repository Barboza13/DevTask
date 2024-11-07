import { createApp } from "vue"
import { createPinia } from "pinia"

import "./bootstrap"
import App from "@/App.vue"
import router from "@/router"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { CoPlus, IoClose, FaFileCode } from "oh-vue-icons/icons"

const app = createApp(App)
const pinia = createPinia()

addIcons(CoPlus, IoClose, FaFileCode)
app.component("v-icon", OhVueIcon)
app.use(router)
app.use(pinia)
app.mount("#app")
