import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1657595727690_4639'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  // 关闭安全插件
  config.security = {
    csrf: false,
  }

  // 限制大小
  config.bodyParams = {
    jsonLimit: '1mb', // 对请求体中传递的 JSON 数据限制大小为 1mb
    formLimit: '1mb', // 对请求体中传递的表单数据 限制大小
  }

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'test', // 数据库名称
    },
    // 是否添加到 app 或者 agent上
    app: true, // 默认开启
    agent: false, // 默认关闭
  }
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
