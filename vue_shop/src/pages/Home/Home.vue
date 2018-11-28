<template>
  <div>
    <section class="msite">
      <!--将静态地址信息换成异步获取的地址数据 注意:title为绑定数据-->
      <HeaderTop :title="address.name">
          <span class="header_search" slot="search">
            <i class="iconfont icon-sousuo"></i>
          </span>
        <router-link class="header_login" slot="login" :to="userInfo._id ? '/userInfo':'/login'">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
          <!--如果已经登录则显示一个icon-->
           <span class="header_login_text" v-else>
		         <i class="iconfont icon-gerenyonghutouxiang2"></i>
	        </span>
        </router-link>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(pages,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(data,index) in pages" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+data.image_url">
                </div>
                <span>{{data.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <!--使用svg显示页面加载中提示界面-->
        <img src="./images/msite_back.svg" v-else/>
      </nav>

      <!--首页附近商家-->
      <div class="msite_shop_list">
        <Notice :items="items"></Notice>
        <div class="shop_header">
          <i class="iconfont icon-dizhi"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList></ShopList>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import Notice from '../../components/Notice/Notice'

  export default {
    data() {
      return {
        // 因为食品分类的图片信息都有一个baseImageUrl所以在data里定义
        baseImageUrl: 'https://fuss10.elemecdn.com',
        items:[
          {name:"精品营养粥,8折优惠"},
          {name:"今日特价:鱼香肉丝,酸菜鱼"},
          {name:"本公司即日起为了回馈新老用户,冲100送50本公司即日起为了回馈新老用户,冲100送50"}
        ]
      }
    },
    mounted() {
      this.$store.dispatch('getCategorys')//获取食品分类数组
      this.$store.dispatch('getShops')//获取食品分类数组

    },

    computed: {
      //通过mapState语法糖来读取获取到的异步数据
      ...mapState(['address', 'categorys','userInfo']),
      //由于页面需要的是一个二位数组格式的数据结构,而我们目前得到的数据是一个一维数组,所以我们需要将获取到的数据转换成二维数组
      categorysArr() {
        // 1.先从当前组件中得到所有食品分类的一维数组
        const {categorys} = this
        // 2.准备一个空的二维数组--categorysArr
        const arr = [];
        //3,准备一个小数组,最大长度为8
        let minArr = [];
        //4.遍历的到的数组处理成我们要的二维数组
        categorys.forEach(c => {
          //如果当前小数组已经满了,就创建一个新的数组
          if (minArr.length === 8) {
            minArr = [];
          }
          //如果小数组的长度为0就把小数组添加到大数组中
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          // 将当前分类信息保存到小数组(pages)中
          minArr.push(c)
        })
        //返回二维数组
        return arr;
      }

    },
    //分页器Swiper其实应该是在轮播列表显示(即categorys数组有了数据)以后才初始化。
    //最开始categorys为空数组，有了数据才会显示轮播列表，而要监视categorys的数据变化，就要用到watch。
    // 新建watch 监听categorys
    watch: {//监视categorys
      categorys(value) { // categorys数组中有数据了
        // 但界面还没有异步更新,可以使用定时器但是时机不准确
        //利用vm.$nextTick( [callback] )来实现等待界面完成异步更新就立即创建Swiper对象
        this.$nextTick(() => {
          //创建一个人Swiper实例对象
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        });
      }
    },
    components: {
      HeaderTop,//映射成标签
      ShopList,
      Notice//公告组件
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
