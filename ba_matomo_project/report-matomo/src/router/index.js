import { createRouter, createWebHashHistory } from "vue-router";
import SideBar from "../views/SideBar.vue";
import Visitors from "../components/Visitors.vue";
import Behaviors from "../components/Behaviors.vue";
import Ecommerce from "../components/Ecommerce.vue";
import MarketPlace from "../components/MarketPlace.vue";
import Target from "../components/Target.vue";
import Acquisition from "../components/Acquisition.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: SideBar,
  },
  {
    path: "/visitors",
    name: "visitors",
    component: Visitors,
  },
  {
    path: "/behaviors",
    name: "Behaviors",
    component: Behaviors,
  },
  {
    path: "/ecommerce",
    name: "Ecommerce",
    component: Ecommerce,
  },
  {
    path: "/marketPlace",
    name: "MarketPlace",
    component: MarketPlace,
  },
  {
    path: "/target",
    name: "Target",
    component: Target,
  },
  {
    path: "/acquisition",
    name: "Acquisition",
    component: Acquisition,
  },
  {
    path: "/ContentView",
    name: "ContentView",
    // route level code-splitting
    // this generates a separate chunk (ContentView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ContentView" */ "../views/ContentView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
