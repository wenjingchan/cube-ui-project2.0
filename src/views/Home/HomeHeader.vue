<template>
  <div>
     <div class="header">
      <span>三文鱼课程</span>
      <span class="iconfont icon-liebiao" @click="showDrawer"></span>
    </div>
    <cube-drawer ref="drawer" title="请选择" :data="data" @select="selectHandler"></cube-drawer>
  </div>
 
  
</template>

<script>
export default {
  props:{
    categories:{
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      // data:[
      //   [
      //     {
      //       text:"aaa",
      //       value:1
      //     },
      //     {
      //       text:"aaa12",
      //       value:11
      //     },
      //     {
      //       text:"aaa2",
      //       value:12
      //     }
      //   ]
      // ]
      
    }
  },
  computed:{
    data(){
      let defaultData = [{text:"全部课程",value:-1}];
      if (this.categories.length > 0 ) {
        return [[...this.categories,...defaultData]];
      }else {
        return [defaultData];
      }
      
    }
  },
 methods:{
   showDrawer(){
     this.$refs.drawer.show();
   },
   selectHandler(value){
     this.$emit('change',value[0])
    //  console.log(value);
   }
 }
}
</script>

<style lang="stylus">
@import "../../assets/fonts/iconfont.css"
.header
  display flex
  justify-content space-between
  align-items center
  height 50px
  padding 0 10px
  background-color #eee
  .icon-liebiao
    // font-size 10px
</style>