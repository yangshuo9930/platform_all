import request from '@utils/request'
import { getLocalItem, setLocalItem } from '@/utils/tools'
export function getUserChannel(): RootThunkAction {
  return async (dispatch) => {
    if (getLocalItem('token', '{}')) {
      const { data } = await request.get<ApiResponse<{ channels: Channel[] }>>('user/channels')

      dispatch({
        type: 'home/channel',
        payload: data.data.channels
      })
    } else {
      // 本地是否有频道
      const channels = getLocalItem('channels', '[]')
      if (channels.length) {
        dispatch({
          type: 'home/channel',
          payload: channels
        })
      } else {
        // 获取频道
        const { data } = await request.get<ApiResponse<{ channels: Channel[] }>>('user/channels')

        dispatch({
          type: 'home/channel',
          payload: data.data.channels
        })
      }
    }
  }
}

export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const { data } = await request.get<ApiResponse<{ channels: Channel[] }>>('channels')
    dispatch({
      type: 'home/allChannels',
      payload: data.data.channels
    })
  }
}

export const changeCurrentChannel = (id: Channel['id']): HomeAction => {
  return {
    type: 'home/currentChannel',
    payload: id
  }
}

/** 删除本地频道 */
export const delChannel = (id: Channel['id']): HomeAction => {
  return {
    type: 'home/delChannel',
    payload: id
  }
}

/** 删除个人频道 */
export const delUserChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const { delChannels } = getState().home
    if (delChannels.length) {
      await request.delete<ApiResponse>(`user/channels`, {
        data: {
          channels: delChannels
        }
      })
      dispatch(getUserChannel())
    }

    dispatch({
      type: 'home/clearDelChannels'
    })
  }
}

/** 获取文章列表 */
export const getArticleList = (
  channel_id: number,
  timestamp: string,
  refresh: 'refresh' | 'loadmore' = 'loadmore'
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<ArticleRes>>('/articles', {
      params: {
        channel_id,
        timestamp
      }
    })

    const { results, pre_timestamp } = res.data.data
    dispatch({
      type: 'home/getArticle',
      payload: {
        channel_id: channel_id,
        articles: results,
        timestamp: pre_timestamp,
        refresh: refresh === 'refresh' ? true : false
      }
    })
  }
}
