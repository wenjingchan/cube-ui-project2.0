//存放路由的钩子函数 hook
import store from '@/store'
import * as types from '@/utils/actions-type'


//下面方法的方法没啥意义，只是为了区分各个方法的功能所以分开写
export default {
  clearCancel(to, from ,next){
    //路由切换时，一个个去执行前路由的取消请求方法
    
    store.commit(types.CLEAR_CANCEL);
    // console.log(1)
    next();//一定要调用，否则路由就中断了，且只能调用一次
  },
  permission(to, from ,next){
    //跳转页面之前查看该页面是否需要用户登录，
    //页面需要登录：（子路由不需要登录但是父路由需要登录，）
    // 1）是否已登录，如果已经登陆了，则跳转页面——用token去换取用户信息，如果有用户信息，则说明已经登陆2）没登陆 跳转登陆页面
    console.log(to);
    let needLogin = to.matched.some(route =>{
      return route.meta.needLogin
    })
    let flag = store.dispatch(types.VALIDATE);
    if (needLogin){ //页面需要登录
      if (!store.state.hasPermission) {//没登陆
        //有可能只是刷新了页面找不到vuex里面的用户记录，用token去校验是否有登陆过
        //如果有用户信息，服务器端返回code=0，axios拦截器会返回用户信息，store.dispatch([types.VALIDATE])会返回true
        
        if (flag) {
          next();
        } else {
          next('/login');//token已过期(服务器设置的过期时间)，无法获取用户信息
        }
      } else {
        //已经登陆了
        next();
      }
    } else {//页面不需要登录
      if (to.name=='login') {//跳转到登录页，则判断有没有登陆过
        if (flag) {
          next('/profile');
        } else {
          next();
        }
      } else {
        next();
      }
     
    }
   
  }
}