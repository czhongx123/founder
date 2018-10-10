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
    var arr=['sd','a','df','sc']
    var a=tool.ArrSort(arr,true,false)
   
     console.log(a,'a')
    
  }

}
</script>

<style scoped lang="stylus">

</style>
