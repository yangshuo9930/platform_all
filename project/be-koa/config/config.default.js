// 数据库相关配置, token认证相关配置, 其他配置
module.exports = {
  // MongoDB 数据库配置
  mongodb: {
    url: 'mongodb://root:123456@localhost:27017/blog', // 指定了blog数据库
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    }
  },

  // JWT token相关配置
  jwt: {
    // token加密密钥 => 用于生成 token
    secret: 'blog'
  }
}
