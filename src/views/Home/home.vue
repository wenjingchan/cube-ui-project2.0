<template>
  <div class="home">
    <HomeHeader :categories="categories" @change="selectCategory"></HomeHeader>
    <div class="slide-wrapper">
        <cube-slide :data="slide"/>
    </div>
    <div class="view-wrapper">
        <!-- <img :src="imgUrl"> -->
        <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset" ref="recycleList">
          <template slot="item" slot-scope="{ data }">
            <div :id="data.id" class="item">
              <!-- {{data}} -->
              <p>{{data.title}}</p>
              <img :src="getImgUrl(data.pic)">
              <p>{{data.price | priceFormat('￥')}}</p>
            </div>
          </template>
        </cube-recycle-list>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/views/Home/HomeHeader.vue'

// import {mapActions,mapState} from 'vuex'
import {createNamespacedHelpers} from 'vuex'
let {mapActions,mapState,mapMutations } = createNamespacedHelpers("home");
import * as types from '@/utils/actions-type'
import {fetchLessons} from '@/api/home'

export default {
  components:{
    HomeHeader:HomeHeader
  },
  data(){
    return {
      size:5,
      offset:50,
      hasMore:true,
      offsetIndex:0,
      basURL:"http://localhost:8080"
    }
  },
  computed:{
    // ...mapState('home',['categories'])
    ...mapState(['categories','currentCategory','slide']),
  },
  mounted(){
    //加入命名空间，因为vuex会默认依次执行所有同名的方法
    // this.$store.dispatch("home/setCategory");
    this[types.SET_CATEGORIES]();
    // console.log(this.$store.state.home.categories);

    this[types.SET_SLIDE]();
    let urlTemp = "assets/images/lesson1.jpg";
    this.imgUrl = require("@/" + urlTemp);

    let timer;
    // console.log(this.$refs.recycleList)//组件
    this.$refs.recycleList.$el.addEventListener('scroll',e=>{
      //防抖（定时器）——只要停止滚动时的scrollTop；节流（时差）
      
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        // console.log(e.target.scrollTop)
        sessionStorage.setItem('scrollTop',e.target.scrollTop)
      },50)
    })
  },
  activated(){
    let scrollTop = sessionStorage.getItem('scrollTop') ? sessionStorage.getItem('scrollTop') : 0;
    this.$refs.recycleList.$el.scrollTop=scrollTop
  },
  methods:{
    //mapActions(['setCategory'])返回来的是一个对象
    // ...mapActions('home',['setCategory'])//有命名空间的写法，多个actions。mapActions(['setCategory'，'XXX'])
    ...mapActions([types.SET_CATEGORIES,types.SET_SLIDE]),
    ...mapMutations([types.SET_CURRENT_LESSON]),
    selectCategory(value){
      // console.log(value);
      this[types.SET_CURRENT_LESSON](value)
      this.hasMore=true;
      this.offsetIndex=0;
      this.$refs.recycleList.reset();//会清空列表然后调用onFetch
    },
    //抓取课程列表时要等待返回的promise对象
    // onFetch 函数必须返回一个 Promise，同时 Promise 的 resolve 函数的第一个参数必须是数组或者 false
    // 如果是数组并且长度小于 size，那么组件会停止无限滚动，同理，如果是 false，也会停止。
    async onFetch(){
      console.log("onfetch");
      if (this.hasMore) {
        try {
          let {result,hasMore} = await fetchLessons(this.size,this.offsetIndex);
          this.offsetIndex = this.offsetIndex + result.length
          //  console.log(this.offsetIndex)
          this.hasMore = hasMore;
          // console.log(result)
          return result;
        } catch (e) {
          console.log(e);
          return [];
        }
        
      } else {
        //已没有记录，不再抓取列表
        return false
      }
    },
    getImgUrl(imgName){
      return  `${this.basURL}/images/${imgName}` 
    }
  },
}
</script>

<style lang="stylus">
.home 
  height 100%
  img
    width 100%
.slide-wrapper
  width:100%
  max-width 100%
  height 150px
.view-wrapper 
  height calc(100vh - 260px)
  .item
    border 1px solid #9a9696
    display flex
    flex-direction column
    height 150px
    align-items  center
    margin 10px 0px
    img
      width 80%
      height 80%

</style>