/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLocalItem, setLocalItem } from '@/utils/tools'

const initialState = {
  channels: getLocalItem('channels', '[]'),
  allChannels: [] as Channel[],
  currentChannel: 0,
  delChannels: [] as number[],
  articleList: {} as {
    [key: number]: {
      acticles: Article[]
      timestamp: string
    }
  }
}

const getUserChannel = (state = initialState, action: HomeAction) => {
  if (action.type === 'home/channel') {
    setLocalItem('channels', action.payload)
    return {
      ...state,
      channels: action.payload
    }
  }

  if (action.type === 'home/allChannels') {
    return {
      ...state,
      allChannels: action.payload
    }
  }

  if (action.type === 'home/currentChannel') {
    return {
      ...state,
      currentChannel: action.payload
    }
  }

  if (action.type === 'home/delChannel') {
    const channels = state.channels.filter((item) => item.id !== action.payload)
    setLocalItem('channels', channels)
    return {
      ...state,
      channels,
      delChannels: [...state.delChannels, action.payload]
    }
  }

  if (action.type === 'home/clearDelChannels') {
    return {
      ...state,
      delChannels: []
    }
  }

  if (action.type === 'home/getArticle') {
    const { articles, channel_id, timestamp, refresh } = action.payload
    // 判断是否有该频道 如果没有则创建 如果有则更新内容
    const oldArticles = state.articleList[channel_id]?.acticles || []

    if (!refresh) {
      return {
        ...state,
        articleList: {
          ...state.articleList,
          [channel_id]: {
            acticles: [...oldArticles, ...articles],
            timestamp
          }
        }
      }
    } else {
      return {
        ...state,
        articleList: {
          ...state.articleList,
          [channel_id]: {
            acticles: articles,
            timestamp
          }
        }
      }
    }
  }
  return state
}

export default getUserChannel
