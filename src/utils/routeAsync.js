
import LoadComponent from '@/components/loading.vue'
const loadable = (asynsFunction) =>{
  // console.log(asynsFunction);
  const asyncComponent = () => ({
    component: asynsFunction(),
    loading: LoadComponent
  });
  //最终要返回一个组件，组件是一个对象，对象里面要么有template要么有render方法
  return {
    render(h) {
      //h就是createElement方法
      return h(asyncComponent);
    }
  }
}
export default loadable;