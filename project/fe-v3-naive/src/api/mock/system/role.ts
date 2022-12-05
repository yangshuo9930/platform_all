import { httpMock } from '@monorepo/http'

/**
 * @description: 角色列表
 */
export function getRoleList() {
  return httpMock.request({
    url: '/role/list',
    method: 'GET'
  })
}
