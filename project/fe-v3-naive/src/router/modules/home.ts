import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/utils/index'

const routeName = 'home'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: routeName,
    component: Layout,
    redirect: '/home/home',
    meta: {
      title: 'Home',
      icon: renderIcon(DashboardOutlined),
      // permissions: ['admin'],
      sort: 0
    },
    children: [
      {
        path: 'home',
        name: `${routeName}_home`,
        meta: {
          title: '首页',
          // permissions: ['admin'],
          affix: true
        },
        component: () => import('@/views/home/HomeView.vue')
      }
    ]
  }
]

export default routes
