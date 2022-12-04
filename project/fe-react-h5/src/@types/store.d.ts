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

  type ProfileAction =
    | {
        type: 'GETUSERINFO'
        payload: User
      }
    | {
        type: '/profile/getProfile'
        payload: UserProfile
      }

  type HomeAction =
    | {
        type: 'home/channel'
        payload: Channel[]
      }
    | {
        type: 'home/allChannels'
        payload: Channel[]
      }
    | {
        type: 'home/currentChannel'
        payload: Channel['id']
      }
    | {
        type: 'home/delChannel'
        payload: Channel['id']
      }
    | {
        type: 'home/clearDelChannels'
      }
    | {
        type: 'home/getArticle'
        payload: {
          timestamp: string
          channel_id: Channel['id']
          articles: Article[]
          refresh: boolean
        }
      }
}
