import Vue from "vue";
import VueMeta from 'vue-meta'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import smartTag from "vue-atinternet-smarttag"; //VueJS Plugin für AT Internet
import VueMatomo from 'vue-matomo';

Vue.config.productionTip = false;

//AT Internet
Vue.use(smartTag);
//Matomo
Vue.use(VueMatomo, {
  host: "http://di-tools.t-systems-mms.com/matomo",
  siteId: 1,
  trackerFileName: 'matomo',
  router: router,
  enableLinkTracking: true,
  requireConsent: false,
  trackInitialView: true,
  disableCookies: false,
  enableHeartBeatTimer: false,
  heartBeatTimerInterval: 15,
  debug: false,
  userId: undefined,
  cookieDomain: undefined,
  domains: undefined,
  preInitActions: []
});

Vue.use(VueMeta)

//set auth header
axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
