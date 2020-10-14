/* eslint-disable no-shadow */
const TOKEN = 'real-token';
const USER = 'real-user';

const state = () => ({
  token: localStorage.getItem(TOKEN) || '',
  currentUser: JSON.parse(localStorage.getItem(USER)) || [],
});

const getters = ({
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.currentUser,
  token: (state) => state.token,
});
const mutations = {
  updateUser(state) {
    state.token = localStorage.getItem(TOKEN) || '';
    state.currentUser = JSON.parse(localStorage.getItem(USER)) || [];
  },
};
const actions = {
  loginUser(context, payload) {
    localStorage.setItem(TOKEN, payload.token);
    localStorage.setItem(USER, JSON.stringify(payload.user));
    context.commit('updateUser');
  },
  logOut(context) {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    context.commit('updateUser');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
