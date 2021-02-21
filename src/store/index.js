import Vue from 'vue'
import Vuex from 'vuex'
import { auInfo } from '@/api/my.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
    formEchart: {}
  },
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    },
    setLogin (state, value) {
      state.isLogin = value
    },
    setFormEchart (state, value) {
      state.formEchart = value
    }
  },
  actions: {
    async refreshUserInfo (store) {
      try {
        const res = await auInfo()
        store.commit('setUserInfo', res.data)
      } catch (err) {
        console.log(err)
      }
    }
    // this.$store.dispatch('refreshUserInfo')
  },
  modules: {}
})
