import commentDate from "./commentsDate";
export default {
  install(Vue) {
    Vue.filter("commentDate", commentDate);
  }
};
