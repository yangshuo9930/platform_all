'use strict'

module.exports = (app) => {
  const { STRING, INTEGER, DATE, DOUBLE } = app.Sequelize

  // 定义一个名为 product的 Model
  return app.model.define('Product', {
    // 字段
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    price: DOUBLE,
    created_at: DATE,
    updated_at: DATE,
  })
}
