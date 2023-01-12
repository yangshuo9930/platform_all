'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/create', controller.product.create) // 新增
  router.put('/update/:id', controller.product.update) // 修改
  router.delete('/delete/:id', controller.product.delete)// 删除
  router.get('/find', controller.product.findList)
}
