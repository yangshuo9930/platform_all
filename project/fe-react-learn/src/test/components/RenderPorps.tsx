import React, { Component, createRef } from 'react'
import MouseAlwayCom from './renderCom/MouseAlwayCom'
import logo from '@/assets/image/logo.png'
export default class RenderPorps extends Component {
  render () {
    return (
      <div>
        <MouseAlwayCom render={(state) => <Image {...state}></Image>}></MouseAlwayCom>
      </div>
    )
  }
}

class Image extends Component<{
  x: number
  y: number
}> {

  refImg = createRef<HTMLImageElement>()
  fn = () => {
    this.refImg.current!.style.left = this.props.x + 'px'
    this.refImg.current!.style.top = this.props.y + 'px'
    // const 

  }

  refDiv = createRef<HTMLDivElement>()
  componentDidMount () {
    console.log(window.innerWidth, window.innerHeight)

    document.body.addEventListener('mousemove', this.fn)
    console.log(this.refDiv.current?.offsetWidth) // 元素自身的宽度 border + width + padding
    console.log(this.refDiv.current?.offsetHeight) // 元素自身的高度 border + height + padding
    console.log(this.refDiv.current?.offsetParent) // 是离当前元素最近的定位父级元素,如果没有就找body, 没有找body
    console.log(this.refDiv.current?.offsetLeft) // 元素自身到offsetParent的left的距离
    console.log(this.refDiv.current?.offsetTop) // 元素自身到offsetParent的top的距离
    // 
    console.log('-------------------------------')

    console.log(this.refDiv.current?.clientWidth) // 元素可视区的宽度, width + padding
    console.log(this.refDiv.current?.clientHeight) // 元素可视区的高度, height + padding
    console.log(this.refDiv.current?.clientLeft) // 内容到边框的距离,相当于border的宽度
    console.log(this.refDiv.current?.clientTop) // 内容到边框的距离,相当于border的宽度

    console.log('-------------------------------')

    console.log(this.refDiv.current?.scrollWidth) // 元素的内容总宽度.与元素本身大小无关(即使被overflow:hidden, 如果元素内容没有样式, 则是等于client),  元素内容+内边距
    console.log(this.refDiv.current?.scrollHeight) // 元素的内容总宽度.与元素本身大小无关(即使被overflow:hidden, 如果元素内容没有样式, 则是等于client),  元素内容+内边距
    console.log(this.refDiv.current?.scrollTop) //  用于获取内容垂直滚动的像素数。如果没有滚动条，那么 scrollTop 值是 0
    console.log(this.refDiv.current?.scrollLeft) //  用于获取内容垂直滚动的像素数。如果没有滚动条，那么 scrollTop 值是 0

  }

  componentWillUnmount () {
    document.body.removeEventListener('mousemove', this.fn)
  }
  render () {
    // console.log(this.props)
    return (
      <div className='parent'>
        <img ref={this.refImg} src={logo} alt="" />
        <div ref={this.refDiv} className='offset'>
          <p style={{ width: 500 }}>9999</p>
        </div>
      </div>
    )
  }
}
