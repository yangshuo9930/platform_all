import { Controller } from 'egg'

export default class paramsController extends Controller {
  public async query() {
    this.ctx.body = {
      data: this.ctx.query,
    }
  }
  public async params() {
    this.ctx.body = {
      params: this.ctx.params,
    }
  }
  public async body() {
    console.log(this.ctx.request.body)

    this.ctx.response.body = {
      body: this.ctx.request.body,
    }
  }
}
