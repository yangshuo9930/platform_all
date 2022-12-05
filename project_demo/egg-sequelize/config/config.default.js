/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1658754792375_7285'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  // 关闭安全插件
  config.security = {
    csrf: false,
  }

  // 将对象操作映射到数据库操作,
  config.sequelize = {
    dialect: 'mysql', // 映射MySQL操作
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'test-sequelize',
  }

  return {
    ...config,
    ...userConfig,
  }
}
