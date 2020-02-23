/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import {
  SET_ALLOCATION,
} from './type.mutation';

import { http } from '../../http';

const ALLOCATION_URL = '/allocation';

const state = {
  selectedAllocation: {},
};

const mutations = {
  [SET_ALLOCATION](_state, payload) {
    _state.selectedAllocation = payload;
  },
};

const actions = {
  allocate({ commit }, payload) {
    return http.post(ALLOCATION_URL, payload)
      .then(response => response.data);
  },
  updateAllocation({ commit }, payload) {
    return http.put(`${ALLOCATION_URL}/${payload._id}`, payload)
      .then(response => response.data);
  },
};

const getters = {
  selectedAllocation: _state => _state.selectedAllocation,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
