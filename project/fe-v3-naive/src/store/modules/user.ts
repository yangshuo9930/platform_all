import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER, REDIRECT_URL } from '@/store/mutation-types'
// import { ResultEnum } from '@/enums/httpEnum'
// import { getUserInfo, login } from '@/api/system/user'
import { storage } from '@/utils/Storage'
import { getLoginUser, logout, sysMenuChange } from '@/api/login/loginManage'
import { useGlobSetting } from '@/hooks/setting/index'
// import { useTabsViewStore } from './tabsView'

const Storage = createStorage({ storage: localStorage })
const globSetting = useGlobSetting()
// const tabsViewStore = useTabsViewStore()

export interface IUserState {
  token: string
  username: string
  avatar: string
  permissions: any[]
  info: any
  roleCodes: string[]
  button: string[]
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    avatar: '',
    permissions: [],
    info: Storage.get(CURRENT_USER, {}),
    roleCodes: [],
    button: []
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getAvatar(): string {
      return this.avatar
    },
    getNickname(): string {
      return this.username
    },
    getPermissions(): [any][] {
      return this.permissions
    },
    getUserInfo(): object {
      return this.info
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions) {
      this.permissions = permissions
    },
    setUserInfo(info) {
      this.info = info
    },
    // 登录
    // async login(userInfo) {
    //   try {
    //     const response = await login(userInfo)
    //     const { result, code } = response
    //     if (code === ResultEnum.SUCCESS) {
    //       const ex = 7 * 24 * 60 * 60 * 1000
    //       storage.set(ACCESS_TOKEN, result.token, ex)
    //       storage.set(CURRENT_USER, result, ex)
    //       storage.set(IS_LOCKSCREEN, false)
    //       this.setToken(result.token)
    //       this.setUserInfo(result)
    //     }
    //     return Promise.resolve(response)
    //   } catch (e) {
    //     return Promise.reject(e)
    //   }
    // },

    // 获取用户信息
    // GetInfo() {
    //   const that = this
    //   return new Promise((resolve, reject) => {
    //     getUserInfo()
    //       .then((res) => {
    //         const result = res
    //         if (result.permissions && result.permissions.length) {
    //           const permissionsList = result.permissions
    //           that.setPermissions(permissionsList)
    //           that.setUserInfo(result)
    //         } else {
    //           reject(new Error('getInfo: permissionsList must be a non-null array !'))
    //         }
    //         that.setAvatar(result.avatar)
    //         resolve(res)
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },

    // 登出
    // async logout() {
    //   this.setPermissions([])
    //   this.setUserInfo('')
    //   storage.remove(ACCESS_TOKEN)
    //   storage.remove(CURRENT_USER)
    //   return Promise.resolve('')
    // },

    /** 退出登录 */
    authLogout() {
      return new Promise((resolve) => {
        // 退出登录接口没有返回值
        storage.set(REDIRECT_URL, window.location.href)
        logout().finally(() => {
          // 清理token 清理用户信息
          this.$state = {} as any
          storage.remove(ACCESS_TOKEN)
          // 清理路由
          storage.remove(CURRENT_USER)
          resolve(true)
        })
      })
    },

    // 获取用户在统一验证平台的信息和权限
    getAuthInfo() {
      return new Promise((resolve) => {
        getLoginUser().then((res) => {
          this.username = res.name
          this.avatar = res.avatar
          this.roleCodes = res.roles.map((item) => item.code)
          this.info = res
        })
        // 用户的菜单信息
        sysMenuChange({ application: globSetting.project_code }).then((res) => {
          resolve(res)
        })
      })
    },

    /** 跳转到登录页面的函数 */
    signinRedirect() {
      const redirectPath = window.location.protocol + '//' + window.location.host
      const redirect = `${import.meta.env.VITE_AUTH_LOGIN_URL}?redirect=${redirectPath}/signin-oidc`
      window.location.href = redirect
    },

    /** 跳转登录 */
    async goAuthLogin() {
      if (!REDIRECT_URL.includes('signin-oidc')) {
        storage.set(REDIRECT_URL, window.location.href)
      }
      await this.authLogout()
      this.signinRedirect()
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
