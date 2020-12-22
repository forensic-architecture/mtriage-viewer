import Vue from 'vue'
import Vuex from 'vuex'
import api from './lib/api'
import types from './mutation-types'

Vue.use(Vuex)

// const STUB_BATCH = {"elements":["bz9dsdDgZIE","7X2aVY8w994","mw8rsJJ1IU4","FE6ldph-64U","1NvOehAj5Uo","F_9awSnnbus","aXzMyN11CyE","rn7Pm6DsRTs","_rank","f7AVuE4DVcQ","MTlSLQujiTM"],"etype":"CvJson","query":"KerasPretrained"}
const STUB_BATCH = null

export default new Vuex.Store({
  state: {
    version: '0.1',
    fetching: true,
    error: null,
    elementmap: {},
    activeBatch: STUB_BATCH,
    activeLabels: ["tank", "pistol", "rifle", "jeep", "missile"],
    activeElements: [],
    batch: {
      label: null,
      threshold: 0,
      ranking: null
    }
  },
  mutations: {
    [types.FETCH_FROM_BATCH_ATTEMPT] (state) {
      state.fetching = true
    },
    [types.FETCH_FROM_BATCH_ERROR] (state, msg) {
      state.fetching = false
      state.error = msg
    },
    [types.FETCH_FROM_BATCH] (state, elements) {
      state.activeElements = [...state.activeElements, ...elements]
      state.fetching = false
    },
    [types.FETCH_ATTRIBUTE_ATTEMPT] (state) {
      state.fetching = true
    },
    [types.FETCH_ATTRIBUTE_ERROR] (state, msg) {
      state.fetching = false
      state.error = msg
    },
    [types.FETCH_ATTRIBUTE] (state, vl) {
      state.batch[vl.attribute] = vl.value
      state.fetching = false
    },
    [types.FETCH_BATCHES_ATTEMPT] (state) {
      state.fetching = true
    },
    [types.FETCH_BATCHES] (state, elementmap) {
      state.elementmap = elementmap
      state.fetching = false
    },
    [types.FETCH_BATCHES_ERROR] (state, msg) {
      state.fetching = false
      state.error = msg
    },
    [types.SET_ACTIVE_BATCH] (state, batch) {
      state.activeBatch = batch
    },
    [types.UPDATE_THRESHOLD] (state, threshold) {
      state.batch.threshold = threshold
    },
    [types.UPDATE_LABEL] (state, label) {
      state.batch.label = label
    },
  },
  actions: {
    fetchBatches ({ commit }, pages) {
      commit(types.FETCH_BATCHES_ATTEMPT)
      api.fetchBatches()
        .then(result => {
          commit(types.FETCH_BATCHES, result.data)
        })
        .catch(err => {
          commit(types.FETCH_BATCHES_ERROR, err.message)
        })
    },
    fetchFromBatch({ commit, state }, data) {
      commit(types.FETCH_FROM_BATCH_ATTEMPT)
      api.fetchFromBatch(data.q, data.elements)
        .then(result => {
          commit(types.FETCH_FROM_BATCH, result)
        })
        .catch(err => {
          commit(types.FETCH_FROM_BATCH_ERROR, err.message)
        })
    },
    fetchAttribute({ commit }, data) {
      commit(types.FETCH_ATTRIBUTE_ATTEMPT)
      api.fetchAttribute(data.attribute, data.query)
        .then(result => {
          commit(types.FETCH_ATTRIBUTE, { attribute: data.attribute, value: result })
        })
        .catch(err => {
          commit(types.FETCH_ATTRIBUTE_ERROR, err.message)
        })
    },
  }
})
