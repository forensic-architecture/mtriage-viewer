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
      threshold: 0
    }
  },
  mutations: {
    [types.FETCH_BATCHES_ATTEMPT] (state) {
      state.fetching = true
    },
    [types.FETCH_BATCHES] (state, elementmap) {
      state.elementmap = elementmap
      state.fetching = false
    },
    [types.FETCH_BATCHES_ERROR] (state, msg) {
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

    /* CvJson */
    [types.FETCH_NEXT_ELEMENTS_ATTEMPT] (state) {
      state.fetching = true
    },
    [types.FETCH_NEXT_ELEMENTS] (state, elements) {
      // state.activeElements = state.activeElements.concat(elements)
      state.activeElements = [...state.activeElements, ...elements]
      state.fetching = false
    },
    [types.FETCH_NEXT_ELEMENTS_ERROR] (state, msg) {
      state.error = msg
    },
    [types.FETCH_RANKING] (state, ranking) {
      state.ranking = ranking
      state.fetching = false
    }

  },
  actions: {
    fetchBatches ({ commit, state }, pages) {
      commit(types.FETCH_BATCHES_ATTEMPT)
      api.fetchBatches()
        .then(result => {
          commit(types.FETCH_BATCHES, result.data)
        })
        .catch(err => {
          commit(types.FETCH_BATCHES_ERROR, err.message)
        })
    },
    cvjson_fetchElements ({ commit, state }, { batch, pageNo }) {
      commit(types.FETCH_NEXT_ELEMENTS_ATTEMPT)
      const page = pageNo !== null ? pageNo : 0
      return api.cvjson_fetchElements(batch, batch.label, page, 10)
        .then(result => {
          commit(types.FETCH_NEXT_ELEMENTS, result)
        })
        // .catch(err => {
        //   console.log(err.message)
        //   commit(types.FETCH_NEXT_ELEMENTS_ERROR, err.message)
        // })
    },
  }
})
