import Vue from "vue";
import Router from "vue-router";
import index from "./views/index.vue";
import login from "./views/login.vue";
import details from "./views/topicDetails";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/topic/details/:topic_id",
      name: "details",
      component: details,
      meta: {
        keepAlive: false
      }
    }
  ]
});
