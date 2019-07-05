module.exports = {
  'root': true, //  以此文件为根目录，不会再向上查找
  'env': {
    'browser': true,
    'node': true
  },
  'extends': [ //  规则
    'standard',
    'plugin:vue/recommended'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 9,
    'sourceType': 'module',
    'ecmaFeatures': {
      'impliedStrict': true, //  可以是全局严格模式
      //'jsx': true
    }
  },
  'rules': {
    'no-var': 'error', //  使用let或const取代var
    'strict': 'error', //  必需严格模式
    'eol-last': 'error' //  文件末尾必须换行
  },

}
