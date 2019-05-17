import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    password: null
  },
  mutations: {
    savePassword(state, password) {
      state.password = password
    }
  },
  actions: {

  }
})
