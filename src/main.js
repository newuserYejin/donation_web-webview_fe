import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueQueryPlugin).mount("#app");
