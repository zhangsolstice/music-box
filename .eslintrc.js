module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'node': true
  },
  'extends': [
    'standard',
    'plugin:vue/recommended'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 9,
    'sourceType': 'module',
    'ecmaFeatures': {
      'impliedStrict': true,
      //'jsx': true
    }
  },
  'rules': {
    'no-var': 'error',
    'strict': 'error',
    'eol-last': 'error'
  },

}
