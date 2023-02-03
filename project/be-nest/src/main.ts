import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VersioningType } from '@nestjs/common'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //
  app.setGlobalPrefix('api')
  // 控制restful接口风格版本
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(
    session({
      secret: 'secret',
      rolling: true, // 每次请求时强行设置cookie, 重置过期时间
      name: 'yangshuo.sid',
      cookie: { maxAge: 99999 } // 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
    })
  )
  await app.listen(3000)
}
bootstrap()
