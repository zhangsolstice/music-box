
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config/config')
const packageConfig = require('../package.json')
const isDev = process.env.NODE_ENV === 'development'
exports.resolveBasePath = _path => {
  return path.join(__dirname, '..', _path)
}
exports.assetsPath = _path => {
  const assetsSubDir = process.env.NODE_ENV === 'development'
    ? config.dev.assetsSubDir
    : config.prod.assetsSubDir
  return path.posix.join(assetsSubDir, _path)
}
exports.styleLoader = () => {
  const rules = []
  const rule = {
    test: /\.styl(us)?$/,
    use: []
  }
  const stylusLoader = {
    loader: 'stylus-loader',
    options: {
      sourceMap: isDev
        ? config.dev.devtool
        : config.prod.devtool
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }
  if (isDev) {
    rule.use.push(
      'vue-style-loader',
      cssLoader,
      postcssLoader,
      stylusLoader
    )
    rules.push(rule)
    return rules
  } else {
    rule.use.push(
      MiniCssExtractPlugin.loader,
      cssLoader,
      postcssLoader,
      stylusLoader
    )
    rules.push(rule)
    return rules
  }
}
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    notifier.notify({
      title: packageConfig.name,
      message: `${severity} : ${error.name}`,
      subtitle: filename || ''
    })
  }
}
