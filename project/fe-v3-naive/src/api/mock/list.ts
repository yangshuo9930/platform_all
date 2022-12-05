import { httpMock } from '@/utils/http/axios'

//获取table
export function getTableList(params) {
  return httpMock.request({
    url: '/table/list',
    method: 'get',
    params
  })
}
