import { App } from 'vue'
/**
 * 注册全局方法 待完善
 * @param app
 */
export interface GlobalApp extends App {
  $ls?: string
}
export function setupGlobalMethods(app: GlobalApp) {
  app.$ls = '测试全局方法ls'
}
