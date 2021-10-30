<template>
  <div class="login">
    <div class="loginImg">
      <img src="@/assets/images/login.jpg">
    </div>
    <cube-form :model="model" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button primary type="submit">登录</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import * as types from '@/utils/actions-type'

export default {
  data(){
    return {
      validity: {},
      valid: undefined,
      model: {
        username: '',
        password:''
      },
      fields: [
        {
          type: 'input',
          modelKey: 'username',//与model里面的值对应
          label: '用户名',
          props: {
            placeholder: '请输入用户名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'password',
          label: '密码',
          props: {
            placeholder: '请输入密码',
             type: 'password'
          },
          rules: {
            required: true
          },
          messages: {
            required: '请输入密码'
          }
        }
      ]
    }
  },
  methods:{
    async submitHandler(e){
      e.preventDefault();
      //调用store，在store中的action中获取，把用户信息存到vuex中
      try {
        //await等到promise结果，一旦promise出错则不继续往下执行
        await this.$store.dispatch(types.LOGIN,this.model);

        this.$router.push('/')
      } catch(e) {
        console.log(e);
      }
      
      // console.log(this.model);
    }
  }
  
}
</script>

<style lang="stylus">
.loginImg
  text-align center
  img
    width: 50%;
    height: 50%;
    border-radius: 50%;
</style>