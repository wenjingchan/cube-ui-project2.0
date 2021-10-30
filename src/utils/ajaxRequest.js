import axios from 'axios'
import  {Toast} from 'cube-ui'
import store from '@/store'
import * as types from '@/utils/actions-type'

class AjaxRequest {
  constructor(){
    //开发的时候请求的路径上是localhost，生产上市http://XXXX
    this.baseURL = process.env.NODE_EVN !== 'production' ? "http://localhost:3000/api" : "/";
    this.timeout = 3000;
    this.toast = Toast.$create({
      time: 0,
      txt: '加载中ing'
    });
    this.queue = {};
  }
  request(options){
    let instance = axios.create();
    //创建axios实例需要用到的实例参数
    let config = {
      ...options,
      baseURL:this.baseURL,
      timeout: this.timeout
    };
    this.setInterceptor(instance,options.url);
    //添加拦截
    return instance(config);
  }
  setInterceptor(instance,url){
    //请求拦截
    instance.interceptors.request.use(config =>{
      // console.log("请求拦截");
      // console.log(config);

      // this.toast.show();

      //给每个请求都加一个取消请求的方法,每一个取消方法都是axios.CancelToken的实例
      let CancelToken = axios.CancelToken;
      config.cancelToken = new CancelToken(function(c){
        //参数c就是就是该请求的取消方法，相当于xhr.abort
        //把c方法保存起来，以后调用 ，保存到vuex中
          store.commit(types.PUSH_CANCEL, c);

      })

      config.headers.token = localStorage.getItem('token')

      //如果有很多请求，也只显示一次加载中.给实例绑定一个queue属性，把所有的url都添加到这个属性中
      if(Object.keys(this.queue).length == 0) {
        this.toast.show();
      }
      this.queue[url] = url;
      return config;
    },err => {
      return Promise.reject(err);
    });
    //响应拦截
    instance.interceptors.response.use(response =>{
      // console.log("响应拦截");
      // console.log(response);
      delete this.queue[url];
      if(Object.keys(this.queue).length == 0) {
        this.toast.hide();
      }
      if (response.data.code == 0) {
        //为了看加载中的效果加个定时器，但是不能直接假，要返回promise对象
        return new Promise((resolve,reject) =>{
          setTimeout(() =>{
            // this.toast.hide();
            resolve(response.data.data);
          },3000);
        })
      } else {
        return Promise.reject(response.data.data)
      }
    },err => {
      delete this.queue[url];
      if(Object.keys(this.queue).length == 0) {
        this.toast.hide();
      }
      // console.log("err:"+err)
      return Promise.reject(err);
    });
  }
}

export default new AjaxRequest();

//直接调用new AjaxRequest().request()