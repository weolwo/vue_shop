<template>
  <div id="app">

    <!-- 设置路由组件的视图位置 -->
    <router-view></router-view>
    <!-- 并放置非路由组件 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {reqFoodCategorys} from './api'
  import {mapActions} from 'vuex'//2,这种方法调用action，还可以使用mapActions语法糖
  export default {

    mounted() {
      //const result = await reqFoodCategorys()
      //还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：
      //console.log(result)
      //this.$store.dispatch('getAddress')// 1,通过this.$store.dispatch 方法触发调用Action
      this.getAddress();
      this.getUserInfo()
    },

    methods:{
      ...mapActions(['getAddress','getUserInfo'])
    },
    components: {
      FooterGuide
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  // 整个应用组件的样式
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
