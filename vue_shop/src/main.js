// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
//加载mockServer
import './mock/mockServer'

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
