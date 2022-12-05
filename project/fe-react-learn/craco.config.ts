import path from 'path'
const CracoLessPlugin = require('craco-less')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径, 编译或者打包,地址锁定
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    // open: true,
    host: 'localhost', //监听地址
    port: 3002, // 端口
    https: false, // 是否有必须通过https的服务
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080', // ch
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'lightgreen' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
