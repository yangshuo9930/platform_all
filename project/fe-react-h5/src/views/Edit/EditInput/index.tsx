import { Input, NavBar } from 'antd-mobile'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'

type Porps = {
  hidePopup: () => void
  onUpdate: (key: keyof UserProfileKey, value: string) => void
}

const EditInput = ({ hidePopup, onUpdate }: Porps) => {
  const { profile } = useSelector((state: RootState) => state.profile)

  // 复用解决--> key , 使其不渲染, 组件是否支持关闭时自动卸载
  const [value, setValue] = useState(profile.name)
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={() => onUpdate('name', value)}>
            提交
          </span>
        }
        onBack={() => hidePopup()}
      >
        编辑昵称
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          <Input value={value} onChange={(e) => setValue(e)} placeholder="请输入" />
        </div>
      </div>
    </div>
  )
}

export default EditInput
