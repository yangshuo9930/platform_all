import React, { PureComponent } from 'react'

type ClassSon1Props = {
  children?: React.ReactNode
  name: string
  changeGender: () => void
}

export default class ClassSon1 extends PureComponent<ClassSon1Props> {

  onChange = () => {
    this.props.changeGender()
  }

  componentDidMount () {
    console.log('classSon1组件生成=>')
  }
  componentDidUpdate () {
    console.log('classSon1组件更新=>')
  }
  render () {
    return (
      <div>
        <button onClick={this.onChange}> classSon1修改性别 </button>
        <strong>{this.props.name}</strong>
      </div>
    )
  }
}
