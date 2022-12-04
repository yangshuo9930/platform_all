// 合并reducers
import { combineReducers } from 'redux'
import login from './login/index'
import profile from './profile/index'
import home from './home'

const rootReducers = combineReducers({
  login,
  profile,
  home
})

export default rootReducers
