import React, { Component } from 'react'

// render props
// jsx的类型是
// type Props = {
//   render: (state: State) => React.ReactElement
// }
type Props = {
  render: (state: State) => JSX.Element // jsx
  children?: React.ReactNode
}

type State = {
  x: number
  y: number
}
export default class MouseCom extends Component<Props, State> {
  state = {
    x: 0,
    y: 0
  }

  handleMouseMove = (e: MouseEvent) => {
    console.log(e.pageX, e.pageY)
    this.setState({
      x: e.pageX,
      y: e.pageY
    })
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }
  // 组件卸载
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
  render() {
    return this.props.render(this.state)
  }
}
