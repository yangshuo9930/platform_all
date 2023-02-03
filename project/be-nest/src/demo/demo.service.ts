import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateDemoDto } from './dto/create-demo.dto'
import { UpdateDemoDto } from './dto/update-demo.dto'
import { Demo, DemoDocument } from '../db/demo.schema'
import { Model } from 'mongoose'

@Injectable()
export class DemoService {
  // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
  // appLayout 为表名, 需要和 module中name表名一致
  constructor(@InjectModel('appLayout') private demodb: Model<DemoDocument>) {}

  async create(createDemoDto: CreateDemoDto) {
    console.log('body', createDemoDto)
    const res = await this.demodb.create(createDemoDto)
    console.log('res', res)
    return {
      code: 0
    }
  }

  findAll() {
    return `This action returns all demo`
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`
  }

  remove(id: number) {
    return `This action removes a #${id} demo`
  }
}
