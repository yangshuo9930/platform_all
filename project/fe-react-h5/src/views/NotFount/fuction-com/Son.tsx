import React from 'react'

type Props = {
  add: (num: number) => void
}

function Son({ add }: Props) {
  return (
    <div>
      <button onClick={() => add(10)}> +10 </button>
    </div>
  )
}

export default React.memo(Son)
