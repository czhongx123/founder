
/**
 * 开发服务的入口文件，只在开发阶段有用，与打包远程模块无关。
 */
import Vue from 'vue'
import App from './App'
import Mate from 'vue-meta'

// 模块配置文件
import { name } from '@/config'

// 仅导出开发环境需要的路由,状态管理和API定义
import router from '@/router/'
import store from '@/store/'

// 导入api定义
import api from '@/api'

// 模块内部依赖
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
Vue.use(Mate)

// api以模块为对象添加到vue原型。
Vue.prototype.$api = {}
Vue.prototype.$api[name] = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')