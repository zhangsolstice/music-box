const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfigBase = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config/config')
const utils = require('./utils')
const env = require('../config/prod.env')

module.exports = webpackMerge(webpackConfigBase, {
  mode: 'production',
  entry: path.join(__dirname, '../src/entry-client.js'),
  devtool: config.prod.devtool,
  module: {
    rules: utils.styleLoader()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      'process.env.VUE_ENV': '"client"'
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
})
