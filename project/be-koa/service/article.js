const { ObjectId } = require('mongodb')

/** 新增文章 */
const addArticle = async (ctx, body) => {
  const ownerId = ObjectId(ctx.state.user.sub)
  const categoryId = ObjectId(body.categoryId)
  const { title, summary, content } = body

  // 文章封面 从content中获取
  const thumbnail = content.match(/<img\s(.*?)\s?src="(.*?)"/)?.[2]

  const articleColl = ctx.dbClient.db().collection('article')
  const data = {
    ownerId,
    categoryId,
    title,
    summary,
    content,
    thumbnail,
    createAt: new Date(),
    updateAt: new Date()
  }
  const result = await articleColl.insertOne(data)

  if (!result.insertedId) {
    return ctx.throw({ code: '999201', msg: '插入数据库失败' })
  }
}

/** 获取文章列表 */
const getArticleList = async (ctx, query) => {
  // 一个必须的过滤参数
  const currentUserId = ObjectId(ctx.state.user.sub)
  // 四个可选参数
  const pageNo = parseInt(query.pageNo) || 1
  const pageSize = parseInt(query.pageSize) || 5
  const { categoryId, keyword } = query
  // 过滤条件
  const filter = {
    ownerId: {
      $eq: currentUserId // ownerId必须和当前登录者一样
    }
  }
  // 1. 如果传入 keyword , 则对文章标题进行模糊查询
  if (keyword) {
    filter.title = {
      $regex: new RegExp(keyword, 'ig')
    }
  }
  // 2. 如果传入 categoryId, 过滤
  if (categoryId) {
    filter.categoryId = {
      $eq: ObjectId(categoryId)
    }
  }

  // 先不管其他, 先演示联合查询
  const articleColl = ctx.dbClient.db('blog').collection('article')
  // 1. 查询符合所有的记录总数
  const total = await articleColl.countDocuments(filter)
  // 2. 使用联合查询语法
  const items = await articleColl
    .aggregate([
      // 过滤条件
      { $match: filter },
      // 按更新日期排序, 倒序
      { $sort: { createAt: -1 } }, // -1倒序 1升序?
      // 分页
      // 1. 跳过数据的条数(分页计算)
      { $skip: (pageNo - 1) * pageSize },
      // 2. 限制分页的条数
      { $limit: pageSize },
      // 根据文章分类id, 进行联表查询
      {
        $lookup: {
          from: 'categories', // 关联categories表
          localField: 'categoryId', // 将categoryId关联foreignField的_id
          foreignField: '_id',
          as: 'category' // 这里查询到是数组对象格式
        }
      },
      // 处理上面的数组对象格式, 平铺一下
      {
        $unwind: '$category'
      },
      // 删除一些不需要的字段
      {
        $project: {
          content: 0,
          ownerId: 0,
          summary: 0
        }
      }
    ])
    .toArray()
  return {
    total,
    list: items
  }
}

/** 查看文章详情 */
const getArticleDetail = async (ctx, id) => {
  const articleColl = ctx.dbClient.db().collection('article')

  const result = await articleColl.findOne({ _id: ObjectId(id) })

  return result
}

/** 删除 */
const remove = async (ctx, id) => {
  const articleColl = ctx.dbClient.db().collection('article')
  const userId = ObjectId(ctx.state.user.sub)
  const result = await articleColl.deleteOne({
    _id: ObjectId(id),
    ownerId: userId
  })

  console.log(result)
  if (!result.deleteCount) ctx.throw({ code: '999301', msg: '暂无此文章, 或者你无权限删除' })
}

/** 编辑文章  => 编辑自己的文章*/
const update = async (ctx, id, body) => {
  const userId = ctx.state.user.sub

  const articleColl = ctx.dbClient.db().collection('article')

  const { title, categoryId, summary, content } = body
  // 文章封面 从content中获取
  const thumbnail = content.match(/<img\s(.*?)\s?src="(.*?)"/)?.[2]

  // 要修改的数据
  const data = {
    title,
    thumbnail,
    categoryId: ObjectId(categoryId),
    summary,
    content,
    updateAt: new Date()
  }
  // 修改数据库的逻辑
  articleColl.updateOne(
    { _id: ObjectId(id), ownerId: ObjectId(userId) },
    {
      $set: {
        ...data
      }
    }
  )
}

/** 获取所有的文章列表 */
const getAllArticleList = async (ctx, params) => {
  const { categoryId, keyword } = params
  // 四个可选参数
  const pageNo = parseInt(params.pageNo) || 1
  const pageSize = parseInt(params.pageSize) || 5
  // 过滤条件
  let filter = {}
  // 1. 如果传入 keyword , 则对文章标题进行模糊查询
  if (keyword) {
    filter.title = {
      $regex: new RegExp(keyword, 'ig')
    }
  }
  // 2. 如果传入 categoryId, 过滤
  if (categoryId) {
    filter.categoryId = {
      $eq: ObjectId(categoryId)
    }
  }

  // 先不管其他, 先演示联合查询
  const articleColl = ctx.dbClient.db('blog').collection('article')
  // 1. 查询符合所有的记录总数
  const total = await articleColl.countDocuments(filter)
  // 2. 使用联合查询语法
  const items = await articleColl
    .aggregate([
      // 过滤条件
      { $match: filter },
      // 按更新日期排序, 倒序
      { $sort: { createAt: -1 } }, // -1倒序 1升序?
      // 分页
      // 1. 跳过数据的条数(分页计算)
      { $skip: (pageNo - 1) * pageSize },
      // 2. 限制分页的条数
      { $limit: pageSize },
      // 根据ownerId联表查询用户信息
      {
        $lookup: {
          from: 'users', // 关联的表
          localField: 'ownerId', // 用本地owner字段关联
          foreignField: '_id', // 关联的对应表的对应字段
          as: 'owner' // 新字段命名
        }
      },
      // 上面联表查询出来的owner字段是一个数组, 做一下扁平化处理
      {
        $unwind: '$owner'
      },
      // 根据文章分类id, 进行联表查询
      {
        $lookup: {
          from: 'categories', // 关联categories表
          localField: 'categoryId', // 将categoryId关联foreignField的_id
          foreignField: '_id',
          as: 'category' // 这里查询到是数组对象格式
        }
      },
      // 处理上面的数组对象格式, 平铺一下
      {
        $unwind: '$category'
      },
      // 删除一些不需要的字段
      {
        $project: {
          ownerId: 0,
          content: 0,
          categoryId: 0,
          owner: {
            password: 0
          }
        }
      }
    ])
    .toArray()

  return {
    total,
    items
  }
}

const getUserArticleDetail = async (ctx, id) => {
  const articleColl = ctx.dbClient.db('blog').collection('article')
  const items = await articleColl
    .aggregate([
      {
        $match: { _id: ObjectId(id) }
      },
      // 根据ownerId联表查询用户信息
      {
        $lookup: {
          from: 'users', // 关联的表
          localField: 'ownerId', // 用本地owner字段关联
          foreignField: '_id', // 关联的对应表的对应字段
          as: 'owner' // 新字段命名
        }
      },
      // 上面联表查询出来的owner字段是一个数组, 做一下扁平化处理
      {
        $unwind: '$owner'
      },
      // 根据文章分类id, 进行联表查询
      {
        $lookup: {
          from: 'categories', // 关联categories表
          localField: 'categoryId', // 将categoryId关联foreignField的_id
          foreignField: '_id',
          as: 'category' // 这里查询到是数组对象格式
        }
      },
      // 处理上面的数组对象格式, 平铺一下
      {
        $unwind: '$category'
      },
      // 删除一些不需要的字段
      {
        $project: {
          ownerId: 0,
          content: 0,
          categoryId: 0,
          owner: {
            password: 0
          }
        }
      }
    ])
    .toArray()

  return items[0]
}
module.exports = {
  addArticle,
  getArticleList,
  getArticleDetail,
  remove,
  update,
  getAllArticleList,
  getUserArticleDetail
}
