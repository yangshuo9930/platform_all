type ApiResponse<T = any> = {
  msg: string
  data?: T
  code: string
}
