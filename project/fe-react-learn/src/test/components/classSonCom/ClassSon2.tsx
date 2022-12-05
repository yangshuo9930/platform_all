import React, { Component } from 'react'

export default class ClassSon1 extends Component {

  componentDidMount () {
    console.log('classSon2组件生成==>')
  }
  componentDidUpdate () {
    console.log('classSon2组件更新==>')
  }
  render () {
    return (
      <div>ClassSon2</div>
    )
  }
}
