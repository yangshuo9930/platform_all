import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
// @Prop 装饰器接受一个可选的参数，通过这个，你可以指示这个属性是否是必须的，是否需要默认值，或者是标记它作为一个常量，下面是例子
// SchemaFactory 是 mongoose 内置的一个方法做用是读取模式文档 并创建 Schema 对象
import { Document } from 'mongoose'

export type DemoDocument = Demo & Document

@Schema()
export class Demo extends Document {
  @Prop({ required: true }) // name 必填值
  name: string
  @Prop({ required: true })
  type: string
  img: string
  drawer?: boolean
  notAdd?: boolean
  drawerPromotions?: boolean
  notImg?: boolean
  promotionsType?: string
  notLink?: boolean
  onlyImg?: boolean
  view?: string
  notTitle?: boolean
  close?: boolean
  options: any
  subBkColor?: string
  subName?: string
}
export const DemoSchema = SchemaFactory.createForClass(Demo)

// or
// import * as mongoose from 'mongoose'

// export const UserSchema = new mongoose.Schema(
//   {
//     id: Number,
//     name: String,
//     introduction: String,
//     headurl: String,
//     bigurl: String,
//     username: String,
//     password: String
//   },
//   { collection: 'musicers', versionKey: false }
// )
