/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
/**
 *  获取具体的话题的详情信息
 */
const state = {
  topic: {}
};

const mutations = {
  SET_TOPIC: (state, res) => {
    state.topic = res;
  }
};

const actions = {
  setTopic: ({ commit }, res) => {
    commit("SET_TOPIC", res);
  }
};
const getters = {
  getTopic: state => state.topic
};

export default {
  state,
  actions,
  mutations,
  getters
};
