import { createApp } from '@/main'

export default context => {
  //  因为有可能会是异步路由钩子函数或组件，所以返回一个promise，
  //  以便服务器能够等待所有的内容在渲染前就已经准备就绪
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    const meta = app.$meta()
    router.push(context.url) //  设置服务端router的位置
    context.meta = meta
    router.onReady(() => { //  等到router将可能的异步组件和钩子函数解析完
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) { //  匹配不到路由执行reject函数并返回404
        return reject(new Error({ code: 404 }))
      }
      //  由于此函数会在组件实例化之前调用，所以它无法访问this，需要将store和路由信息作为参数传递进去
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
