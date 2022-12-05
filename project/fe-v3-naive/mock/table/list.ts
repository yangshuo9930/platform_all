import { Random } from 'mockjs'
import { resultSuccess, doCustomTimes } from '../_util'

const tableList = (pageSize) => {
  const data: any[] = []
  doCustomTimes(pageSize, () => {
    data.push({
      id: '@integer(10,999999)',
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      name: '@cname()',
      // avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
      'status|1': [true, false]
    })
  })
  return data
}

export default [
  //表格数据列表
  {
    url: '/mock/table/list',
    timeout: 500,
    method: 'get',
    response: (req) => {
      const { page = 1, pageSize = 10 } = req.query
      const list = tableList(Number(pageSize))
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list
      })
    }
  }
]
