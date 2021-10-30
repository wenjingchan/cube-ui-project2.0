import Vue from 'vue'
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible'
import filter from '@/utils/filters'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');


//添加全局过滤器
Object.keys(filter).forEach(key =>{
  Vue.filter(key, filter[key]);
})
