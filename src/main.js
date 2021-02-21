import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import comm from '@/utils/comm.js'

import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'
import 'normalize.css'

import '@/style/comm.css'
import '@/assets/iconfont/iconfont.css'
import '@/api/request.js'
import repre from '@/components/represent.vue'
Vue.use(Vant)
Vue.use(comm)
Vue.component('repre', repre)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
