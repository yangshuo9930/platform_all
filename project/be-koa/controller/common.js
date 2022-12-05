const path = require('path')
module.exports = {
  async getCate(ctx) {
    const cateColl = ctx.dbClient.db().collection('categories')
    const list = await cateColl.find().toArray()
    ctx.body = {
      code: '000000',
      msg: '成功',
      data: list
    }
  },
  upload(ctx) {
    // ctx.request.files 获取上传的文件信息
    ctx.body = {
      code: '000000',
      msg: '上传成功',
      data: {
        path: `${path.join('uploads', ctx.request.files.images.newFilename)}`
      }
    }
  }
}
