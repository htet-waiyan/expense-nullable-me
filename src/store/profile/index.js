/* eslint-disable no-param-reassign */
import {
  SET_PROFILE,
  SET_TOTAL_INCOME,
  SET_ALL_INCOMES,
  SET_BASE_CURRENCY,
} from './type.mutation';

import { http } from '../../http';

const state = {
  profile: {},
  totalIncome: -1,
  baseCurrency: '',
  incomes: [],
};

const mutations = {
  [SET_PROFILE](_state, payload) {
    _state.profile = payload;
  },
  [SET_TOTAL_INCOME](_state, payload) {
    _state.totalIncome = +payload;
  },
  [SET_ALL_INCOMES](_state, payload) {
    _state.incomes = payload;
  },
  [SET_BASE_CURRENCY](_state, payload) {
    _state.baseCurrency = payload;
  },
};

const actions = {
  fetchProfile({ commit }) {
    return http.get('/user')
      .then((response) => {
        commit(SET_PROFILE, response.data);
        commit(SET_BASE_CURRENCY, response.data.baseCurrency);
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
  fetchAllIncomes({ commit }) {
    return http.get('/income')
      .then((response) => {
        commit(SET_ALL_INCOMES, response.data.data);
        return response.data.data;
      });
  },
};

const getters = {
  profile: _state => _state.profile,
  totalIncome: _state => _state.totalIncome,
  incomes: _state => _state.incomes,
  baseCurrency: _state => _state.baseCurrency,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
