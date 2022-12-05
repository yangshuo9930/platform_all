import { Controller } from 'egg'

export default class NewsController extends Controller {
  public async list() {
    const { ctx } = this
    const result = await ctx.service.news.getList()
    ctx.body = result
  }
}
