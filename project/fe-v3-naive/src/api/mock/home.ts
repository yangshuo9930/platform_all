import { httpMock } from '@monorepo/http'

//获取主控台信息
export function getConsoleInfo() {
  return httpMock.request({
    url: '/dashboard/console',
    method: 'get'
  })
}
