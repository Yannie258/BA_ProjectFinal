import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import "./assets/tailwind.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";

import router from "./router";
const app = createApp(App);
app.component("Datepicker", Datepicker);
app.use(store);
app.use(PrimeVue);
app.use(router);

app.component("Dialog", Dialog);
app.mount("#app");
