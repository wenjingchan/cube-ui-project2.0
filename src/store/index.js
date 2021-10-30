import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home.js'
import * as types from '@/utils/actions-type'
import userAjax from '@/api/user.js'

import  {Toast} from 'cube-ui'


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    home
  },
  state:{
    cancelTokensArr:[],
    user:{},
    hasPermission:false//是否已登陆
  },
  mutations:{
    [types.PUSH_CANCEL](state,payload){
      // state.cancelTokensArr.push(payload);
      state.cancelTokensArr = [...state.cancelTokensArr,payload]
    },
    [types.CLEAR_CANCEL](state){
      //一个个去执行前路由的取消请求方法
      state.cancelTokensArr.forEach(cancel => cancel());
      state.cancelTokensArr = []
    },
    [types.LOGIN](state, user){
      state.user = user;
      state.hasPermission = true;
    },
    [types.UPLOAD](state, url){
      state.user.url = url;
    }
  },
  actions:{
    async [types.LOGIN]({commit}, user){
      try {
        let loginUser = await userAjax.login(user)
        commit(types.LOGIN,loginUser)
        localStorage.setItem("token",loginUser.token)
      } catch (e) {
        
        Toast.$create({
          txt:"用户名或密码错误",
          time:2000
        }).show();
        return new Promise((resolve,reject)=>{
          reject(e);
        })
      }
     
    },
    async [types.VALIDATE]({commit}){
      try {
        let loginUser = await userAjax.validate();
        commit(types.LOGIN,loginUser)
        return true;
        
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async [types.UPLOAD]({commit},payload){
      try {
        let {url} = await userAjax.upload(payload);
        commit(types.UPLOAD,url)
        
      } catch (e) {
        console.log(e);
      }
    }
  }
});
