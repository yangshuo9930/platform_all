import React from 'react'
import classNames from 'classnames'

type Props = {
  type: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function Icon({ type, onClick, className }: Props) {
  return (
    <svg className={classNames('icon', className)} aria-hidden="true" onClick={onClick}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
