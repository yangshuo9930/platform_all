type ApiResponse<T = any> = {
  message: string
  data: T
  code?: number
}

type Token = {
  token: string
  refresh_token: string
}

type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

type UserProfileKey = Partial<Omit<UserProfile, 'id'>>

type Channel = {
  id: number
  name: string
}

type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}

type ArticleRes = {
  results: Article[]
  pre_timestamp: string
}
