import { useState, useEffect, useRef } from 'react'

export default function useCountDown(time = 10, callback: Function) {
  const [count, setCount] = useState(time)
  const timerRef = useRef(-1)

  const start = () => {
    // 要使用window的定时器,默认是node的
    timerRef.current = window.setInterval(() => {
      console.log('定时器开始')
      setCount((count) => count - 1) // 提供函数来获取最新的count ??
    }, 1000)
  }

  useEffect(() => {
    if (count === 0) {
      callback && callback()
      console.log('清除定时器')
      clearInterval(timerRef.current)
      setCount(time)
    }
  }, [count])

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current) // 组件卸载时，清除定时器
    }
  }, [])
  return { count, start }
}
