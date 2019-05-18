import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    password: null,
    admin_edit_game: null
  },
  mutations: {
    savePassword(state, password) {
      state.password = password
    },
    setAdminEditGame(state, paylod) {
      state.admin_edit_game = paylod
    }
  },
  actions: {

  }
})
