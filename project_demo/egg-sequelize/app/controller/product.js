'use strict'

const Controller = require('egg').Controller

class ProductController extends Controller {
  async create() {
    const { ctx } = this
    const result = await ctx.model.Product.create(ctx.query) // {name: ,price:}
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
        code: -1,
        message: 'error',
      })
    }
    // 如果有更新
    await product.update({ ...ctx.request.body })
    ctx.body = product
  }

  async delete() {
    const { ctx } = this
    // 1. 根据主键查找要删除的项
    const product = await ctx.model.Product.findByPk(ctx.params.id)

    // 2. 找不到返回404
    if (!product) {
      ctx.status = 404
      return
    }

    // 3. 找到了, 调用destroy进行删除
    await product.destroy()

    // 4. 成功信息
    ctx.body = {
      code: 200,
      message: '成功',
      success: true,
    }
  }

  async findList() {
    const { ctx } = this
    const { Product } = ctx.model

    const products = await Product.findAll({
      // where: {} // 查询条件
      // limit: {} // 分页
    })

    ctx.body = products
  }
}

module.exports = ProductController
