import "./bootstrap"
import { createApp } from "vue"
import App from "@/ts/App.vue"
import router from "@/ts/router"

const app = createApp(App)

app.use(router)
app.mount("#app")
