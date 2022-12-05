import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Input } from 'antd'
import FCSon from './functionSonCom/FCSon'
import FCMemo from './functionSonCom/FCMemo'
import FCCallback from './functionSonCom/FCCallback'
import FCUseMemo from './functionSonCom/FCUseMemo'

export default function FunctionCom () {

  const [num, setNum] = useState(1)

  const changeNum = useCallback(() => {
    setNum(num + 1)
  }, [num])

  const computedNumber = useMemo(() => {
    // computedNumber 的值不改变, FCUseMemo组件状态不更新
    return num * 0 + 1
    // useMemo也可缓存函数 return () => {}
  }, [num])

  const [person, setPerson] = useState({
    name: '张三',
    gender: true
  })
  const refTimerId = useRef(-1)

  const openTimer = () => {
    console.log('定时器开启===>')
    refTimerId.current = window.setInterval(() => {
      setNum(num => num + 1) // 获取最新的num值 + 1
    }, 1000)
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({
      ...person,
      name: e.target.value
    })
  }
  const changeGender = () => {
    setPerson({
      ...person,
      gender: !person.gender
    })
  }

  useEffect(() => {
    if (num >= 10) {
      console.log('定时器销毁===>')
      window.clearInterval(refTimerId.current)
    }
    console.log(num)
  }, [num])


  useEffect(() => {
    console.log('函数组件创建===>')
    return () => {
      console.log('函数组件销毁===>, 销毁一些全局事件')
      window.clearInterval(refTimerId.current)
    }
  }, [])

  useEffect(() => {
    console.log('函数组件更新===>')
  })
  return (
    <div>
      <Button onClick={openTimer}>开启定时器</Button>
      <p>{num}</p>
      <Input type="text" placeholder='请输入姓名' value={person.name} onChange={(v) => onChange(v)} />
      <p>{person.name}</p>
      <Button onClick={changeGender}> 修改性别 </Button>
      <p>{person.gender ? '男' : '女'}</p>
      <div>
        <p>1. FCSon = 不使用高阶组件, 即使props没有变化组件也会更新</p>
        <FCSon></FCSon>
        <p>2. FCMemo = 使用高阶组件, 如果没有props变化, 组件不会更新, 节省性能</p>
        {/* 这里如果不传changeGender函数过去, 组件更新不会影响到Son2组件的更新 */}
        <FCMemo name={person.name} changeGender={changeGender}></FCMemo>
        <p>
          React.memo的问题: 被其包裹的组件会被缓存, 但是每次组件更新都会创建新的props的值(比如事件处理函数等 --- 函数组件的闭包特性带来的)
          这就导致 `React.memo` 在处理对象类型的props会失效. 每次props都是新的对象, `React.memo` 是浅层对比
        </p>
        <p>3. FCCallback = 使用useCallback解决高阶组件的问题</p>
        <FCCallback changeNum={changeNum}></FCCallback>
        <p>4. FCUseMemo = 使用useMemo解决高阶组件的问题, useMemo缓存数据</p>
        <FCUseMemo num={computedNumber}></FCUseMemo>
      </div>
    </div>
  )
}