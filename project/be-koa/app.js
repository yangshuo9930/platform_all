const koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const views = require('koa-views')
const koaCors = require('@koa/cors')
const koaError = require('koa-json-error')
const koaParameter = require('koa-parameter')
const router = require('./router/')
const middlewareMongoDB = require('./middleware/mongodb')
const koaJwt = require('koa-jwt')
const config = require('./config/config.default')
// 1. 创建一个koa实例
const app = new koa()

// 中间件: 校验参数
koaParameter(app) // ctx多出一个方法: ctx.verfiyParams()

// 中间件: 处理静态资源
app.use(koaStatic('./static'))
// 中间件: 处理html模板, 可配合ejs做渲染
app.use(views(__dirname + '/static/html'))
// 中间件: 处理post请求和文件上传
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      keepExtensions: true, // 保留文件后缀
      uploadDir: './static/uploads' // 设置上传文件目录
    }
  })
)

// 中间件: 统一处理错误和错误的输出
app.use(
  koaError({
    // 定义接口出错时的返回格式
    format(err, obj) {
      if (obj.code === 'INVALID_PARAM') {
        // 这里可以明确是哪个字段出错, 但是在企业级开发中, 为了安全, 建议不明确指定
        return {
          code: '000001',
          msg: '不合法参数'
        }
      }
      if (obj.message === 'Authentication Error') {
        return {
          code: '900003',
          msg: '登录信息失效, 请重新登录'
        }
      }
      return {
        code: obj.code || '999999',
        msg: obj.msg || err.message
      }
    }
  })
)

// 中间件: 解决跨域问题
app.use(koaCors())

// 自定义中间件: 操作数据库(将mongodb连接对象挂载到ctx上)
app.use(middlewareMongoDB())

// 中间件: 接口鉴权
app.use(
  koaJwt({
    secret: config.jwt.secret
  }).unless({
    // 排除的不需要鉴权的接口 => 约定 所有以/api/user开头的接口都需要鉴权
    path: [/^\//, /^\/api\/(?!user)/] // 正则表达 ?! 零宽度负预测先行断言  不是/api/user开头的
  })
)

// 中间件: 处理路由
app.use(router.routes())
app.use(router.allowedMethods()) // 请求错误,友好提示

// 4. 启动应用
app.listen(3000, () => {
  console.log('服务器启动成功, 地址为 http://localhost:3080')
})
