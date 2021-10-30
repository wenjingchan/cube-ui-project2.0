import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/home.vue';
import loadable from  '@/utils/routeAsync.js'
import hooks from './hooks'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      index:0,
      needLogin:false
    }
  },
  {
    path: '/course',
    //为组件加载添加loading动画
    component: loadable(() => import('@/views/Course/course.vue')),
    meta:{
      index:1,
      needLogin:true
    }
  },
  {
    path: '/profile',
     //为组件加载添加loading动画
    component: loadable(() => import('@/views/Profile/profile.vue')),
    meta:{
      index:2,
      needLogin:true
    }
  },
  {
    path: '/login',
     //为组件加载添加loading动画
    component: loadable(() => import('@/views/Login/login.vue')),
    meta:{
      index:3
    }
  },
  {
    path: '*',
     //为组件加载添加loading动画
    component: {
      render(h){
        return <h1>找不到</h1>
      }
    },
    meta:{
      index:3
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


//hooks只取方法体
Object.values(hooks).forEach(hook => {
  //定义全局导航路由
  router.beforeEach(hook)
})

export default router;


//路由切换时，取消前路由页面的请求（axios.cancelToken）