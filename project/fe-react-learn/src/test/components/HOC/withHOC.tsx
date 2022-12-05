import React, { Component } from 'react'
import { throttle } from '@/utils/jsTools'

/** 高阶组件: 是一个函数, 接收一个组件,返回一个增强后的新组件 */
export default function withHoc (Com: any) {


  class MouseAlwayCom extends Component {

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
      const { x, y } = this.state
      console.log(x, y)
      return <Com {...this.state} {...this.props}></Com>
    }
  }

  return MouseAlwayCom
} 
