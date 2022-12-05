import { httpMock } from '@monorepo/http'

//获取table
export function getTableList(params) {
  return httpMock.request({
    url: '/table/list',
    method: 'get',
    params
  })
}
