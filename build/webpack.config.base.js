const path = require('path')
const utils = require('./utils')
const config = require('../config/config')
const { VueLoaderPlugin } = require('vue-loader')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  entry: path.join(__dirname, '../src/entry-client.js'),
  output: {
    path: config.prod.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash:7].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash:7].js'),
    publicPath: isDev
      ? config.dev.assetsPubPath
      : config.prod.assetsPubPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      '@': utils.resolveBasePath('./src'),
      'views': utils.resolveBasePath('./src/views'),
      'components': utils.resolveBasePath('./src/components'),
      'images': utils.resolveBasePath('./src/assets/images'),
      'fonts': utils.resolveBasePath('./src/assets/fonts'),
      'styles': utils.resolveBasePath('./src/assets/styles'),
      'store': utils.resolveBasePath('./src/store'),
      'router': utils.resolveBasePath('./src/router'),
      'api': utils.resolveBasePath('./src/api'),
      'lib': utils.resolveBasePath('./src/lib'),
      'views': utils.resolveBasePath('./src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-formatter-friendly')
        }
      },
      {
        test: /\.(jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          },
          hotReload: !!isDev
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(png|svg|gif|bmp|webp|ico|jpe?g)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('static', 'images', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp3|wav|wma|flac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/medias/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueSSRClientPlugin()
  ],
  performance: {
    maxEntrypointSize: 10485760,
    maxAssetSize: 10485760
  }
}
