import { httpMock } from '@monorepo/http'

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return httpMock.request({
    url: '/menus',
    method: 'GET'
  })
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return httpMock.request({
    url: '/menu/list',
    method: 'GET',
    params
  })
}
