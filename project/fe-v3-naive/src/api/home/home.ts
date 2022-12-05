import { http } from '@/utils/http/axios'

/** 测试专家系统api */
export const searchExpertResource = (data) => {
  return http.request({
    url: `/resources/search`,
    method: 'get',
    params: data
  })
}
