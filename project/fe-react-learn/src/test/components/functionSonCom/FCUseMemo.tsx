import React, { useEffect } from 'react'

type FCUseMemoProps = {
  num: number
}
function FCUseMemo ({ num }: FCUseMemoProps) {
  console.log('FCUseMemo组件更新=>')

  useEffect(() => {
    console.log('FCUseMemo组件生成=>')
  }, [])

  return (
    <div>{num}</div>
  )
}

export default React.memo(FCUseMemo)