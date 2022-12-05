import React, { Component } from 'react'
import { throttle } from '@/utils/jsTools'

type Props = {
  render: (state: State) => JSX.Element // jsx
  children?: React.ReactNode
}

type State = {
  x: number
  y: number
}

// 提供一个有逻辑的组件, 该组件接收一个返回结构的函数, 并且在render中返回这个函数的调用
export default class MouseCom extends Component<Props, State> {
  state = {
    x: 0,
    y: 0
  }

  mouseFn = throttle((e: MouseEvent) => {
    this.setState({
      x: e.pageX,
      y: e.pageY
    })
  })

  componentDidMount () {
    document.body.addEventListener('mousemove', this.mouseFn)
  }

  componentWillUnmount () {
    document.body.removeEventListener('mousemove', this.mouseFn)
  }
  render () {
    // render props
    return this.props.render(this.state)
  }
}
