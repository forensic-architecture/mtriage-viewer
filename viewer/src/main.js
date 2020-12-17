import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import store from "./store";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  store,
  router,
}).$mount("#app");
