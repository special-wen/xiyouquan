/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
/**
 * 存放登录后的用户信息
 */

const state = {
  userLoginInfo: ""
};

const mutations = {
  SET_USER_LOGIN_INFO: (state, res) => {
    state.userLoginInfo = res;
  }
};

const actions = {
  setUserLoginInfo: ({ commit }, res) => commit("SET_USER_LOGIN_INFO", res)
};

const getters = {
  getUserLoginInfo: state => state.userLoginInfo
};

export default {
  state,
  actions,
  mutations,
  getters
};
