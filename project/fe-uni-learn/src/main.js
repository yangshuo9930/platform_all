import Vue from 'vue'
import App from './App'
import http from '@/utils/http' // 导入 http.js 模块
import { showErrorMessage } from '@/utils/tools'

Vue.config.productionTip = false

App.mpType = 'app'

// 挂载到 Vue.prototype
Vue.prototype.$http = http
Vue.prototype.$errmsg = showErrorMessage

const app = new Vue({
  ...App
})
app.$mount()
