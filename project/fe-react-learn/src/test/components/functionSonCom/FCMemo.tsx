import React, { useEffect } from 'react'


export type FCMemoProps = {
  children?: React.ReactNode
  name: string
  changeGender?: () => void
}

function FCMemo (props: FCMemoProps) {
  console.log('FCMemo组件更新=>')

  useEffect(() => {
    console.log('FCMemo组件生成=>')
  }, [])

  return (
    <div>
      <p>{props.name}</p>
      <button onClick={props?.changeGender}>FC2修改性别</button>
    </div>
  )
}

export default React.memo(FCMemo)