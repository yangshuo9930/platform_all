const { defineConfig } = require('eslint-define-config') // 类型

module.exports = defineConfig({
  root: true, // 根
  env: {
    // 使用eslint的环境
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 继承  其他的配置, 可以是路径的形式或者是 下载的插件包
    'plugin:@typescript-eslint/recommended', // ts!!
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser', // ESLint 默认使用Espree作为其解析器, 但是由于我们项目是 ts 文件 使用ts解析器
    ecmaVersion: 2020, // 默认的js 的版本
    sourceType: 'module', // esm模式
    // jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true // 支持jsX
    }
  },
  plugins: [
    // "vue"
  ],
  rules: {
    // '@typescript-eslint/ban-ts-ignore': 'off', // 禁止忽略ts
    '@typescript-eslint/explicit-function-return-type': 'off', // 不必须写函数返回类型
    '@typescript-eslint/no-explicit-any': 'off', // 允许任何any
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
        // args: 'none'
      }
    ],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
        // args: 'none'
      }
    ],
    'space-before-function-paren': 'off' // 函数空格前加个括号
  },
  ignorePatterns: ['node_modules/**', 'dist/**', 'release/**', 'public/**', 'docs/**']
})
