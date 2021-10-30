<template>
  <div class="profile">
    <div class="profileContent" v-if="!user.username">
      <img src="@/assets/images/login.jpg">
      <cube-button @click="toLogin" primary >登录</cube-button>
    </div>
    <div class="profileContent" v-else>
      <img src="@/assets/images/login.jpg" @click="selectImage" v-if="!user.url">
      <img :src="user.url" @click="selectImage" v-else>
      <upload  ref="upload"></upload>
      <cube-button @click="toLogin">{{user.username}}</cube-button>
    </div>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import upload from '@/components/upload'
export default {
  components:{
    upload
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    toLogin(){
      // alert("去登录");
      this.$router.push('/login')
    },
    selectImage(){
      console.log(user.url)
      this.$refs.upload.show();
    }
  }
}
</script>

<style lang="stylus">
.profile
  height 100%
.profileContent
  text-align center
  background-color #f9e664
  img
    width 50%
    height 50%
    border-radius: 50%;
  .cube-btn.cube-btn-primary
    width 60%
    display inline-block
</style>