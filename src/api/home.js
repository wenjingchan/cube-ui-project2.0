import axios from '@/utils/ajaxRequest.js'
//为什么要引入store，因为他不是页面组件，没有父组件给其this.$store传值，所以this.$store没有值
import store from '@/store'

//提供一个方法以供调用
const fetchCategory = () =>{
  return axios.request({
    url:'/category'
  });//返回axios实例(promise对象)
}


const fetchSlide = () =>{
  return axios.request({
    url:'/slide'
  });//返回axios实例(promise对象)
}



const fetchLessons = (size, offset) =>{
  // console.log(this)//this 为undefined
  return axios.request({
    url:`/lessonList/${store.state.home.currentCagetory}?size=${size}&offset=${offset}`
  });//返回axios实例(promise对象)
}


export {fetchCategory,fetchSlide,fetchLessons}
