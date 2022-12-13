import { httpOpenAi } from '@monorepo/http'

export const getOpenAiMsg = () => {
  return httpOpenAi.request({
    url: '',
    method: 'post',
    data: {
      model: 'text-davinci-003',
      prompt: 'Say this is a test',
      temperature: 0,
      max_tokens: 7
    }
  })
}
