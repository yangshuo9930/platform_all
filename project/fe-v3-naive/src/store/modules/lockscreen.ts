import { defineStore } from 'pinia'
import { IS_LOCKSCREEN, LOCK_PWD } from '@monorepo/config/fe-v3-naive/cacheSetting'
import { storage } from '@monorepo/utils'

// 长时间不操作默认锁屏时间
const initTime = 60 * 60

const isLock = storage.get(IS_LOCKSCREEN, false)
const lockPassword = storage.get(LOCK_PWD, '')

export type ILockscreenState = {
  isLock: boolean // 是否锁屏
  lockTime: number
  lockPassword: any // 锁屏密码
}

export const useLockscreenStore = defineStore({
  id: 'app-lockscreen',
  state: (): ILockscreenState => ({
    isLock: isLock === true, // 是否锁屏
    lockTime: isLock == 'true' ? initTime : 0,
    lockPassword: lockPassword
  }),
  getters: {},
  actions: {
    setLock(payload) {
      this.isLock = payload
      storage.set(IS_LOCKSCREEN, this.isLock)
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload
    },
    setLockPassword(pwd) {
      this.lockPassword = pwd
      storage.set(LOCK_PWD, pwd)
    }
  }
})
