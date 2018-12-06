/**
 * vuex 的 getter 模块
 */
export default {
  //定义几个Getters来设置购物车的一些数据信息
  totalPrice(state) {
    return state.cartFoods.reduce((preValue, food) => preValue + food.count * food.price, 0);
  },
  //根据food中count的变化求总数
  totalCount(state) {
    return state.cartFoods.reduce((preValue, food) => preValue + food.count, 0);
  },
  positive(state) {
    return state.ratings.reduce((preValue, rating) => preValue + (rating.rateType === 0 ? 1 : 0), 0);//rating.rateType为0+1
  }
}
