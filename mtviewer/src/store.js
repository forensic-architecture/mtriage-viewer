import Vue from 'vue'
import Vuex from 'vuex'
import api from './lib/api'
import types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '0.1',
    fetching: true,
    error: null,
    elementmap: {},
    activeBatch: null,
    activeElements: [],
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

    /* CvJson */
    [types.FETCH_NEXT_ELEMENTS_ATTEMPT] (state) {
      state.fetching = true
    },
    [types.FETCH_NEXT_ELEMENTS] (state, elements) {
      state.activeElements = state.activeElements.concat(elements)
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
    cvjson_fetchElements ({ commit, state }, batch) {
      commit(types.FETCH_NEXT_ELEMENTS_ATTEMPT)
      const fromIndex = this.state.activeElements.length
      api.cvjson_fetchElements(batch, fromIndex)
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
