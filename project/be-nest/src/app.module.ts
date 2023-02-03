import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { DemoModule } from './demo/demo.module'

// import { MongooseModule } from '@nestjs/mongoose' // mongodb 创建链接
import { NoteModule } from './note/note.module'

@Module({
  imports: [
    UserModule
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456',
    //   database: 'schema_test_db',
    //   autoLoadEntities: true, // 自动创建 entity 实体
    //   synchronize: true // 自动创建数据库表
    // }),
    // NoteModule
    // DemoModule
    //  MongooseModule.forRoot('mongodb://localhost:27017/demo')
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
