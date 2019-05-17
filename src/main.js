import './assets/google'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify/lib'

import swal from 'sweetalert'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.mixin({
  methods: {
    $handleError(error) {
      return swal('错误', '发生错误：' + error.message, 'error')
    }
  }
})

import App from './App.vue'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
