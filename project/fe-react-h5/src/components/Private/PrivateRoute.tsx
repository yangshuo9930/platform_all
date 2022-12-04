import { getLocalItem } from '@/utils/tools'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Redirect, RouteProps } from 'react-router-dom'

// 私有路由组件

// interface Props extends RouteProps {
//   [key: string]: any
// }

export default function PrivateRoute({ component: Component, children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={() => {
        if (getLocalItem('token', '{}').token) {
          return children ? children : <Component></Component>
          // return children
        } else {
          // 未登录
          return (
            <Redirect
              to={{
                pathname: '/login',
                // 通过state传递额外参数, 这里可以记录用户登陆前的路由
                state: { from: rest.path }
                // 或者
                // state: { from: location.pathname },
              }}
            />
          )
        }
      }}
    ></Route>
  )
}
