import { createApp } from "vue"
import App from "./app"
import router from "./router"
import store from "./store"
import "./global.scss"

createApp(App).use(router).use(store).mount("#app")