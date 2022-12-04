import React, { Component } from 'react'
import img from '@/assets/image/009.jpg'

type Props = {
  x: number
  y: number
}

export default class Image extends Component<Props> {
  render() {
    return (
      <div>
        <img
          src={img}
          alt=""
          width={200}
          height={200}
          style={{ position: 'absolute', top: this.props.y, left: this.props.x }}
        />
      </div>
    )
  }
}
