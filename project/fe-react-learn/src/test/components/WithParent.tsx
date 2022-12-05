import React, { Component, createRef, } from 'react'
import withHOC from './HOC/withHOC'
import logo from '@/assets/image/logo.png'


type Props = {
  x: number
  y: number
}
class Image extends Component<Props> {

  state = {
    x: 0,
    y: 0
  }
  refImg = createRef<HTMLImageElement>()
  fn = () => {
    this.refImg.current!.style.left = this.props.x + 'px'
    this.refImg.current!.style.top = this.props.y + 'px'
  }
  componentDidMount () {
    window.addEventListener('mousemove', this.fn)
  }
  componentWillUnmount () {
    window.removeEventListener("mousemove", this.fn)
  }
  render () {
    return (
      <img ref={this.refImg} src={logo} alt="" />
    )
  }
}


const Com = withHOC(Image)


export default class WithParent extends Component {
  render () {
    return (
      <div>
        <Com></Com>
      </div>
    )
  }
}


