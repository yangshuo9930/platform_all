import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import history from './utils/history'

const Login = React.lazy(() => import('./views/Login'))
const Home = React.lazy(() => import('./views/Home/Home'))

// 练习Class和function组件的优化
const Test = React.lazy(() => import('@/test/index'))
const ClassCom = React.lazy(() => import('@/test/components/ClassCom'))
const FunctionCom = React.lazy(() => import('@/test/components/FunctionCom'))

// renderProps
const RenderProps = React.lazy(() => import('@/test/components/RenderPorps'))
// hoc
const WithParent = React.lazy(() => import('@/test/components/WithParent'))

// JavaScript
const JavaScript = React.lazy(() => import('@/javascript'))
export default function App () {
  useEffect(() => {
    syslog('react根App组件创建')
  }, [])

  return (
    <Router>
      <React.Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace></Navigate>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          {/* test */}
          <Route path='/test/*' element={<Test></Test>}>
            {/*  默认路由 匹配带有index属性的 */}
            <Route index element={<ClassCom list={[]}></ClassCom>} />
            <Route path='class' element={<ClassCom list={[]}></ClassCom>} />
            <Route path='function' element={<FunctionCom></FunctionCom>} />
            {/* { renderProps } */}
            <Route path='renderProps' element={<RenderProps></RenderProps>}></Route>
            {/* 高阶组件 - 逻辑复用 */}
            <Route path='hoc' element={<WithParent></WithParent>}></Route>
          </Route>
          {/* JavaScript */}
          <Route path='js' element={<JavaScript></JavaScript>}></Route>
        </Routes>
      </React.Suspense>
    </Router>
  )
}
