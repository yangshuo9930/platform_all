import { Controller } from 'egg'

export default class UserController extends Controller {
  public async createUser() {
    const { ctx } = this

    const result = await ctx.service.user.createUser(ctx.request.body)

    ctx.body = {
      code: result ? 0 : 1,
      message: result ? '用户创建成功' : 'error',
    }
  }

  public async deleteUser() {
    const { ctx } = this

    const result = await ctx.service.user.deleteUser(ctx.params.id)
    ctx.body = {
      code: 0,
      message: '删除成功',
      data: result,
    }
  }

  async getUser() {
    const { ctx } = this
    const result = await ctx.service.user.getUser(ctx.params.id)
    ctx.body = {
      code: 0,
      message: '',
      data: result,
    }
  }

  async getUsers() {
    const { ctx } = this
    const result = await ctx.service.user.getUsers(ctx.query.title)
    ctx.body = {
      code: 0,
      message: '',
      data: result,
    }
  }

  async updateUser() {
    const { ctx } = this
    const result = await ctx.service.user.update(ctx.request.body)
    ctx.body = {
      code: result ? 0 : 1,
      message: result ? '成功' : '失败',
    }
  }
}
