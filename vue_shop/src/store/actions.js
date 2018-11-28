/**
 * vuex 的 actions 模块
 * Action:通过操作mutation间接更新state的多个方法的对象
 */
// 注意要引入api接口函数
import {reqAddress, reqFoodCategorys, reqShops,reqUserInfo} from '../api'
import {RECEVIE_ADDRESS, RECEVIE_CATEGORYS, RECEVIE_SHOPS, RECEVIE_USERINFO} from './mutation -types'

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
  recordUser({commit},userInfo) {
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

}
