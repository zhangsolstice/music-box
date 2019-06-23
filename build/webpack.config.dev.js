const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base')
const config = require('../config/config')
const utils = require('./utils')
const env = require('../config/dev.env')

module.exports = webpackMerge(webpackConfigBase, {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../src/entry-client.js')
  },
  devtool: config.dev.devtool,
  module: {
    rules: utils.styleLoader()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      'process.env.VUE_ENV': '"client"'
    }),
    new FriendlyErrorsPlugin({
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
