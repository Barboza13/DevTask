import "./bootstrap"
import { createApp } from "vue"
import App from "@/ts/App.vue"
import router from "@/ts/router"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { CoPlus, IoClose } from "oh-vue-icons/icons"

const app = createApp(App)

addIcons(CoPlus, IoClose)
app.component("v-icon", OhVueIcon)
app.use(router)
app.mount("#app")
