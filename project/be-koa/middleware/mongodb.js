// 自定义中间件, 方便调用

// 将 mongodb 客户端实例对象挂载到 ctx 上
const client = require('../database/mongodb')

/** 中间件工厂函数
 *  调用工厂函数 => 得到中间件, 方便ctx操作MongoDB数据库 */
module.exports = () => {
  return async (ctx, next) => {
    // 挂载到 ctx 上
    ctx.dbClient = client
    // 调用下一个中间件
    await next()
  }
}
