import React from 'react'
import { Button } from 'antd'
import styles from './shaking.module.scss'

export default function () {
  return (
    <div className={styles.root}>
      <div className="shaking-wrap">
        <Button>antd按钮</Button>
      </div>
    </div>
  )
}
