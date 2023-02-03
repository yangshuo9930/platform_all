import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Req,
  All,
  Body,
  Res,
  HttpCode,
  Header,
  Redirect,
  Query
} from '@nestjs/common'
import { AppService } from './app.service'
import { Request, Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req)

    return this.appService.getHello()
  }
  // 可以在处理函数的签名中使用 @Req() 装饰器，指示 Nest 将请求对象注入处理程序。
  @Get('user')
  // 设置请求头
  @Header('Cache-Control', 'no-store') // 不缓存这个接口的数据
  getUser(@Req() request: Request) {
    return request.body
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} user`
  }

  @Post()
  create(): string {
    return 'This action addsa new user'
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates a #${id} user`
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} user`
  }

  // @All 处理所有 HTTP 请求方法
  @All('test')
  getAll() {
    return 'test'
  }

  // 路由通配符
  @Post('user**')
  // HttpCode 修改状态码, nest的Post 默认201
  // @HttpCode(200)
  createUser(@Body() body: object, @Res() res: Response) {
    console.log(body)
    // 使用Nest置于该处理函数的特定于库（Library-specific mode）的模式下,并负责管理响应.这样做时,必须通过调用 response 对象
    // res.send(body)
    res.status(200).send(body)
    // 通常，状态码不是固定的，而是取决于各种因素。
    // 在这种情况下，您可以使用类库特有（library-specific）的 response （通过 @Res()注入 ）对象（或者在出现错误时，抛出异常）。

    return '成功'
  }

  // @Redirect(url,statusCode) 重定向, 静态地址
  @Get('file')
  @Redirect('https://nestjs.com', 301)
  getAAA(@Query() query: any) {
    console.log(query)
    // 返回的值将会覆盖@Redirect('https://nestjs.com',301) 中的地址和code
    if (query.version == 1) {
      return {
        url: 'http://www.baidu.com',
        statusCode: 302
      }
    }
  }
}
