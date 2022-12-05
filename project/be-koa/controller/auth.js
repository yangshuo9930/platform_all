const { handleRegester, generateCaptcha, handleLogin } = require('../service/auth')

module.exports = {
  async register(ctx) {
    // 校验必填参数
    ctx.verifyParams({
      username: 'string',
      nickname: 'string',
      password: 'string'
    })

    // controller是控制器, 为方便管理, 在service中统一处理逻辑
    await handleRegester(ctx, ctx.request.body)
    ctx.body = {
      code: '000000',
      msg: '注册成功!',
      data: null
    }
  },
  /** 生成验证码 */
  async captcha(ctx) {
    const result = await generateCaptcha(ctx)

    ctx.set('cache-control', 'max-age=10') // 测试强缓存
    ctx.body = {
      code: '000000',
      msg: '成功',
      data: result
    }
  },

  /** 登录 */
  async login(ctx) {
    ctx.verifyParams({
      username: 'string',
      password: 'string',
      captchaKey: 'string',
      captchaCode: 'string'
    })

    // 处理登录逻辑
    const token = await handleLogin(ctx, ctx.request.body)

    ctx.body = {
      code: '000000',
      msg: '登录成功',
      data: token
    }
  }
}
