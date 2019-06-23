module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': [
            '> 1%',
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
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-transform-runtime')
  ]
}
