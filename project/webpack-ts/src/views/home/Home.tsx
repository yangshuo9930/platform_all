import React from 'react'
import styles from './home.module.scss'
import bg from '@/assets/images/login-bg.png'
import Image from '@/components/Image/index'

export default function Home() {
  return (
    <div className={styles.root}>
      <div className="home-wrap">
        首页
        <Image src={bg} />
        <Image src="123" />
      </div>
    </div>
  )
}
