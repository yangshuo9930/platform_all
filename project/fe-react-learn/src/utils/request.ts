import axios, { AxiosError, AxiosResponse } from 'axios'
import { message } from 'antd'
import { getLocalItem } from './tools'

const baseURL = '/api'
const request = axios.create({
  baseURL,
  timeout: 3000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = getLocalItem('token')
    if (token) config.headers!.Authorization = 'Bearer ' + token
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response: AxiosResponse<ApiResponse>) {
    return response
  },
  async function (error: AxiosError<ApiResponse>) {
    if (error.response?.data.code && error.response?.data.code !== '000000') {
      message.error(error.response?.data.msg)
    }

    return Promise.reject(error)
  },
)

export default request
