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
    var arr='s'
    var a=tool.curDayEndTime()
   
     console.log(a,'a')

  },
  methods:{
       
  }

}
</script>

<style scoped lang="stylus">

</style>
