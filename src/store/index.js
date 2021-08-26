import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import patient from './patient'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    patient
  }
})
