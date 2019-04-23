import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import hot from "./modules/hot";
import details from "./modules/topic";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login, // 登录 用户信息
    hot, // 搜索框中默认信息
    details // 详情
  }
});

export default store;
