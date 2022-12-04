/* eslint-disable @typescript-eslint/no-unused-vars */
import classnames from 'classnames'
import { useState } from 'react'
import Icon from '@/components/icon/Icon'
import styles from './index.module.scss'
import useReduxState from '@/hooks/useReduxState'
import {
  changeCurrentChannel,
  getUserChannel,
  delChannel,
  delUserChannel
} from '@/store/actions/home'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getLocalItem } from '@/utils/tools'

type Props = {
  setVisible: (visible: boolean) => void
}

const Channels = ({ setVisible }: Props) => {
  const { channels: userChannels } = useReduxState(getUserChannel, 'home')
  const { allChannels } = useSelector((state: RootState) => state.home)
  const otherChannels = allChannels.filter(
    (channel) => !userChannels.find((item) => item.id === channel.id)
  )

  // const [active, setActive] = useState(() =>)

  const dispatch = useDispatch()
  const currentChannel = useSelector((state: RootState) => state.home.currentChannel)

  // 编辑频道
  const [edit, setEdit] = useState(false)

  /** 删除某频道 */
  const deleteChannel = (id: number) => {
    dispatch(delChannel(id))
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon
          type="iconbtn_channel_close"
          onClick={() => {
            setVisible(false)
          }}
        />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setEdit(!edit)
                const dom = document.querySelectorAll(
                  '.Channels_root__vEAAN .channel-content .channel-list-item .icon'
                ) as NodeListOf<HTMLElement>

                if (!edit) {
                  dom.forEach((item) => (item.style.display = 'block'))
                } else {
                  dom.forEach((item) => (item.style.display = 'none'))
                }

                if (edit && getLocalItem('token', '{}').token) {
                  dispatch(delUserChannel())
                }
              }}
            >
              {edit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item) => {
              return (
                <span
                  className={classnames(
                    'channel-list-item',
                    item.id === currentChannel && 'selected'
                  )}
                  key={item.id}
                  onClick={() => {
                    if (edit) return
                    dispatch(changeCurrentChannel(item.id))
                    setVisible(false)
                  }}
                >
                  {item.name}
                  <Icon type="iconbtn_tag_close" onClick={() => deleteChannel(item.id)} />
                </span>
              )
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {otherChannels.map((item) => {
              return (
                <span className={classnames('channel-list-item')} key={item.id}>
                  + {item.name}
                  {/* <Icon type='iconbtn_tag_close' /> */}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
