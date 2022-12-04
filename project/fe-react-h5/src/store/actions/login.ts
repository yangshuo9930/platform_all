import request from '@utils/request'

export function login(values: LoginForm): RootThunkAction {
  return async (dispatch) => {
    const res = await request.post<ApiResponse<Token>>('authorizations', values)
    dispatch({
      type: 'LOGIN',
      payload: res.data.data
    })
  }
}

/** 获取验证码 */
export function getCode(mobile: string) {
  return async () => {
    await request.get(`/sms/codes/${mobile}`)
  }
}

/** 退出登陆 */
export const logout = (): LoginAction => {
  return {
    type: 'login/logout'
  }
}

export const changeToken = (token: Token): LoginAction => {
  return {
    type: 'LOGIN',
    payload: token
  }
}
