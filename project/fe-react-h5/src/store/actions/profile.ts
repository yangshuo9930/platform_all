import request from '@utils/request'

export function getUserInfo(): RootThunkAction {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<User>>('user')
    dispatch({
      type: 'GETUSERINFO',
      payload: res.data.data
    })
  }
}

export function getUserProfile(): RootThunkAction {
  return async (dispatch) => {
    const { data } = await request.get<ApiResponse<UserProfile>>('user/profile')
    dispatch({
      type: '/profile/getProfile',
      payload: data.data
    })
  }
}

export function editUserProfile(params: UserProfileKey): RootThunkAction {
  return async (dispatch) => {
    await request.patch<ApiResponse>('/user/profile', params)
    console.log(params)

    // 重新渲染
    dispatch(getUserProfile())
  }
}

/** 更新用户头像 */
export function editUserPhoto(params: FormData): RootThunkAction {
  return async (dispatch) => {
    await request.patch('user/photo', params)

    // 重新渲染
    dispatch(getUserProfile())
  }
}
