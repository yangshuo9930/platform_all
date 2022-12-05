export function login(values: LoginForm): RootThunkAction {
  return async (dispatch) => {
    // const res = await request.post<ApiResponse<Token>>('authorizations', values)
    dispatch({
      type: 'LOGIN',
      payload: '1',
      // payload: res.data.data,
    })
  }
}
