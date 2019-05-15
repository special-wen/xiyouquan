import Vue from "vue";
import Router from "vue-router";
const index = () =>
  import(/* webpackChunkName: "index"  */ "./views/index.vue");
const login = () => import(/* webpackChunkName: "login" */ "./views/login.vue");
const edit = () =>
  import(/* webpackChunkName: "edit" */ "./views/editTopic.vue");
const profile = () =>
  import(/* webpackChunkName: "profile" */ "./views/profile.vue");
const details = () =>
  import(/* webpackChunkName: "details" */ "./views/topicDetails");
const setting = () =>
  import(/* webpackChunkName: "details" */ "./views/setting");
const commentReply = () =>
  import(/* webpackChunkName: "commentReply" */ "./components/comments/CommentReply");
const shareCard = () =>
  import(/* webpackChunkName: "shareCard" */ "./components/share/ShareCard");
const moreComments = () =>
  import(/* webpackChunkName: "moreComments" */ "./components/comments/moreComments");
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: index
      // meta: {
      //   keepAlive: true
      // }
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
      component: edit
      // meta: {
      //   keepAlive: false
      // }
    },
    {
      path: "/topic/details/:topic_id",
      name: "details",
      component: details
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: "/profile/:user_id",
      name: "profile",
      component: profile
      // meta: {
      //   keepAlive: false
      // }
    },
    {
      path: "/compose/reply",
      name: "commentReply",
      component: commentReply
      // meta: {
      //   keepAlive: false
      // }
    },
    {
      path: "/compose/share",
      name: "shareCard",
      component: shareCard
      // meta: {
      //   keepAlive: false
      // }
    },
    {
      path: "/compose/comments",
      name: "moreComments",
      component: moreComments
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: "/profile/setting/:uid",
      name: "setting",
      component: setting
    }
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     console.log(savedPosition);
  //     return savedPosition;
  //   } else {
  //     return {
  //       x: 0,
  //       y: 0
  //     };
  //   }
  // }
});
