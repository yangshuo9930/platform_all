import React, { Component } from 'react'
import { Button, Input } from 'antd'
import ClassSon1 from './classSonCom/ClassSon1'
import ClassSon2 from './classSonCom/ClassSon2'

type TestProps = {
  children?: React.ReactNode
  list: any[]
}

type TestState = {
  num: number,
  person: {
    name: string,
    gender: boolean
  }
}
export default class Test extends Component<TestProps, TestState> {

  state = {
    num: 1,
    person: {
      name: '王五',
      gender: true
    }
  }
  // 定时器
  timerId = -1

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const person = {
      gender: this.state.person.gender,
      name: e.target.value
    }
    this.setState({
      ...this.state,
      person
    })
  }
  changeGender = () => {
    const person = {
      ...this.state.person,
      gender: !this.state.person.gender
    }
    this.setState({
      ...this.state,
      person
    })
  }
  openTimer = () => {
    this.timerId = window.setInterval(() => {
      console.log(this.state.num)
      this.setState({
        ...this.state,
        num: this.state.num + 1
      })
      if (this.state.num >= 9) window.clearInterval(this.timerId)
    }, 1000)
  }
  componentDidMount () {
    console.log('Class组件生成===>', this)
  }
  componentDidUpdate () {
    console.log('Class组件更新===>')
  }
  componentWillUnmount () {
    console.log('Class组件卸载===>, 销毁定时器登全局事件')
    window.clearInterval(this.timerId)
  }
  render () {
    const { person, num } = this.state
    return (
      <div>
        <Button onClick={this.openTimer}>开启定时器</Button>
        <p>{num}</p>
        <Input type="text" placeholder='请输入姓名' value={person.name} onChange={(v) => this.onChange(v)} />
        <p>{this.state.person.name}</p>
        <Button onClick={this.changeGender}> 修改性别 </Button>
        <p>{this.state.person.gender ? '男' : '女'}</p>
        <div>
          <p>class的子组件1 = 使用纯组件</p>
          <ClassSon1 name={person.name} changeGender={this.changeGender}></ClassSon1>
          <p>class的子组件2 = 非纯组件</p>
          <ClassSon2></ClassSon2>
        </div>
      </div>
    )
  }
}
