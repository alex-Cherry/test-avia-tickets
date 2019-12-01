import Vue from 'vue'
import Vuex from 'vuex'
// import store for aviasales
import aviasales from './aviasales'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: false
  },
  mutations: {
    setMobile (state, val) {
      state.isMobile = val
    }
  },
  actions: {
  },
  modules: {
    aviasales
  }
})
