import type { RouteRecordRaw } from 'vue-router'
import { isNavigationFailure, Router } from 'vue-router'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { TOKEN_KEY as ACCESS_TOKEN } from '@monorepo/config/fe-v3-naive/cacheSetting'
import { storage } from '@monorepo/utils'
import { PageEnum } from '@/enums/pageEnum'
import { ErrorPageRoute } from '@/router/base'
import { useGlobSetting } from '@/hooks/setting'

type PageEnumKey = `${PageEnum}`

const LOGIN_PATH = PageEnum.BASE_LOGIN
const { project_title } = useGlobSetting()

const whitePathList: PageEnumKey[] = [LOGIN_PATH] // 不需要重定向的白名单列表

export function createRouterGuards(router: Router) {
  const userStore = useUserStoreWidthOut()

  const asyncRouteStore = useAsyncRouteStoreWidthOut()

  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null
    Loading && Loading.start()

    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME)
      return
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    const token = storage.get(ACCESS_TOKEN)

    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // 重定向到Login页面
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)

      // 重定向到登录页面
      // userStore.signinRedirect()
      return
    }

    // 如果有路由信息, 则可通行, 否则去获取用户信息和路由信息
    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next()
      return
    } else {
      // 获取用户信息, 补全用户权限信息, 跳转正确路由
      const userInfo = await userStore.GetInfo()
      const routes = await asyncRouteStore.generateRoutes(userInfo)
      // 动态添加可访问路由表
      routes.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw)
      })
    }

    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    asyncRouteStore.setDynamicAddedRoute(true)
    next(nextData)
    Loading && Loading.finish()
    return
  })

  router.afterEach((to, _, failure) => {
    // document.title = (to?.meta?.title as string) || document.title
    document.title = project_title
    if (isNavigationFailure(failure)) {
      //console.log('failed navigation', failure)
    }
    const asyncRouteStore = useAsyncRouteStoreWidthOut()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName)
      if (index != -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
    const Loading = window['$loading'] || null
    Loading && Loading.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
