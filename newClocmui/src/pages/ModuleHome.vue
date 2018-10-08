<!-- 模块主入口，将由web pack打包，承载本模块的所有数据 -->
<template>
  <div id="clkm"
       class="module-wrapper">
    <router-view></router-view>
  </div>
</template>
<script>
import '@/assets/js/iconfont'
export default {
  name: 'clkm',
  layout: 'dashboard',
}
</script>

<style lang="stylus">
#clkm
  &.module-wrapper
    height 100%
    background #fff

</style>
