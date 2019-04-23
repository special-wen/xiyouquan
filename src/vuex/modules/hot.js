/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
/**
 *  获取输入框中热门信息
 */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const state = {
  hotwords: ""
};

const mutations = {
  SET_HOT_WORDS: (state, res) => {
    state.hotwords = res;
  }
};

const actions = {
  setHotWords: ({ commit }, uid) => {
    axios
      .get("http://localhost:8080/api/hot", { params: { uid: uid } })
      .then(rst => {
        if (rst.data && rst.data.ok === 1) {
          if (rst.data.data && rst.data.data.hot.ok === 1) {
            const result = rst.data.data.hot.hotword;
            console.log(result);
            commit("SET_HOT_WORDS", result);
          }
        }
      });
  }
};

const getters = {
  getHotWords: state => state.hotwords
};

export default {
  state,
  actions,
  mutations,
  getters
};
