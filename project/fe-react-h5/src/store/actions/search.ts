import request from '@utils/request'
export const getSuggestion = async (str: string) => {
  const { data } = await request.get<ApiResponse>(`suggestion`, {
    params: {
      q: str
    }
  })
  return data
}
