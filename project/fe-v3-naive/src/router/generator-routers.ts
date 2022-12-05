import { adminMenus } from '@/api/mock/system/menu' //
import { constantRouterIcon } from './router-icons'
import { RouteRecordRaw } from 'vue-router'
import { Layout, ParentLayout } from '@/router/constant'
import type { AppRouteRecordRaw } from '@/router/types'
import { asyncRoutes } from '@/router/index'
import { list2tree, tree2list } from '@/utils'

const Iframe = () => import('@/views/iframe/index.vue')
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

LayoutMap.set('Layout', Layout)
LayoutMap.set('iframe', Iframe) // TODO:

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const routerGeneratorAuth = (routerMap, parent?): any[] => {
  return routerMap.map((item) => {
    const currentRouter: any = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) || ''}/${item.path}`,
      // 路由名称，建议唯一
      name: item.name || '',
      // 该路由对应页面的 组件
      component: item.component,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: constantRouterIcon[item.meta.icon] || null,
        hidden: item?.hidden || false
      }
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      //如果未定义 redirect 默认第一个子路由为 redirect
      !item.redirect && (currentRouter.redirect = `${item.path}/${item.children[0].path}`)
      // Recursion
      currentRouter.children = routerGenerator(item.children, currentRouter)
    }

    return currentRouter
  })
}

// 做一些前端控制异步路由的一些meta的额外配置,可不需要, 完全由后端接口配置
function handlerAsyncRoutes(asyncRoutes, data) {
  const flatAsyncRoutes = tree2list(asyncRoutes)
  data.forEach((item) => {
    flatAsyncRoutes.forEach((child) => {
      if (item.name === child.name) {
        item.meta = {
          ...child.meta,
          ...item.meta
        }
      }
    })
  })

  return data
}

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouterAuth = (data): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve) => {
    // 绑定后端返回的路由和前端路由动态路由的相关性, 以name为唯一标识, name不可重复
    const res = handlerAsyncRoutes(asyncRoutes, data)

    const menuList = list2tree(res, 0)
    const routeList = routerGeneratorAuth(menuList)

    asyncImportRouteAuth(routeList)

    console.log('---路由列表---', routeList)

    resolve(routeList)
  })
}

/**
 * 查找views中对应的组件文件
 * */
let viewsModulesAuth: Record<string, () => Promise<Recordable>>
export const asyncImportRouteAuth = (routes: AppRouteRecordRaw[] | undefined): void => {
  viewsModulesAuth = viewsModulesAuth || import.meta.glob('../views/**/*.{vue,tsx}')

  if (!routes) return
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'iframe'
    }
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component as string)
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImportAuth(viewsModulesAuth, component)
      }
    } else if (name) {
      item.component = ParentLayout
    }
    children && asyncImportRouteAuth(children)
  })
}

/**
 * 动态导入
 * */
export const dynamicImportAuth = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) => {
  const keys = Object.keys(viewsModules)
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views/', '')
    const lastIndex = k.lastIndexOf('.')
    k = k.substring(0, lastIndex)
    return k === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return viewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return
  }
}

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const routerGenerator = (routerMap, parent?): any[] => {
  return routerMap.map((item) => {
    const currentRouter: any = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) || ''}/${item.path}`,
      // 路由名称，建议唯一
      name: item.name || '',
      // 该路由对应页面的 组件
      component: item.component,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: constantRouterIcon[item.meta.icon] || null,
        permissions: item.meta.permissions || null
      }
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      //如果未定义 redirect 默认第一个子路由为 redirect
      !item.redirect && (currentRouter.redirect = `${item.path}/${item.children[0].path}`)
      // Recursion
      currentRouter.children = routerGenerator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    adminMenus()
      .then((result) => {
        const routeList = routerGenerator(result)
        asyncImportRoute(routeList)

        resolve(routeList)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查找views中对应的组件文件
 * */
let viewsModules: Record<string, () => Promise<Recordable>>
export const asyncImportRoute = (routes: AppRouteRecordRaw[] | undefined): void => {
  viewsModules = viewsModules || import.meta.glob('../views/**/*.{vue,tsx}')
  if (!routes) return
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME'
    }
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component as string)
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImport(viewsModules, component as string)
      }
    } else if (name) {
      item.component = ParentLayout
    }
    children && asyncImportRoute(children)
  })
}

/**
 * 动态导入
 * */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) => {
  const keys = Object.keys(viewsModules)
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views', '')
    const lastIndex = k.lastIndexOf('.')
    k = k.substring(0, lastIndex)
    return k === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return viewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return
  }
}

// const rootRouter = {
//   key: '',
//   name: 'MenuIndex.vue',
//   path: '',
//   component: 'Layout',
//   redirect: '/',
//   meta: {
//     title: '首页'
//   },
//   children: [] as any[]
// }

// /**
//  * 动态生成菜单
//  * @param data
//  * @returns {Promise<Router>}
//  */
// export const generatorDynamicRouterAuth = (data) => {
//   return new Promise((resolve) => {
//     const resNav = data
//     const menuNav = [] as any[]
//     const childrenNav = list2tree(resNav, 0)
//     /**
//      * 增加静态网页
//      */
//     rootRouter.children = childrenNav
//     menuNav.push(rootRouter)
//     if (
//       routerGenerator(menuNav) &&
//       routerGenerator(menuNav)[0] &&
//       routerGenerator(menuNav)[0].children
//     ) {
//       const routers = routerGenerator(menuNav)[0].children
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>.', routerGenerator(menuNav))

//       resolve(routers)
//     } else {
//       return
//     }
//   }).catch((err) => {
//     // reject('加载菜单失败')
//     return Promise.reject(err)
//   })
// }

// /**
//  * 格式化树形结构数据 生成 vue-router 层级路由表
//  *
//  * @param routerMap
//  * @param parent
//  * @returns {*}
//  */
// export const generator = (routerMap, parent: any = {}) => {
//   return routerMap.map((item) => {
//     // eslint-disable-next-line no-unused-vars
//     const { title, show, hideChildren, hiddenHeaderContent, target, icon, link } = item.meta || {}
//     const currentRouter = {
//       // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
//       path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
//       // 路由名称，建议唯一
//       name: item.name || item.key || '',
//       // 该路由对应页面的 组件 :方案1
//       // component: constantRouterComponents[item.component || item.key],
//       // 该路由对应页面的 组件 :方案2 (动态加载)
//       component:
//         constantRouterComponents[item.component || item.key] ||
//         (() => import(`@/views/${item.component}`)),
//       // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
//       meta: {
//         title: title,
//         icon: icon || undefined,
//         // hiddenHeaderContent: hiddenHeaderContent,
//         target: target,
//         link: link
//       }
//     }
//     // 是否设置了隐藏菜单
//     if (show === false) {
//       currentRouter.hidden = true
//     }
//     // 是否设置了隐藏子菜单
//     if (hideChildren) {
//       currentRouter.hideChildrenInMenu = true
//     }
//     // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
//     if (!currentRouter.path.startsWith('http')) {
//       currentRouter.path = currentRouter.path.replace('//', '/')
//     }
//     // 重定向
//     item.redirect && (currentRouter.redirect = item.redirect)
//     // 是否有子菜单，并递归处理
//     if (item.children && item.children.length > 0) {
//       // Recursion
//       currentRouter.children = generator(item.children, currentRouter)
//     }
//     return currentRouter
//   })
// }
