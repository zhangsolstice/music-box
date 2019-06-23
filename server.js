const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const chalk = require('chalk')
const Koa = require('koa')
const Router = require('koa-router')
const send = require('koa-send')
const favicon = require('koa-favicon')
const setupDevServer = require('./build/setup-dev-server')
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const microCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 60 * 24
})
const isCacheable = ctx => {
  console.log(ctx.url)
}
const app = new Koa()
const router = new Router()
let renderer
const templatePath = path.resolve('./public/index.template.html')
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync(templatePath, 'utf-8'),
    clientManifest
  })
  router.get('/static/*', async (ctx, next) => {
    await send(ctx, ctx.path, { root: `${__dirname}/dist`})
  })
  router.get('/__webpack_hmr', async (ctx, next) => {

  })
} else {
  setupDevServer(app, templatePath, (bundle, options) => {
    console.log('--rebundle--')
    const option = Object.assign({
      runInNewContext: false
    }, options)
    renderer = createBundleRenderer(bundle, option)
  })
}
const render = async (ctx, next) => {
  ctx.set('Content-Type', 'text/html')
  const handleError = err => {
    if (err.code === 404) {
      ctx.status = 404
      ctx.body = '404 Page Not Found'
    } else {
      ctx.status = 500
      ctx.body = '500 Internal Server Error'
      console.error(`error during render : ${ctx.url}`)
      console.error(err.stack)
    }
  }
  const context = {
    url: ctx.url,
  }
  const cacheable = isCacheable(ctx)
  if (cacheable) {
    const hit = microCache.get(ctx.url)
    if (hit) {
      console.log('from cache', hit)
      return ctx.body = hit
    }
  }
  try {
    const html = await renderer.renderToString(context)
    ctx.body = html
    if (cacheable) {
      console.log('set cache', ctx.url)
      microCache.set(ctx.url, html)
    }
  } catch (error) {
    handleError(error)
  }
}
router.get('*', render)
app.use(favicon(__dirname + '/public/favicon.ico'))
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(4000, '192.168.1.6', () => {
  console.log(chalk.green(`Server Running At http://192.168.1.6:4000`))
})
