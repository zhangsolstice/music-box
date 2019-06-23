
const path = require('path')
module.exports = {
  'dev': {
    assetsSubDir: 'static',
    assetsPubPath: '/',
    devtool: 'cheap-module-eval-source-map',
    notifyOnErrors: true
  },
  'prod': {
    assetsRoot: path.join(__dirname, '../dist'),
    assetsSubDir: 'static',
    assetsPubPath: '',
    devtool: 'source-map'
  }
}
