/* eslint-disable no-param-reassign */
import {
  SET_PROFILE,
  SET_TOTAL_INCOME,
} from './type.mutation';

import { http } from '../../http';

const state = {
  profile: {},
  totalIncome: -1,
};

const mutations = {
  [SET_PROFILE](_state, payload) {
    _state.profile = payload;
  },
  [SET_TOTAL_INCOME](_state, payload) {
    _state.totalIncome = +payload;
  },
};

const actions = {
  fetchProfile({ commit }) {
    return http.get('/user')
      .then((response) => {
        commit(SET_PROFILE, response.data);
        return response.data;
      });
  },
  fetchTotalIncome({ commit }) {
    return http.get('/income/total')
      .then((response) => {
        commit(SET_TOTAL_INCOME, response.data.totalIncome);
        return response.data;
      });
  },
};

const getters = {
  profile: _state => _state.profile,
  totalIncome: _state => _state.totalIncome,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
