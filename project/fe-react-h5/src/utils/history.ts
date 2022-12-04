import { createBrowserHistory } from 'history'

// 注意这里history库的版本, history库的types文件单独一个包,
// v4 => react-route-dom v4/v5
// v5 => react-route-dom v6

// 创建一个history对象 在非组件中也可以控制路由跳转
const history = createBrowserHistory()
export default history
