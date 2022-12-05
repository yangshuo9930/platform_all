import { Service } from 'egg'

/**
 * User Service
 */
export default class User extends Service {
  /** 创建用户 */
  public async createUser(params: UserInfo) {
    const { username, title = '', password } = params
    const result = await this.app.mysql.insert('user', {
      username,
      password,
      title: title || null,
      createAt: new Date(),
    })
    return (result as any).affectedRows === 1
  }

  async deleteUser(id: string) {
    const result = await this.app.mysql.delete('user', { id })

    return result.affectedRows === 1
  }

  // 读取
  async getUser(id) {
    console.log(id)

    const result = await this.app.mysql.get('user')
    return result
  }

  async getUsers(title: string) {
    // 可以直接使用 get 方法或 select 方法获取一条或多条记录。select 方法支持条件查询与结果的定制。
    // 读取一条数据 const post = await this.app.mysql.get('user', { id: 1 });
    // 查询全表
    const results = await this.app.mysql.select('user', {
      where: { title }, // 查询条件
      columns: ['Id', 'username', 'title', 'createAt'], // 返回的字段
      orders: [['id', 'desc']],
      limit: 5,
      offset: 0,
    })

    return results
  }

  async update(params) {
    // 自动更新id相关数据
    const result = await this.ctx.app.mysql.update('user', params, {
      where: {
        username: params.username,
      },
      columns: ['title'], // 配置第三个参数, 只能修改where查询到的数据(多个), 并且,只能修改 columns中确定的字段
    })

    console.log(result)

    return result.affectedRows
  }
}
