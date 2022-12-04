import React, { useEffect, useState, useRef } from 'react'

export default function Video() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  const refDIV = useRef<HTMLDivElement | null>(null)
  const addCount = () => {
    setCount((count) => count + 1)
    setShow(true)
    // console.log(refDIV.current)

    // document.querySelector('.a')!.innerHTML = 'hello'
  }

  useEffect(() => {
    console.log('1111') // 注意严格模式调用两次, 不要使用严格模式
    // if (show) {
    //   document.querySelector('.a')!.innerHTML = 'hello'
    // }
  }, [])

  return (
    <div>
      <span>{count}</span>
      {show && (
        <div ref={refDIV} className="a">
          show
        </div>
      )}
      <button onClick={() => addCount()}>按钮</button>
    </div>
  )
}
