<template>
  <div class="hello">
    {{aa}}
    
  </div>
</template>

<script>
import tool from '@/assets/js/tool'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      aa:'哈哈'
    }
  },
  mounted(){
    console.log(tool.relativeTimeFormat('Fri Oct 06 09:37:46 CST 2018'))
  }

}
</script>

<style scoped lang="stylus">

</style>
