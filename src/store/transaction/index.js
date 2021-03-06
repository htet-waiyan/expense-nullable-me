/* eslint-disable no-param-reassign */
import {
  SET_ALL_CATEGORIES,
  ADD_NEW_CATEGORY,
  SET_MTD_EXPENSE_TOTAL,
  SET_SAVING,
  SET_MTD_TRANSACTIONS,
  SET_EXPENSE,
  RESET_MTD_TRANSACTIONS,
  SET_DATA_READY,
  SET_SELECT_TRX,
} from './type.mutation';

import { http } from '../../http';
import { constructParam } from '../../helper';

const CATEGORY_URL = '/category';
const EXPENSE_URL = '/expense';

const state = {
  all: [],
  expenseTotal: 0,
  saving: 0,
  expense: 0,
  transactions: {},
  dataReady: false,
  selectedTransaction: {},
};

const mutations = {
  [SET_ALL_CATEGORIES](_state, payload) {
    _state.all = payload;
  },
  [ADD_NEW_CATEGORY](_state, payload) {
    _state.all.push(payload);
  },
  [SET_MTD_EXPENSE_TOTAL](_state, payload = 0) {
    _state.expenseTotal = payload;
  },
  [SET_SAVING](_state, payload = 0) {
    _state.saving = payload;
  },
  [SET_MTD_TRANSACTIONS](_state, payload = []) {
    _state.transactions = payload;
  },
  [SET_EXPENSE](_state, payload) {
    _state.expense = payload;
  },
  [RESET_MTD_TRANSACTIONS](_state, payload) {
    _state.transactions = payload;
  },
  [SET_DATA_READY](_state, payload) {
    _state.dataReady = payload;
  },
  [SET_SELECT_TRX](_state, payload) {
    _state.selectedTransaction = payload;
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
  fetchMtdTransactions({ commit, dispatch }, params = {}) {
    commit(RESET_MTD_TRANSACTIONS, {});
    commit(SET_DATA_READY, false);
    dispatch('setRequestLoading', true, { root: true });
    const url = constructParam(`${EXPENSE_URL}/mtd`, params);
    return http.get(url)
      .then((response) => {
        dispatch('setRequestLoading', false, { root: true });
        commit(SET_MTD_TRANSACTIONS, response.data.data.transactions);
        commit(SET_SAVING, response.data.data.saving);
        commit(SET_MTD_EXPENSE_TOTAL, response.data.data.totalSpend);
        commit(SET_EXPENSE, response.data.data.expense);
        commit(SET_DATA_READY, true);
      })
      .catch((error) => {
        if (!error.response.status || error.response.status === 500) {
          dispatch('setNetworkError', true, { root: true });
        }
        dispatch('setRequestLoading', false, { root: true });
        return error;
      });
  },
  removeTransaction({ dispatch }, id) {
    dispatch('setRequestLoading', true, { root: true });
    return http.delete(`${EXPENSE_URL}/${id}`)
      .then((response) => {
        dispatch('setRequestLoading', false, { root: true });
        return response.data;
      });
  },
  setSelectedTrx({ commit }, trx) {
    commit(SET_SELECT_TRX, trx);
  },
};

const getters = {
  all: _state => _state.all,
  expenseTotal: _state => _state.expenseTotal,
  saving: _state => _state.saving,
  transactions: _state => _state.transactions,
  expense: _state => _state.expense,
  dataReady: _state => _state.dataReady,
  selectedTransaction: _state => _state.selectedTransaction,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
