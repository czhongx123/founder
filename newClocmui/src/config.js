// 导入npm包配置文件，以便从中获取信息。
const npmPackage = require('../package.json')
// 外置依赖
const externals = require('./externals')

// 配置模块中所使用的常量
const _env = {
  development: {
    API_BASE: 'http://localhost:8081',
  },
  production: {
    API_BASE: 'http://qingjin.me'
  },
  test42: {
    API_BASE: 'http://test42.com'
  },
  test43: {
    API_BASE: 'http://test43.com'
  }
}

const env = _env[process.env.VUE_APP_MODE]
const name = npmPackage.name
const version = npmPackage.version
const author = npmPackage.author

// 导出模块config，在其它地方使用。
export {
  name,
  version,
  author,
  env,
  externals
}