import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import routes from 'router/routes.js'
Vue.use(VueRouter)
Vue.use(Meta)

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    base: '/',
    routes: routes
  })
}
