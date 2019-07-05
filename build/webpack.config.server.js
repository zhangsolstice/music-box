const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const utils = require('../build/utils')
const webpackConfigBase = require('./webpack.config.base')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = webpackMerge(webpackConfigBase, {
  mode: 'production',
  target: 'node', //  部署目标
  devtool: 'source-map',
  entry: path.join(__dirname, '../src/entry-server.js'),
  output: {
    libraryTarget: 'commonjs2', //  模块用于commonjs环境
    filename: 'server-bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  externals: Object.keys(require('../package.json').dependencies), //  防止将生产模式下的依赖包打包到bundle中，在运行时从外部获取
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
