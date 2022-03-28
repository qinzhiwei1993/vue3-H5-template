import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/styles/index.less'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$http = axios
app.config.globalProperties.$store = store

app.use(store).use(router).mount("#app");


