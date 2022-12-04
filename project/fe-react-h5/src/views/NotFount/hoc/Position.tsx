import React from 'react'

type Props = {
  x: number
  y: number
  left?: number
  top?: number
}
export default function Position({ x, y, top = 0, left = 0 }: Props) {
  return (
    <div>
      Position组件
      <div>x: {x}</div>
      <div>y: {y}</div>
      <div>top: {top}</div>
      <div>left: {left}</div>
    </div>
  )
}
