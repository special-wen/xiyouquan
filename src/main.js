import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import axios from "axios";
import filters from "./filters/";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(filters);
// axios.defaults.baseURL = "http://localhost:3000";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
