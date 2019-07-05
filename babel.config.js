module.exports = {
  'presets': [
    [
      '@babel/preset-env', //  允许使用最新js
      {
        'targets': { //  描述为项目支持或定位的环境
          'browsers': [
            '> 1%', //  市场份额大于1%
            'last 2 versions',
            'not ie <=11'
          ],
          'node': 'current'
        }
      }
    ]
  ],
  'plugins': [
    require('@vue/babel-plugin-transform-vue-jsx'),
    require('@babel/plugin-syntax-dynamic-import'), //  动态引用，import()
    require('@babel/plugin-transform-runtime')
  ]
}
