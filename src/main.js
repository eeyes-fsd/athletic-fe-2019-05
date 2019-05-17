import './assets/google'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {
  iconfont: 'md'
})

import App from './App.vue'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
