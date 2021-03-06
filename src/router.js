import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './views/Game.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/game/:id',
      name: 'game',
      component: Game
    },
    {
      path: '/admin/login',
      name: 'admin_login',
      component: () => import(/* webpackChunkName: "admin-login" */ './views/AdminLogin.vue')
    },
    {
      path: '/admin/index',
      name: 'admin_index',
      component: () => import(/* webpackChunkName: "admin-home" */ './views/AdminHome.vue')
    },
    {
      path: '/admin/upload',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin-upload" */ './views/Admin.vue')
    }
  ]
})
