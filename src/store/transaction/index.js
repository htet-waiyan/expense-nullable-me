/* eslint-disable no-param-reassign */
import {
  SET_ALL_CATEGORIES,
  ADD_NEW_CATEGORY,
} from './type.mutation';

import http from '../../http';

const CATEGORY_URL = '/category';

const state = {
  all: [],
};

const mutations = {
  [SET_ALL_CATEGORIES](_state, payload) {
    _state.all = payload;
  },
  [ADD_NEW_CATEGORY](_state, payload) {
    _state.all.push(payload);
  },
};

const actions = {
  fetchAllCategories({ commit, dispatch }) {
    dispatch('setRequestLoading', true, { root: true });
    return http.get(CATEGORY_URL)
      .then((response) => {
        commit(SET_ALL_CATEGORIES, response.data);
        dispatch('setRequestLoading', false, { root: true });
        return response.data;
      })
      .catch((error) => {
        if (!error.status || error.status === 500) {
          dispatch('setNetworkError', true, { root: true });
        }
        return error;
      });
  },
  createNewCategory({ commit, dispatch }, payload) {
    dispatch('setRequestLoading', true, { root: true });
    return http.post(CATEGORY_URL, payload)
      .then((response) => {
        commit(ADD_NEW_CATEGORY, response.data);
        dispatch('setRequestLoading', false, { root: true });
        return response.data;
      })
      .catch((error) => {
        if (!error.status || error.status === 500) {
          dispatch('setNetworkError', true, { root: true });
        }
        dispatch('setRequestLoading', false, { root: true });
        return error;
      });
  },
};

const getters = {
  all: _state => _state.all,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
