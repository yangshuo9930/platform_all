import { Module } from '@nestjs/common'
import { DemoService } from './demo.service'
import { DemoController } from './demo.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { DemoSchema } from '../db/demo.schema'

@Module({
  imports: [
    //这里添加配置。对应引入模块（注意里面的括号结构别给坑了。这里我卡了半天）
    MongooseModule.forFeature([{ name: 'appLayout', schema: DemoSchema }])
  ],
  controllers: [DemoController],
  providers: [DemoService]
})
export class DemoModule {}
