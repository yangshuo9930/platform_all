/**
 * 系统应用
 *
 * @author liuhuatao
 * @date 2020/5/26 19:06
 */
import { httpAuth } from '@/utils/http/axios'

/** 登出 */
export function logout() {
  return httpAuth.request({
    url: '/logout',
    method: 'get'
  })
}

/** 获取登录用户信息 */
export function getLoginUser(parameter = '') {
  return httpAuth.request({
    url: '/getLoginUser',
    method: 'get',
    params: parameter
  })
}

/** 获取所有字典，启动时加入缓存使用 */
export function sysDictTypeTree(parameter) {
  return httpAuth.request({
    url: '/sysDictType/tree',
    method: 'get',
    params: parameter
  })
}

/** 根据系统切换菜单 */
export function sysMenuChange(parameter) {
  return httpAuth.request({
    url: '/sysMenu/change',
    method: 'post',
    data: parameter
  })
}
