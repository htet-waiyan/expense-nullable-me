/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import transaction from './transaction';
import profile from './profile';

Vue.use(Vuex);

const state = {
  loading: false,
  networkError: false,
};

const mutations = {
  REQUEST_LOADING(_state, payload) {
    _state.loading = payload;
  },
  NETWORK_ERROR(_state, payload) {
    _state.networkError = payload;
  },
};

const actions = {
  setRequestLoading({ commit }, payload) {
    commit('REQUEST_LOADING', payload);
  },
  setNetworkError({ commit }, payload) {
    commit('NETWORK_ERROR', payload);
  },
};

const getters = {
  loading: _state => _state.loading,
  networkError: _state => _state.networkError,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    transaction,
    profile,
  },
});
