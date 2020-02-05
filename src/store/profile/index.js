/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  SET_PROFILE,
  SET_TOTAL_INCOME,
  SET_ALL_INCOMES,
  SET_BASE_CURRENCY,
  SET_SELECTED_INCOME,
  SET_CURRENCY_SYMBOL,
} from './type.mutation';

import constant from '../../constant';
import { http } from '../../http';

const state = {
  profile: {},
  totalIncome: -1,
  baseCurrency: 'SGD',
  currencyCode: 'S$',
  selectedIncome: {},
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
  [SET_CURRENCY_SYMBOL](_state, payload) {
    _state.currencyCode = payload;
  },
  [SET_SELECTED_INCOME](_state, payload) {
    _state.selectedIncome = payload;
  },
};

// TODO: income should have its own vuex store

const actions = {
  fetchProfile({ commit, dispatch }) {
    return http.get('/user')
      .then((response) => {
        commit(SET_PROFILE, response.data);
        dispatch('setBaseCurrency', response.data.baseCurrency);
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
  removeIncome({ commit }, id) {
    return http.delete(`/income/${id}`)
      .then(response => response.data);
  },
  setBaseCurrency({ commit }, base) {
    const currency = constant.CURRENCIES[base];
    commit(SET_BASE_CURRENCY, base);
    commit(SET_CURRENCY_SYMBOL, currency.symbol);
  },
};

const getters = {
  profile: _state => _state.profile,
  totalIncome: _state => _state.totalIncome,
  incomes: _state => _state.incomes,
  baseCurrency: _state => _state.baseCurrency,
  selectedIncome: _state => _state.selectedIncome,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
