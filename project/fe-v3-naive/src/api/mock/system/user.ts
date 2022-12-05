import { httpMock } from '@monorepo/http'

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  data: T
}

export interface BasicPageParams {
  pageNumber: number
  pageSize: number
  total: number
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return httpMock.request({
    url: '/admin_info',
    method: 'get'
  })
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return httpMock.request<BasicResponseModel>(
    {
      url: '/login',
      method: 'POST',
      params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return httpMock.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return httpMock.request({
    url: '/login/logout',
    method: 'POST',
    params
  })
}
