/* eslint-disable no-new */
import Vue from 'vue'
import { createRouter } from 'router/router'
import { createStore } from 'store/store'
import { sync } from 'vuex-router-sync' //  把vue-router的状态放进vuex的state中
import App from './app.vue'
import 'styles/global.styl'

export function createApp () {
  const router = createRouter() //  实例
  const store = createStore() //  实例
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: (h) => h(App)
  })
  return { app, router, store }
}
