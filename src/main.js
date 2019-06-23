/* eslint-disable no-new */
import Vue from 'vue'
import { createRouter } from 'router/router'
import { createStore } from 'store/store'
import { sync } from 'vuex-router-sync'
import App from './app.vue'
import 'styles/global.styl'

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: (h) => h(App)
  })
  return { app, router, store }
}
