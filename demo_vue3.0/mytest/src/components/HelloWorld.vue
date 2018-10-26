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
   

    var a=tool.removeHTMLTag("<a>222<span>ss</span></a>")
   
    this.aa=a

  },
  methods:{
       
  }

}
</script>

<style scoped lang="stylus">

</style>
