import Vue from "vue";
import Router from "vue-router";
import index from "./views/index.vue";
import login from "./views/login.vue";
import edit from "./views/editTopic.vue";
import profile from "./views/profile.vue";
import details from "./views/topicDetails";
import commentReply from "./components/comments/CommentReply";
import shareCard from "./components/share/ShareCard";
import moreComments from "./components/comments/moreComments";
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
      path: "/edit",
      name: "edit",
      component: edit,
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
      path: "/profile/:user_id",
      name: "profile",
      component: profile,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compose/reply",
      name: "commentReply",
      component: commentReply,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compose/share",
      name: "shareCard",
      component: shareCard,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compose/comments",
      name: "moreComments",
      component: moreComments,
      meta: {
        keepAlive: true
      }
    }
  ]
});
