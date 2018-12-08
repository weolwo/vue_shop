/**
 * vuex 的 mutations 模块
 */

import {
  RECEVIE_ADDRESS,
  RECEVIE_CATEGORYS,
  RECEVIE_SHOPS,
  RECEVIE_USERINFO,
  RESET_USER_INFO,
  RECEVIE_RATINGS,
  RECEVIE_INFO,
  RECEVIE_GOODS,
  INCRIMENT_FOOD_COUNT,
  DECRIMENT_FOOD_COUNT,
  CLEAR_CART,
  SEARCH_SHOP_LIST
} from './mutation -types'
import Vue from 'vue'
// 格式:[方法名](state,{param}){}
export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [RECEVIE_ADDRESS](state, {address}) {
    state.address = address;
  },
  [RECEVIE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys;
  },
  [RECEVIE_SHOPS](state, {shops}) {
    state.shops = shops;
  },
  [RECEVIE_USERINFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },
  //重置用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },
  //跟新商家信息
  [RECEVIE_INFO](state,{info}) {
    state.info = info;
  },
  //重置用户信息
  [RECEVIE_GOODS](state,{goods}) {
    state.goods = goods;
  },
  //重置用户信息
  [RECEVIE_RATINGS](state,{ratings}) {
    state.ratings = ratings;
  },

  [INCRIMENT_FOOD_COUNT](state,{food}) {
   if (!food.count){//第一次增加
     //food.count=1// 这样新增的属性没有数据绑定
     Vue.set(food,'count',1)
     //将food添加到购物车中
     state.cartFoods.push(food);
   } else {
     food.count++
   }
  },
  [DECRIMENT_FOOD_COUNT](state,{food}) {
    if (food.count){ // 只有有值才去减
      food.count--
    }
    if (food.count===0){
      //将food从购物车中移除
      state.cartFoods.splice(state.cartFoods.indexOf(food),1)//获取到food在cartFoods中的索引
    }
  },
  [CLEAR_CART](state) {
    //清楚food中的count
      this.state.cartFoods.forEach(food=>food.count=0)
    //清空购物车
    this.state.cartFoods=[]
  },

  [SEARCH_SHOP_LIST](state,{searchShops}) {
    state.searchShops = searchShops;
  },
}
