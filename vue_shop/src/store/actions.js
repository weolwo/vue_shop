/**
 * vuex 的 actions 模块
 * Action:通过操作mutation间接更新state的多个方法的对象
 */
// 注意要引入api接口函数
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings
} from '../api'
import {
  RECEVIE_ADDRESS,
  RECEVIE_CATEGORYS,
  RECEVIE_SHOPS,
  RECEVIE_USERINFO,
  RESET_USER_INFO,
  RECEVIE_INFO,
  RECEVIE_GOODS,
  RECEVIE_RATINGS,
  INCRIMENT_FOOD_COUNT,
  DECRIMENT_FOOD_COUNT,
  CLEAR_CART,
  SEARCH_SHOP_LIST
} from './mutation -types'
import {reqSearchShop} from "../../../gshop-client/src/api";
import {RECEIVE_SEARCH_SHOPS} from "../../../gshop-client/src/store/mutation-types";

export default {
  // 假设 getData() 和 getOtherData() 返回的是 Promise
  //异步获取地址
  async getAddress({state, commit}) {
    // 从state状态中获取到经纬度用来设置reqAddress的参数（看接口文档
    const geohash = state.latitude + "," + state.longitude
    //发送ajax请求
    const result = await reqAddress(geohash);
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const address = result.data;
      commit(RECEVIE_ADDRESS, {address});
    }
  },
//异步获取分类数组
  async getCategorys({state, commit}) {

    //发送ajax请求
    const result = await reqFoodCategorys();
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const categorys = result.data;
      commit(RECEVIE_CATEGORYS, {categorys});
    }
  },
//异步获取商家数组
  async getShops({state, commit}) {
    // 从state状态中获取到经纬度用来设置reqAddress的参数（看接口文档
    const {longitude, latitude} = state;
    //发送ajax请求
    const result = await reqShops(longitude, latitude);
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const shops = result.data;
      commit(RECEVIE_SHOPS, {shops});
    }
  },
//同步记录用户信息,由于我们已经获取过了
  recordUser({commit}, userInfo) {
    commit(RECEVIE_USERINFO, {userInfo});
  },
  //异步获取用户登录信息
  async getUserInfo({commit}) {

    //发送ajax请求
    const result = await reqUserInfo();
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECEVIE_USERINFO, {userInfo});
    }
  },
  //异步获取用户登录信息
  async logout({commit}) {
    //发送ajax请求
    const result = await reqLogout();
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      commit(RESET_USER_INFO);
    }
  },
  //异步获取商家信息
  async getShopInfo({commit}) {
    //发送ajax请求
    const result = await reqShopInfo();
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const info = result.data;
      commit(RECEVIE_INFO, {info});
    }
  },

  //异步获取商品信息
  async getShopGoods({commit}, callback) {
    //发送ajax请求
    const result = await reqShopGoods();
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEVIE_GOODS, {goods});
      // 数据更新了, 通知一下组件
      callback && callback()//只有当有回调函数时才执行
    }
  },
  //异步获取评价信息
  async getShopRatings({commit},callback) {
    //发送ajax请求
    const result = await reqShopRatings();
    //如果返回结果正确,就提交一个mutation
    if (result.code === 0) {
      const ratings = result.data;
      commit(RECEVIE_RATINGS, {ratings});
      callback && callback()//只有当有回调函数时才执行
    }
  },
  //同步更新数据
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCRIMENT_FOOD_COUNT, {food});
    } else {
      commit(DECRIMENT_FOOD_COUNT, {food});
    }
  },
  //同步更新购物车数据
  clearCart({commit}) {
    commit(CLEAR_CART);
  },

  // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(SEARCH_SHOP_LIST, {searchShops})
    }
  },
}
