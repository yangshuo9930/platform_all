const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 启用HMR
const webpack = require('webpack')

// const ExtractTextPlugin = require('extract-text-webpack-plugin') // webpack4之前的分离js和css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离css
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css 或者 CssMinimizerPlugin

const CompressionPlugin = require('compression-webpack-plugin') // 开启gzip

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境,
const isDev = process.env.NODE_ENV === 'development'
const NODE_ENV = process.env.NODE_ENV // 其他环境配置

const resolve = (dir) => path.join(__dirname, dir)
const paths = 'assets'

module.exports = {
  mode: isProd ? 'production' : 'development',

  // 入口文件, 支持多个 string | object | array
  entry: './src/index.tsx',

  // webpack 输出结果的相关选项. 输出文件的路径/名称等
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath: '/assets/', // 资源(assets)被引用的根路径，在生产环境下生效, 该配置会为index.html中引入的<script> <link>等标签中的资源路径添加前缀
    // publicPath: './',   // 相对于index.html获取资源, 一般为 '/' ,不用修改
    filename: `${paths}/js/[name].js`,
    chunkFilename: `${paths}/js/[name].js`
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.tsx?$/i, // function | RegExp
        use: 'ts-loader'
        // include: [resolve('src')],
      },
      {
        test: /\.(s[ac]|c)ss$/i, // scss 兼容css
        use: [
          // mini-css-extract-plugin, 生产环境启用, 单独生成css文件, 因为这样就可以和js并行下载提高页面加载效率,缺点就是会增加请求
          isProd
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // you can specify a publicPath here
                  // by default it use publicPath in webpackOptions.output
                  // publicPath: './'
                }
              }
            : 'style-loader', // style-loader 将 JS 字符串生成为 style 节点
          {
            loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
          },
          // 处理
          'postcss-loader', // 将 Sass 编译成 CSS
          {
            loader: 'sass-loader', // 需要安装 sass dart-sass/node-sass
            options: {
              modules: true, // 指定启用css modules
              localIdentName: '[name]__--[hash:4]' // 指定css的类名格式
            }
          }
          // sass-resources-loader  // 引入全局 SasS 变量的文件（对应你全局文件的路径）
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader', // 依赖到file-loader(不必配置但是要安装), 如果文件大于 limit交给, file-loader处理, 否则转换为base64
            options: {
              limit: 1024,
              name: '[name]_[hash:8].[ext]',
              outputPath: `${paths}/imgs/`
            }
          }
          // {
          //   loader: 'image-webpack-loader', // 压缩图片
          //   options: {
          //     bypassOnDebug: true,
          //   }
          // }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  // 解析模块请求的选项
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'], // 按照此顺序读取文件
    alias: {
      // 路径解析别名
      '@': resolve('src')
    }
  },

  // 排除打包 - 做CDN的时候使用
  // externals: {
  //   // key(要排除的包名), value(引入的CDN包的全局变量名)
  //   'react': 'React',
  //   "react-dom": "ReactDom",
  // },

  // 优化
  // 生产和开发环境, 源文件映射方案不同
  devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  // 插件配置
  plugins: [
    new CleanWebpackPlugin({}), // 每次打包自动清除上一次的打包文件
    new HtmlWebpackPlugin({
      // 自动引入打包后的 .js 文件, 并且使用public下index.html作为html模板
      template: './public/index.html'
    }),
    new CompressionPlugin({
      // 生产环境, 开启gzip压缩
      filename: `[path]/[name].gz[query]`,
      test: /\.js$|\.html$|\.css/,
      threshold: 10240,
      deleteOriginalAssets: false
    }),
    new BundleAnalyzerPlugin(), // 生产环境, 分析构建依赖
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // 生产环境, 分离CSS
      filename: '[name].css', //  isProd  ? 'css/[name].[hash].css' :
      chunkFilename: '[name].css' // isProd ? '[id].[hash].css' :
    })
  ],

  // 优化
  optimization: {
    // minimize: isProd, // 默认生产环境下调用optimization
    minimizer: [
      new TerserJSPlugin({}), // 默认就是terser-webpack-plugin, minimization会覆盖
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      // 分割代码
      chunks: 'all', // 不论同步异步
      minSize: 30000, // 规定被提取的模块在压缩前的大小最小值，单位为字节，默认为30000，只有超过了30000字节才会被提取。
      maxSize: 0, //把提取出来的模块打包生成的文件大小不能超过maxSize值，如果超过了，要对其进行分割并打包生成新的文件。单位为字节，默认为0，表示不限制大小。
      minChunks: 1, // 表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取
      maxAsyncRequests: 6, // 最大的按需(异步)加载次数，默认为 6
      maxInitialRequests: 4, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4。
      cacheGroups: {
        // 核心重点，配置提取模块的方案, 里面每一项代表一个提取模块的方案
        vendors: {
          name: `chunk-vendors`, // name: 打包生成js文件的名称
          test: /[\\/]node_modules[\\/]/, // test 用来匹配要提取的模块的资源路径或名称。值是正则或函数。
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true //  true 为true时，如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的js文件。
        },
        antd: {
          name: 'chunk-antd',
          priority: 20, // 比 vendors 的priority 大才行
          test: /[\\/]node_modules[\\/]_?antd(.*)/
        },
        commons: {
          name: 'chunk-commons',
          test: path.join(__dirname, 'src/components'), // can customize your rules
          minChunks: 1, //  minimum common number
          priority: 5
          // minSize: 1, // 测试
          // true 为true时，如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的js文件。
          // 这里'src/components' 下没有太多的组件, 为了测试, 设置为false, 测试效果
          // reuseExistingChunk: false
        }
      }
    }
  },

  // dev开发服务器
  devServer: {
    host: 'localhost', // 主机名
    stats: 'errors-only', // 打包日志输出输出错误信息
    port: 8098
    // publicPath: '/assets/' http://localhost:8098/assets/ 开发环境下访问
    // hot: true
    // open: true,
  }
}
