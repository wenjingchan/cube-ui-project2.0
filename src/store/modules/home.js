import {fetchCategory,fetchSlide} from '@/api/home.js'
import * as types from '@/utils/actions-type'
export default {
  namespaced:true, //命名空间
  state:{
    categories:[],
    currentCagetory:-1,
    slide:[]
  },
  mutations:{
    [types.SET_CATEGORIES](state, payload){
      state.categories = payload
      // console.log(state.categories)
    },
    [types.SET_CURRENT_LESSON](state,payload) {
      state.currentCagetory = payload;
    },
    [types.SET_SLIDE](state,payload) {
      state.slide = payload;
    }
  },
  actions:{
    async [types.SET_CATEGORIES]({commit}){
      try {
        let categories = await fetchCategory();//等待起返回promise对象
        // console.log(categories);
        commit(types.SET_CATEGORIES,categories);
      } catch (e) {
        console.log(e);
      }
      
    },
    async [types.SET_SLIDE]({commit}){
      try {
        let slide = await fetchSlide();//等待起返回promise对象
        // console.log(categories);
        commit(types.SET_SLIDE,slide);
      } catch (e) {
        console.log(e);
      } 
    },
    
  }
}