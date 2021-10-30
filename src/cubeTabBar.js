export default {
  data () {
    return {
      selectedLabelDefault: '/',
      tabs: [{
        label: 'Home',
        value:'/',
        icon: 'cubeic-home'
      }, {
        label: '我的课程',
        value:'/course',
        icon: 'cubeic-like'
      }, {
        label: '个人中心',
        value:'/profile',
        icon: 'cubeic-vip'
      }]
    }
  },
  methods: {
    clickHandler (value) {
      //this.$router.push相当于<router-link>
      this.$router.push({
        path:value
      })
      // if you clicked home tab, then print 'Home'
      // console.log(value)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
}