const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge') //  类似Object.assign
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base')
const config = require('../config/config')
const utils = require('./utils')
const env = require('../config/dev.env')

module.exports = webpackMerge(webpackConfigBase, {
  mode: 'development', //  webpack进行相应优化
  entry: {
    app: path.join(__dirname, '../src/entry-client.js') //  键名app对应output中filename的name
  },
  devtool: config.dev.devtool,
  module: {
    rules: utils.styleLoader()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      'process.env.VUE_ENV': '"client"' //  配置vue的环境变量
    }),
    new FriendlyErrorsPlugin({
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    }),
    //  以下三个插件为webpack-hot-middleware所必需
    new webpack.optimize.OccurrenceOrderPlugin(),
    //  按出现的顺序排列模块和块，根据模块调用的次数给模块分配ids，
    //  常被调用的ids将被分配更短的id，使ids可预测，降低文件的大小
    new webpack.HotModuleReplacementPlugin(), //  热重载
    new webpack.NoEmitOnErrorsPlugin() //  确保输出无错
  ]
})
