import Vue from "vue";
import Router from "vue-router";
import index from "./views/index.vue";
import login from "./views/login.vue";
import details from "./views/topicDetails";
import commentReply from "./components/comments/CommentReply";
import ShareCard from "./components/share/ShareCard";
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
        keepAlive: true
      }
    },
    {
      path: "/compose/reply",
      name: "commentReply",
      component: commentReply,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/compose/share",
      name: "shareCard",
      component: ShareCard,
      meta: {
        keepAlive: true
      }
    }
  ]
});
