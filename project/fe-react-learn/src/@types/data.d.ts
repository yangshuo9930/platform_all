type LoginForm = {
  mobile: string
  code: string
}

type MessageList = { type: 'robot' | 'user'; text: string }[]
