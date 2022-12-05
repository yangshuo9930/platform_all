const { sm2Encrypted, sm2Decrypted } = require('../utils/crypto-gm')
const svgCaptcha = require('svg-captcha')
const { Base64 } = require('js-base64')
const { ObjectId } = require('mongodb')
const JWT = require('jsonwebtoken')
const config = require('../config/config.default')

/**
 * 处理用户注册
 * @param {*} ctx
 * @param {{ username:'string',nickname:'string',password:'string' }} userInfo
 */
const handleRegester = async (ctx, userInfo) => {
  const { username, nickname, password } = userInfo

  // 往数据库中新增一条用户信息
  // 用户名/密码/昵称是否符合规范 ? 用户是否已存在 ?
  const isExist = await checkUsernameExist(ctx, username)
  if (isExist) {
    return ctx.throw({ code: '999991', msg: '该用户已存在!' })
  }
  // 解密密码 => 加密密码
  const pwd = sm2Encrypted(password)
  console.log('加密===>', pwd)
  const originPwd = sm2Decrypted(pwd)
  console.log('解密===>', originPwd)

  // 往数据库中插入一条数据
  const userColl = ctx.dbClient.db().collection('users')

  const result = await userColl.insertOne({
    username,
    password: originPwd,
    nickname,
    avatar: '',
    createAt: new Date(),
    updateAt: new Date()
  })

  return !!result.insertedId
}

/** 生成验证码 */
const generateCaptcha = async (ctx) => {
  const captchaInfo = svgCaptcha.create() // url => {text:图片的文本数据,存放在数据库中,,data:SVG数据}
  const captchaColl = ctx.dbClient.db('blog').collection('captcha')
  // 插入验证码文字
  const result = await captchaColl.insertOne({
    text: captchaInfo.text,
    createAt: new Date() // 必要的, 方便过期处理
  })

  if (result.insertedId) {
    return {
      key: result.insertedId,
      text: captchaInfo.text, // 方便前端测试 ==> 实际不发送此字段
      svg: `data:image/svg+xml;base64,${Base64.encode(captchaInfo.data)}` // 也可以直接将svg给前端展示,
    }
  }
}

/** 处理登录 */
const handleLogin = async (ctx, info) => {
  const { username, password, captchaKey, captchaCode } = info

  const coll = ctx.dbClient.db().collection('captcha')
  const result = await coll.findOne({ _id: ObjectId(captchaKey) })
  // 1. 查询数据库, 看是否有该Key(没有 => 提示过期/错误)
  if (!result) {
    return ctx.throw({ code: '999101', msg: '验证码过期' })
  }
  // 2. 有验证key, 对比验证Code是否正确(需要忽略大小写)
  if (result.text.toUpperCase() !== captchaCode.toUpperCase()) {
    return ctx.throw({ code: '999102', msg: '验证码错误' })
  }
  // 3. 根据用户账号密码查询数据库
  const userColl = ctx.dbClient.db().collection('users')
  const user = await userColl.findOne({ username })
  if (!user) {
    // 用户名不存在
    return ctx.throw({ code: '999103', msg: '用户名不存在' })
  }
  if (user.password !== password) {
    // 密码输入错误
    return ctx.throw({ code: '999104', msg: '密码错误' })
  }
  // 4. 登录成功 => 生成用户token, 验证用户信息
  const token = JWT.sign(
    {
      sub: user._id.toString(),
      username
    },
    config.jwt.secret, // 密钥加密配置
    {
      // token的过期时间
      expiresIn: 360000
    }
  )

  return token
}

module.exports = {
  handleRegester,
  generateCaptcha,
  handleLogin
}

/** 检查是否已经存在 */
async function checkUsernameExist(ctx, username) {
  const userCollections = ctx.dbClient.db().collection('users') // users为用户表
  const user = await userCollections.findOne({ username })
  return !!user
}
