// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './filters/index'//加载过滤器
//加载mockServer
import './mock/mockServer'
import loading from "./common/imgs/loading.gif";

//使用VueLazyload
Vue.use(VueLazyload)

Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})
Vue.config.productionTip = false
//注册全局组件
Vue.component(Button.name,Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store//使用上vuex,在项目中注册store
})
