const path = require('path')
const externals = require('./src/externals')
module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@root': path.join(__dirname)
      }
    },
    // 大部分依赖库外置，无需打包，减小体积。
    externals: process.env.NODE_ENV === 'production' ? externals : {}
  }
}
