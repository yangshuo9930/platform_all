// 导入
const { MongoClient } = require('mongodb')

const config = require('../config/config.default')

// 创建一个客户端实例 -> 参数1:URL, 参数2:配置对象 => 从config中获取
const client = new MongoClient(config.mongodb.url, config.mongodb.options)

// 连接数据库
client.connect()

// 导出
module.exports = client
