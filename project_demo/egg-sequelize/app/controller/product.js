'use strict'

const Controller = require('egg').Controller

class ProductController extends Controller {
  async create() {
    const { ctx } = this
    const result = await ctx.model.Product.create({
      name: '9999',
      price: '8888',
    })
    ctx.body = result
  }
  async update() {
    const { ctx } = this
    // 根据参数id找到对应的数据
    console.log(ctx.params.id)
    const product = await ctx.model.Product.findByPk(ctx.params.id)
    // 没有找到报错
    if (!product) {
      return (ctx.body = {
        code: 1,
        message: 'error',
      })
    }
    // 如果有更新
    await product.update({ ...ctx.request.body })
    ctx.body = product
  }
}

module.exports = ProductController
