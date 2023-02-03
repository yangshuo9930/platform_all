import axios from 'axios'

// 方法装饰器
const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    const fnc = descriptor.value
    axios
      .get(url)
      .then((res) => {
        fnc(res, {
          status: 200
        })
      })
      .catch((e) => {
        fnc(e, {
          status: 500
        })
      })
  }
}

//定义控制器
class Controller {
  constructor() {}
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(res: any, status: any) {
    console.log(res.data.result.list, status)
  }
}

console.log('装饰器实现get请求', new Controller())
