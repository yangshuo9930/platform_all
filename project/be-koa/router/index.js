// 导入 路由库
const Router = require('@koa/router')

// 导入 controller 控制器
const homeCtrl = require('../controller/home')
const atchCtrl = require('../controller/auth')
const commonCtrl = require('../controller/common')
const articleCtrl = require('../controller/article')
const userCtrl = require('../controller/userProfile')
const blogCtrl = require('../controller/blog')

// 创建 路由对象
const router = new Router()

// 测试路由
router.get('/', homeCtrl.home)
router.get('/api/test', homeCtrl.test)
router.get('/api/user/test', homeCtrl.test2) // 测试鉴权

// 登录注册部分
// 注册
router.post('/api/register', atchCtrl.register)
// 登录验证码
router.get('/api/captcha', atchCtrl.captcha)
// 登录
router.post('/api/login', atchCtrl.login)

// 通用部分
// 所有文章分类
router.get('/api/categories', commonCtrl.getCate)
// 上传图片
router.post('/api/user/upload', commonCtrl.upload)

// 文章部分
// 新增文章
router.post('/api/user/addArticles', articleCtrl.create)
// 分页查询文章
router.get('/api/user/articles', articleCtrl.article)
// 文章详情接口
router.get('/api/user/articles/:id', articleCtrl.detail) // 通过params获取
// 删除文章
router.delete('/api/user/articles/:id', articleCtrl.del) // 通过params获取
// 编辑文章
router.put('/api/user/articles/:id', articleCtrl.update)

// 个人信息部分
// 获取个人信息
router.get('/api/user/profile', userCtrl.profile)
// 修改个人信息
router.put('/api/user/updateProfile', userCtrl.updateProfile)
// 修改个人密码
router.put('/api/user/profile/password', userCtrl.password)
// 修改个人头像
router.put('/api/user/profile/avatar', userCtrl.avatar)

// 全部的文章
router.get('/api/articles', blogCtrl.articles)
// 文章的详情
router.get('/api/articles/detail/:id', blogCtrl.detail)
// 导出 路由对象
module.exports = router
