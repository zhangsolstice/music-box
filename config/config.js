
const path = require('path')
module.exports = {
  'dev': {
    assetsSubDir: 'static', //  dev环境下的资源应该放在该目录下
    assetsPubPath: '/', //  资源公共路径
    devtool: 'cheap-module-eval-source-map', //  webpack的devtool
    notifyOnErrors: true //  提示错误
  },
  'prod': {
    assetsRoot: path.join(__dirname, '../dist'), //  生产环境下资源的根路径
    assetsSubDir: 'static', //  资源子目录
    assetsPubPath: '', //  资源公共路径
    devtool: 'source-map' //  webpack的devtool
  }
}
