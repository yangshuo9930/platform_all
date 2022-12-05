import type { AppRouteRecordRaw } from '@/router/types'
import { ErrorPage, RedirectName, Layout } from '@/router/constant'

// 404 on a page

/**
 * @param name 路由名称, 必须设置,且不能重名!
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.hidden 不显示菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由, 需要和组件名称一致
 * @param meta.sort 排序越小越排前
 * @param meta.alwaysShow boolean //取消自动计算根路由模式
 * @param meta.activeMenu  高亮相对应的侧边栏 为name值
 * @param meta.isRoot //是否跟路由 顶部混合菜单，必须传 true，否则左侧会显示异常
 * @param meta.frameSrc //内联外部地址
 * @param meta.permissions :string[] //菜单包含权限集合，满足其中一个就会显示
 * @param meta.affix //是否固定 设置为 true 之后 多页签不可删除
 * */

export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true
      }
    }
  ]
}

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true
      }
    }
  ]
}

/** 统一认证平台回跳 -- 暂时不使用 */
// export const SigninOidcRoute: AppRouteRecordRaw = {
//   path: '/signin-oidc',
//   name: 'SigninOidc',
//   component: () => import('@/views/signin-oidc/index.vue'),
//   meta: {
//     title: '',
//     hideBreadcrumb: true,
//     ignoreAuth: true
//   }
// }

export const NotFountPageRoute: Array<AppRouteRecordRaw> = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: Layout,
    meta: {
      title: '异常页面',
      // icon: renderIcon(ExclamationCircleOutlined),
      sort: 3,
      hidden: true
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: '403'
        },
        component: () => import('@/views/exception/403.vue')
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: '404'
        },
        component: () => import('@/views/exception/404.vue')
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: '500'
        },
        component: () => import('@/views/exception/500.vue')
      }
    ]
  }
]
