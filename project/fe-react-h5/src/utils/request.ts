import store from '@/store'
import { changeToken, logout } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import history from './history'
import { getLocalItem } from './tools'

const baseURL = 'http://geek.itheima.net/v1_0/'
const incetance = axios.create({
  baseURL,
  timeout: 3000
})

// 添加请求拦截器
incetance.interceptors.request.use(
  function (config) {
    const token = getLocalItem('token', '{}').token
    if (token) config.headers!.Authorization = 'Bearer ' + token
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
incetance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error: AxiosError<{ message: string }>) {
    // 对响应错误做点什么
    if (!error.response) {
      Toast.show({
        content: '网络错误,请检查网络'
      })
      return Promise.reject(error)
    }
    // token无感刷新
    if (error.response?.status === 401) {
      if (!getLocalItem('token', '{}').refresh_token) {
        history.replace('/login', {
          from: history.location.pathname // 回跳
        })
        Toast.show('登陆信过期,请重新登陆')
      } else {
        // 获取新token
        axios
          .request<ApiResponse<{ token: string }>>({
            url: 'authorizations',
            method: 'put',
            baseURL,
            headers: {
              Authorization: 'Bearer ' + getLocalItem('token', '{}').refresh_token
            }
          })
          .then((res) => {
            // 存token
            store.dispatch(
              changeToken({
                ...res.data.data,
                refresh_token: getLocalItem('token', '{}').refresh_token
              })
            )
            // 重发失败请求
            return incetance.request(error.config)
          })
          .catch((e) => {
            // 刷新token失效或者网络错误
            // 清理token
            store.dispatch(logout())
            // 回到首页
            history.push('/login', {
              from: history.location.pathname
            })
            //
            Toast.show('用户信息已失效')
            //
            return Promise.reject(error)
          })
      }

      return Promise.reject(error)
    }

    Toast.show(error.request.data.message)

    return Promise.reject(error)
  }
)

export default incetance
