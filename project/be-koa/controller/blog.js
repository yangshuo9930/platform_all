const { getAllArticleList, getUserArticleDetail } = require('../service/article')

module.exports = {
  async articles(ctx) {
    const result = await getAllArticleList(ctx, ctx.query)
    ctx.body = {
      code: '000000',
      msg: '获取文章列表成功',
      data: result
    }
  },

  async detail(ctx) {
    //
    const result = await getUserArticleDetail(ctx, ctx.params.id)
    ctx.body = {
      code: '000000',
      msg: '获取文章详情成功',
      data: result
    }
  }
}
