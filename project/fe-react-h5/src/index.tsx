import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import '@/styles/main.scss'
import { Provider } from 'react-redux'
import store from '@/store/index'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
;(window as any).syslog = function (str: any) {
  console.log(`%c${str}`, 'font-size:20px;color:pink')
}

syslog('这是一个练习react和typescript的项目')
