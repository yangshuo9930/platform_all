import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/styles/main.scss'
// import 'antd/dist/antd.min.css';
import 'antd/dist/antd.less'
import App from './App'
import { Provider } from 'react-redux'
import store from '@/store/index'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
)
;(window as any).syslog = function (str: any) {
  console.log(`%c${str}`, 'font-size:18px;color:red')
}
