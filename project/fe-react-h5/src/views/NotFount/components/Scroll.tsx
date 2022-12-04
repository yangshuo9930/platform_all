import React, { Component } from 'react'

type Props = {
  children: (state: State) => JSX.Element
}
type State = {
  left: number
  top: number
}
export default class Scroll extends Component<Props, State> {
  state = {
    left: 0,
    top: 0
  }

  handleScroll = (e: Event) => {
    this.setState({
      left: window.scrollX, // 别名 pageXOffset
      top: window.scrollY
    })
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render() {
    return this.props.children(this.state)
  }
}
