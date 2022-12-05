import { defineStore } from 'pinia'
import { createStorage } from '@monorepo/utils'
import { store } from '@/store'
import { CURRENT_USER, IS_LOCKSCREEN } from '@monorepo/config/fe-v3-naive/cacheSetting'
import { TOKEN_KEY as ACCESS_TOKEN } from '@monorepo/config/fe-v3-naive/cacheSetting'
import { ResultEnum } from '@/enums/httpEnum'
import { getUserInfo, login } from '@/api/mock/system/user'
import { storage } from '@monorepo/utils'
// import { useGlobSetting } from '@/hooks/setting/index'
// import { useTabsViewStore } from './tabsView'

const Storage = createStorage({ storage: localStorage })
// const globSetting = useGlobSetting()
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
    async login(userInfo) {
      try {
        const response = await login(userInfo)
        console.log('response', response)

        const { data: result, code } = response
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000
          storage.set(ACCESS_TOKEN, result.token, ex)
          storage.set(CURRENT_USER, result, ex)
          storage.set(IS_LOCKSCREEN, false)
          this.setToken(result.token)
          this.setUserInfo(result)
        }
        return Promise.resolve(response)
      } catch (e) {
        return Promise.reject(e)
      }
    },

    // 获取用户信息
    GetInfo() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const result = res
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions
              that.setPermissions(permissionsList)
              that.setUserInfo(result)
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'))
            }
            that.setAvatar(result.avatar)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    async logout() {
      this.setPermissions([])
      this.setUserInfo('')
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
      return Promise.resolve('')
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
