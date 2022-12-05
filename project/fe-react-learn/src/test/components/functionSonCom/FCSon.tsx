import React, { useEffect } from 'react'

export default function FCSon () {
  console.log('FCSon组件更新=>')

  useEffect(() => {
    console.log('FCSon组件生成=>')
  }, [])
  return (
    <div>FCSon</div>
  )
}
