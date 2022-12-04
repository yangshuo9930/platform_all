import React from 'react'

export default function withMouse(Com: any) {
  // 内部定义一个类组件
  class Mouse extends React.Component {
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
    shouldComponentUpdate(nextProps: any, nextState: any) {
      return nextState.x !== this.state.x || nextState.y !== this.state.y
    }

    render() {
      return <Com {...this.state}></Com>
    }
  }
  return Mouse
}
