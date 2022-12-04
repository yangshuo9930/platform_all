/* eslint-disable @typescript-eslint/no-unused-vars */
import Icon from '@/components/icon/Icon'
import { NavBar, Input } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import classNames from 'classnames'
import useInitState from '@/hooks/useReduxState'
import { getUserProfile } from '@/store/actions/profile'
import io, { type Socket } from 'socket.io-client'
import { getLocalItem } from '@/utils/tools'

const Chat = () => {
  const history = useHistory()

  const [messageList, setMessageList] = useState<MessageList>([
    {
      type: 'robot',
      text: '你好吗!'
    },
    {
      type: 'user',
      text: '我很好'
    }
  ])

  const { photo } = useInitState(getUserProfile, 'profile').profile

  const refSocket = useRef<Socket | null>(null) as any
  useEffect(() => {
    refSocket.current = (io as any)('http://toutiao.itheima.net', {
      query: {
        token: 'Bearer' + getLocalItem('token', '{}')
      },
      transports: ['websocket']
    })

    refSocket.current.on('connect', () => {
      console.log('和服务器端建立了连接')
      // -------------> 解决依赖项警告问题, 回调
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: '你好!有什么问题请联系我' }
      ])
    })
    refSocket.current.on('disconnect', () => {
      console.log('和服务器断开了连接')
    })

    refSocket.current.on('message', (data: any) => {
      setMessageList((list) => [
        ...list,
        {
          type: 'robot',
          text: data.msg as string
        }
      ])
    })

    return () => {
      refSocket.current!.close()
    }
  }, [])

  const [value, setValue] = useState('')
  const onGetMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //
    if (e.code === 'Enter') {
      refSocket.current?.emit('message', {
        msg: value,
        timestamp: Date.now()
      })
      setMessageList((list) => [
        ...list,
        {
          type: 'user',
          text: value
        }
      ])

      setValue('')
    }
  }

  const refDIV = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.querySelector('.chat-list')!.lastElementChild?.scrollIntoView()
    // document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight
  }, [messageList])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={refDIV}>
        {messageList.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames('chat-item', {
                user: item.type === 'user'
              })}
            >
              {item.type === 'robot' && <Icon type="iconbtn_xiaozhitongxue" />}
              {item.type === 'user' && <img src={photo} alt="" />}
              <div className="message">{item.text}</div>
            </div>
          )
        })}
        {/* 机器人的消息 */}
        {/* <div className='chat-item'>
          <Icon type='iconbtn_xiaozhitongxue' />
          <div className='message'>你好！</div>
        </div> */}

        {/* 用户的消息 */}
        {/* <div className='chat-item user'>
          <img src={'http://toutiao.itheima.net/images/user_head.jpg'} alt='' />
          <div className='message'>你好？</div>
      </div> */}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={value}
          onChange={(e) => setValue(e)}
          onKeyUp={(e) => onGetMessage(e)}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
