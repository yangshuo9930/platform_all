import store from '@/store'
import { ThunkAction } from 'redux-thunk'
declare global {
  // 存放与redux相关的类型
  // store的state类型
  type RootState = ReturnType<typeof store.getState>
  // 所有的action类型
  type RootAction = LoginAction | ProfileAction | HomeAction
  // thunkAction的类型
  type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

  // 各个模块的action类型
  type LoginAction =
    | {
        type: 'LOGIN'
        payload: Token
      }
    | {
        type: 'login/logout'
      }
}
