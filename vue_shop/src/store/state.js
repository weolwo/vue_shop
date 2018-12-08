/**
 * 状态对象state
 */
//分析整理出项目首页Msite中有哪些状态需要管理，然后写入state.js
export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址相关信息对象
  categorys: [], // 食品分类数组
  shops: [],//商家数组
  userInfo:{},//用户信息
  info:{},//商家信息
  goods:[],//商品信息
  ratings:[],//评价信息
  cartFoods:[],//底部购物车信息
  searchShops:[]//搜素得到的商家
}
