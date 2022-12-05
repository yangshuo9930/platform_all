import { getLocalItem, removeLocalItem, setLocalItem } from '@/utils/tools'

const initialState = getLocalItem('token', '{}') // token从本地获取

const login = (state = initialState, action: LoginAction) => {
  if (action.type === 'LOGIN') {
    // 保存token
    setLocalItem('token', action.payload)
    return action.payload
  }
  if (action.type === 'login/logout') {
    //
    removeLocalItem('token')
  }
  return state
}

export default login
