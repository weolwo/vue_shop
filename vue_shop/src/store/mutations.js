/**
 * vuex 的 mutations 模块
 */

import {RECEVIE_ADDRESS, RECEVIE_CATEGORYS, RECEVIE_SHOPS} from './mutation -types'

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
}
