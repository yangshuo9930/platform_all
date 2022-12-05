// 个人信息模块
const { getProfile, toUpdateProfile, updatePassword, updateAvatar } = require('../service/profile')
module.exports = {
  async profile(ctx) {
    const result = await getProfile(ctx)

    console.log('....', result)
    ctx.body = {
      code: '000000',
      data: result,
      msg: '获取个人信息成功'
    }
  },

  async updateProfile(ctx) {
    ctx.verifyParams({
      nickname: 'string'
    })
    await toUpdateProfile(ctx, ctx.request.body)
    ctx.body = {
      code: '000000',
      msg: '修改成功'
    }
  },

  async password(ctx) {
    ctx.verifyParams({
      password: 'string',
      newPassword: 'string'
    })

    await updatePassword(ctx, ctx.request.body)
    ctx.body = {
      code: '000000',
      msg: '密码修改成功'
    }
  },

  async avatar(ctx) {
    ctx.verifyParams({
      avatar: 'string'
    })

    const result = await updateAvatar(ctx, ctx.request.body)
    ctx.body = {
      code: '000000',
      msg: '成功',
      data: result
    }
  }
}
