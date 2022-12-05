const { ObjectId } = require('mongodb')
module.exports = {
  /** 获取个人信息 */
  async getProfile(ctx) {
    const currentUserId = ctx.state.user.sub
    const userColl = ctx.dbClient.db().collection('users')

    const result = await userColl.findOne({ _id: ObjectId(currentUserId) })
    return result
  },

  async toUpdateProfile(ctx, body) {
    console.log(body)
    const { nickname } = body
    const cuurentUserId = ObjectId(ctx.state.user.sub)
    const userColl = ctx.dbClient.db().collection('users')

    const result = await userColl.updateOne({ _id: cuurentUserId }, { $set: { nickname } })
    console.log(result)
  },

  async updatePassword(ctx, body) {
    const { password, newPassword } = body
    const userId = ObjectId(ctx.state.user.sub)
    const userColl = ctx.dbClient.db().collection('users')

    const userInfo = await userColl.findOne({ _id: userId })

    if (userInfo.password === password) {
      // 修改密码 ==> 加密新密码后在替换
      if (userInfo.password === newPassword)
        return ctx.throw({ code: '000012', msg: '新旧密码不可重复' })
      await userColl.updateOne({ _id: userId }, { $set: { password: newPassword } })
    } else {
      ctx.throw({ code: '000111', msg: '密码或者用户名错误' })
    }
  },

  async updateAvatar(ctx, params) {
    const { avatar } = params
    const userId = ObjectId(ctx.state.user.sub)
    const userColl = ctx.dbClient.db().collection('users')
    userColl.updateOne({ _id: userId }, { $set: { avatar } })
  }
}
