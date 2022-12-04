import React, { useCallback, useMemo } from 'react'
import Son from './Son'

function F() {
  const [count, setCount] = React.useState(0)
  const add = useCallback(
    (num: number) => {
      setCount(count + num)
    },
    [count]
  )
  // 记忆普通数据
  const count2 = useMemo(() => {
    return count * 2
  }, [count])

  // 记忆函数
  const add2 = useMemo(() => {
    return () => {
      console.log(count2)
    }
  }, [count2])
  return (
    <div>
      <Son add={add}></Son>
    </div>
  )
}

export default React.memo(F)
