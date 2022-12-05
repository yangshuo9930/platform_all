import React, { useEffect } from 'react'

type FCCallbackProps = {
  changeNum: () => void
}

function FCCallback (props: FCCallbackProps) {
  console.log('FCCallback组件更新=>')

  useEffect(() => {
    console.log('FCCallback组件生成=>')
  }, [])

  return (
    <div>
      <button onClick={props?.changeNum}>FC2修改Num</button>
    </div>
  )
}

export default React.memo(FCCallback)