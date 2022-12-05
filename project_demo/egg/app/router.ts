import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.get('/news', controller.news.list)

  // 获取参数-------------------------------------
  router.get('/query', controller.params.query)
  router.get('/params/:id', controller.params.params)
  router.post('/body', controller.params.body)

  // MySQL数据库-------------------------------------
  router.post('/db/user/create', controller.user.createUser) // 新增
  router.delete('/db/user/delete/:id', controller.user.deleteUser) // 删除
  router.get('/db/user/get/:id', controller.user.getUser) // 搜索一条
  router.get('/db/user/select', controller.user.getUsers) // 全量搜索
  router.put('/db/user/update', controller.user.updateUser)
}
