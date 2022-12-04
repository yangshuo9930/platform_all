type ProfileUser = {
  user: User
  profile: UserProfile
}

const initialState = {
  user: {},
  profile: {}
} as ProfileUser

const getUserInfo = (state = initialState, action: ProfileAction) => {
  if (action.type === 'GETUSERINFO') {
    // 保存token
    return {
      ...state,
      user: action.payload
    }
  }

  if (action.type === '/profile/getProfile') {
    return {
      ...state,
      profile: action.payload
    }
  }

  return state
}

export default getUserInfo
