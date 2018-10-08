/**
 * 打包的入口文件，不可修改。
 */
import { name, dependencies } from '@root/package.json'
import storeModule from '@/store/storeModule'
import routes from '@/router/routes'
import api from '@/api'
import { externals } from '@/config'
// 从package的依赖清单中删除外部依赖，得到内部依赖。
const getInternals = () => {
  let internals = { ...dependencies }
  for (let exterKey in externals) {
    if (internals[exterKey]) {
      delete internals[exterKey]
    }
  }
  return internals
}
export default {
  name,
  api,
  storeModule,
  routes,
  dependencies: {
    externals: externals,
    internals: getInternals()
  }
}
