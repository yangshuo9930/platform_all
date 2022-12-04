import Icon from '@/components/icon/Icon'
import styles from './index.module.scss'
import { Tabs, Popup } from 'antd-mobile'
import useReduxState from '@/hooks/useReduxState'
import { getUserChannel, getAllChannels, changeCurrentChannel } from '@/store/actions/home'
import { useState } from 'react'
import Channels from '@/components/Home/Channels'
import { useDispatch, useSelector } from 'react-redux'
import ArticleList from '@/components/Home/ArticleList'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  const { channels } = useReduxState(getUserChannel, 'home')
  useReduxState(getAllChannels, 'home')
  const [visible, setVisible] = useState(false)

  const { currentChannel } = useSelector((state: RootState) => state.home)
  const dispatch = useDispatch()

  const onChange = (key: string) => {
    dispatch(changeCurrentChannel(parseInt(key)))
  }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表  activeLineMode 固定下边线大小*/}
      <Tabs
        className="tabs"
        activeLineMode="fixed"
        activeKey={currentChannel.toString()}
        onChange={onChange}
      >
        {channels.map((item) => {
          return (
            // forceRender v-show的效果
            <Tabs.Tab title={item.name} key={item.id} forceRender>
              <ArticleList channelId={item.id}></ArticleList>
            </Tabs.Tab>
          )
        })}
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('search')} />
        <Icon type="iconbtn_channel" onClick={() => setVisible(true)} />
      </div>
      <Popup position="left" visible={visible} onMaskClick={() => setVisible(false)}>
        <Channels setVisible={setVisible}></Channels>
      </Popup>
    </div>
  )
}

export default Home
