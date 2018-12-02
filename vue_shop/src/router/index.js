import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

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

