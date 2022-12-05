const {
  addArticle,
  getArticleList,
  getArticleDetail,
  remove,
  update,
  getAllArticleList
} = require('../service/article')

module.exports = {
  async create(ctx) {
    ctx.verifyParams({
      categoryId: 'string',
      title: 'string',
      content: 'string'
    })
    await addArticle(ctx, ctx.request.body)
    ctx.body = {
      code: '000000',
      msg: '新增成功',
      data: null
    }
  },

  async article(ctx) {
    const result = await getArticleList(ctx, ctx.query)
    ctx.body = {
      code: '000000',
      msg: '成功',
      data: result
    }
  },

  //
  async detail(ctx) {
    console.log(ctx.params.id)
    const result = await getArticleDetail(ctx, ctx.params.id)
    ctx.body = {
      code: '000000',
      msg: '成功',
      data: result
    }
  },

  // 删除文章
  async del(ctx) {
    await remove(ctx, ctx.params.id)
    ctx.body = {
      code: '000000',
      msg: '文章删除成功'
    }
  },

  // 编辑
  async update(ctx) {
    ctx.verifyParams({
      categoryId: 'string',
      title: 'string',
      content: 'string'
    })

    await update(ctx, ctx.params.id, ctx.request.body)
    ctx.body = {
      code: '000000',
      msg: '修改成功'
    }
  }
}
