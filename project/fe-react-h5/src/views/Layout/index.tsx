import React from 'react'
import { Button } from 'antd-mobile'
import Icon from '@/components/icon/Icon'
import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import { useHistory, Route, Switch } from 'react-router'
import Home from '../Home'
import Question from '../Question'
import Profile from '../Profile'
import Video from '../Video'
import PrivateRoute from '@/components/Private/PrivateRoute'
import KeepAlive from '@/components/KeepAlive'

export default function Layout() {
  const tabs = [
    { path: '/home', icon: 'iconbtn_home', text: '首页' },
    { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
    { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
    { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' }
  ]

  const history = useHistory()
  const changeRoute = (key: string) => {
    history.push(key)
  }
  return (
    <div className={styles.root}>
      {/* 二级路由 */}
      <KeepAlive exact path="/home" activePath="/home">
        <Home></Home>
      </KeepAlive>
      <Switch>
        {/* <Route exact path='/home'>
          <Home></Home>
        </Route> */}
        <Route path="/home/question">
          <Question></Question>
        </Route>
        <Route path="/home/video">
          <Video></Video>
        </Route>
        <PrivateRoute path="/home/profile">
          <Profile></Profile>
        </PrivateRoute>
      </Switch>
      <TabBar className="tab-bar" onChange={changeRoute}>
        {tabs.map((item) => (
          // icon: ReactNode | ((active: boolean) => ReactNode)
          <TabBar.Item
            key={item.path}
            icon={(active) => <Icon type={active ? `${item.icon}_sel` : item.icon}></Icon>}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}
