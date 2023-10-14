import { createRouter, createWebHashHistory } from "vue-router";
// import Introduction from "../views/Introduction.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  //   {
  //     path: "/intro",
  //     name: "Introduction",
  //     component: Introduction,
  //   },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
