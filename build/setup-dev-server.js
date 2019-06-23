const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const devConfig = require('./webpack.config.dev')
const serverConfig = require('./webpack.config.server')
const webpackDevMiddleware = require('./middleware/dev')
const webpackHotMiddleware = require('./middleware/hot')
const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(devConfig.output.path, file), 'utf-8')
  } catch (e) {
    console.log('读取文件错误：', e)
  }
}
module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest
  const update = () => {
    if (bundle && clientManifest) {
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  devConfig.entry.app = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=1000&reload=true', devConfig.entry.app]
  const clientCompiler = webpack(devConfig)
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: devConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })
  app.use(webpackHotMiddleware(clientCompiler))
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })
}
