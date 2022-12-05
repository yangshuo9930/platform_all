import React, { useState } from 'react'
import { Tabs } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const { TabPane } = Tabs
export default function Test () {

  const [list] = useState([
    {
      name: '类组件优化',
      key: 'class'
    },
    {
      name: '函数组件优化',
      key: 'function'
    },
    {
      name: 'render props',
      key: 'renderProps'
    },
    {
      name: '高阶组件HOC',
      key: 'hoc'
    }
  ])
  const navigate = useNavigate()
  const onChange = (key: string) => {
    navigate(`/test/${key}`)
  }


  return (
    <div className={styles.root} style={{ display: "flex", justifyContent: 'center', flexDirection: 'column', padding: 100 }}>
      <header>test组件</header>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {
          list.map(item => <TabPane key={item.key} tab={item.name}></TabPane>)
        }
      </Tabs>
      <Outlet></Outlet>
      <span className='aa'>123</span>
    </div>
  )
}