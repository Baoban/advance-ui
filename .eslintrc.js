module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  env: {
    'browser': true,
  },
  plugins: [
    'html'
  ],
  globals: {
    '$router': true,
    '$': true,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  rules: {
    // js 和 vue 不需要检查 import 的文件后缀
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // 可以 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 不要分号
    'semi': [2, 'never'],
    // 全部单引号
    'quotes': [2, 'single'],
    // 对象缩写
    'object-shorthand': 0,
    // 可以使用 console
    'no-console': 0,
    // 允许使用匿名函数
    'func-names': 0,
    // 允许属性的 key 值加引号
    'quote-props': 0,
    // 允许对函数的参数赋值
    'no-param-reassign': 0,
    // 函数的参数可以不使用
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }],
    // 不用强制 export default
    'import/prefer-default-export': 0,
    // 不禁止箭头函数直接return对象
    'arrow-body-style': 0,
  }
}
