/* eslint-disable @typescript-eslint/no-unused-vars */
import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import useReduxState from '@/hooks/useReduxState'
import { useEffect, useState } from 'react'
import { getArticleList } from '@/store/actions/home'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { sleep } from '@/utils/tools'
import { useHistory } from 'react-router-dom'

type Props = {
  channelId: number // 频道id, 必须由父组件传入
}
const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  // useEffect(() => {
  //   dispatch(getArticleList(channelId, Date.now() + ''))
  // }, [dispatch, channelId])

  const { articleList } = useSelector((state: RootState) => state.home)

  const { acticles = [], timestamp = '' } = articleList[channelId] || {}

  const [hasMore, setHasMore] = useState(true)

  /** 上拉加载 */
  const loadMore = async () => {
    await dispatch(getArticleList(channelId, timestamp || Date.now() + ''))
    console.log('加载数据')
  }

  /** 下拉刷新 */
  const onRefresh = async () => {
    await dispatch(getArticleList(channelId, Date.now() + '', 'refresh'))
  }

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <PullToRefresh onRefresh={onRefresh}>
        {acticles.map((item) => {
          return (
            <div
              className="article-item"
              key={item.art_id}
              onClick={() => history.push(`/article/${item.art_id}`)}
            >
              <ArticleItem article={item} type={item.cover.type} />
            </div>
          )
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
