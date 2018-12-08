import Vue from 'vue'
import Router from 'vue-router'
/*import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'*/
// router/index.js文件中 改变引入方式 实现路由组件懒加载
const Home=()=>import('../pages/Home/Home')
const Search=()=>import('../pages/Search/Search')
const Order=()=>import('../pages/Order/Order')
const Profile=()=>import('../pages/Profile/Profile')
// 此时的Home等都是返回路由组件的函数，只有请求对应的路由路径时(第一次)才会执行此函数并加载路由组件
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
/*路由组件懒加载
我们写的所有Js文件最后都会打包成一个文件，而我们实际的需求是路由组件并不是一次全部加载过来，
而是按需加载。所以就要在打包前就对代码进行分割，从而实现路由组件懒加载。*/
Vue.use(Router)

export default new Router({
  //去掉地址中的哈希#
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home',
  },
    {
      path: '/home',
      component: Home,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/shop',
      component: Shop,
      children:[//子路由
        {
          path: '/shop/goods',
          component: ShopGoods,
        },
        {
          path: '/shop/rating',
          component: ShopRating,
        },
        {
          path: '/shop/info',
          component: ShopInfo,
        },
        {
          path: '',
          redirect: '/shop/goods',//默认显示
        }
      ]
    },
  ]
})

