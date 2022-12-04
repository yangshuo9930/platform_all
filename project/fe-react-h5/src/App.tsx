import React from 'react'
import '../src/styles/overlay.css'

import { Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/Private/PrivateRoute'
import history from '@utils/history'
import KeepAlive from '@/components/KeepAlive'

const Login = React.lazy(() => import('./views/Login'))
const Layout = React.lazy(() => import('./views/Layout'))
const NotFount = React.lazy(() => import('./views/NotFount'))
const Edit = React.lazy(() => import('./views/Edit'))
const Chat = React.lazy(() => import('./views/Chat'))
const Article = React.lazy(() => import('./views/Article'))
const Search = React.lazy(() => import('./views/Search'))

export default function App() {
  return (
    <Router history={history}>
      <React.Suspense fallback={<div> loding... </div>}>
        <div style={{ height: '100%' }}>
          <KeepAlive activePath="/home" path="/home">
            <Layout></Layout>
          </KeepAlive>
          <Switch>
            {/* Redirect需要包裹在Switch中 */}
            {/* <Redirect exact from='/' to='/home'></Redirect> */}
            <Route exact path="/" render={() => <Redirect to="/home"></Redirect>}></Route>
            {/* <Route path='/home' component={Layout} /> */}
            <Route path="/login" component={Login} />
            <Route path="/article/:id" component={Article}></Route>
            <Route path="/search" component={Search}></Route>
            <PrivateRoute path="/profile/edit" component={Edit}></PrivateRoute>
            <PrivateRoute path="/chat" component={Chat}></PrivateRoute>

            {/* 404 */}
            <Route component={NotFount}></Route>
          </Switch>
        </div>
      </React.Suspense>
    </Router>
  )
}
