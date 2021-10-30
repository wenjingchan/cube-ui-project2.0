<template>
  <div id="app">
    <div class="container">
      <transition :name="move">
        <!-- 路由切换的时候实现动画 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="footer">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/course">course</router-link> |
      <router-link to="/profile">profile</router-link> -->
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler">
      </cube-tab-bar>
    </div>
  </div>
</template>

<script>
import cubeTabBar from '@/cubeTabBar.js'
export default {
  mixins:[cubeTabBar],
  data(){
    return {
      move:"slide-left"
    }
  },
  watch:{
    $route:{
      handler(to,from){
        // console.log(to,from);
        this.selectedLabelDefault = to.path
        //路由切换时，比较to和from的index值，to比from搭则向左滑动，否则享有
        if (to && from) {
          this.move = to.meta.index>from.meta.index ? "slide-left" : "slide-right"
        }
      },
      immediate:true
    }
  },
 
}
</script>


<style lang="stylus">
html, body
  height 100%
#app
  display flex
  flex-direction column
  height 100%
.container
  flex 1
  // position relative
.footer
  // display flex
  // justify-content space-between

.slide-left-enter-active,.slide-left-leave-active,
.slide-right-enter-active,.slide-right-leave-active
  transition all 0.4s linear

.slide-left-enter-active,.slide-right-enter-active
  position absolute
  top 0px
  left 0px 
  width 100%
//终点状态路由可展示的那个位置，起始位置向右偏移，以达到有从右向左进入的感觉
.slide-left-enter,.slide-right-leave-to
  transform translateX(100%)
.slide-left-leave-to,.slide-right-enter
  transform translateX(-100%)
</style>
