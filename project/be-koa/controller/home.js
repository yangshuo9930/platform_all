// 路由的处理函数
// const fs = require('fs')
// const path = require('path')

// const readFile = (filePath: string) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data.toString())
//       }
//     })
//   })
// }

module.exports = {
  async home(ctx) {
    await ctx.render('index.html') // koa-views
  },
  async test(ctx) {
    // 1. 原生的抛出错误
    // throw new Error('出错了') // 测试直接抛出错误
    // 2. koa封装的抛出错误
    // return ctx.throw({
    //   code: '999',
    //   msg: '出错了---',
    // }) // 测试直接返回错误

    // 测试必传参数
    ctx.verifyParams({
      name: 'string'
    })
    ctx.body = {
      code: '000000',
      msg: 'success',
      data: null
    }
  },
  /** 测试登录鉴权 */
  async test2(ctx) {
    // 鉴权中间件 => 会将解析得到token值存放到 ctx.state.user 上
    console.log(ctx.state.user) // { sub: id, username: username, iat:xxx, exp: xxx, }

    ctx.body = {
      code: '000000',
      msg: 'success',
      data: null
    }
  }
}
