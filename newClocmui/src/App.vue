<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import moduleConfig from '@root/package.json'
export default {
  name: 'App',
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  beforeCreate () {
    // 启动工程后自动导航到模块首页
    if (this.$route.path === '/') {
      this.$router.push(`/${moduleConfig.name}`)
    }
  }
}
</script>
<style lang="stylus">
html, body, #app
  height 100%
</style>

