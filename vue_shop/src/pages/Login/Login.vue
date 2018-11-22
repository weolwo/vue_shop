<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">七猫外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on :loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on :!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on :loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone :rightPhone}"
                      @click.prevent="getCode">
                {{computeTime>0 ? `${computeTime}S已发送` :'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on :!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="showPwd ? 'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right :showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:8080/captcha" alt="captcha" ref="captcha"
                     @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <AlertTip :alertText="AlertText" v-show="AlertShow" @closeTip="closeTip"></AlertTip>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-fanhui1"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqPwdLogin, reqSmsLogin, reqSendCode} from '../../api'

  export default {
    data() {

      return {
        loginWay: true,//true代表短信登录,false代表用户名登录
        phone: '',//手机号
        showPwd: false,//是否显示密码
        computeTime: 0,
        code: '',//手机验证码
        captcha: '',//图形验证码
        name: '',//登录名
        pwd: '',
        AlertText: '',//提示文本信息
        AlertShow: false//是否显示提示框
      }
    },
    computed: {
      rightPhone() {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
      }
    },
    methods: {
      async getCode() {
        if (this.computeTime <= 0) {
          this.computeTime = 30;
          this.interval = window.setInterval(() => {
            this.computeTime--
            if (this.computeTime <= 0) {
              clearInterval(this.interval)
            }
          }, 1000)
        }
        //发送axja请求一次性验证码
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          //显示提示
          this.showAlert(result.msg)
          if (this.computeTime > 0) {
            //清楚定时器
            this.computeTime = 0;
            clearInterval(this.interval)
            this.interval = undefined;//非必要的
          }
        }

      },

      showAlert(AlertText) {
        this.AlertShow = true;
        this.AlertText = AlertText;
      },

      async login() {
        let result
        if (this.loginWay) {//true代表短信登录
          const {rightPhone, phone, code} = this;
          //校验手机号是否正确
          if (!this.rightPhone) {
            this.showAlert('手机号不正确')
            return;
          } else if (!/^\d{6}$/.test(code)) {//必须是6为数字
            this.showAlert('验证码不正确')
            return;
          }
          //发送异步ajax请求登录
          result = await reqSmsLogin(phone, code)

        } else {//false代表用户名登录
          const {name, pwd, captcha} = this;
          if (!this.name) {
            this.showAlert('用户名或密码不正确')
            return;
          } else if (!this.pwd) {
            this.showAlert('用户名或密码不正确')
            return;
          } else if (!this.captcha) {
            this.showAlert('验证码不正确')
            return;
          }
          result = await reqPwdLogin({name, pwd, captcha})
        }
        //清除定时器
        if (this.computeTime > 0) {
          //清楚定时器
          this.computeTime = 0;
          clearInterval(this.interval)
          this.interval = undefined;//非必要的
        }

        if (result.code=== 0) {//如果成功
          //保存用户到state
          const user=result.data;
          //跳转到首页
          this.$router.replace('/home')//不需要返回之前的页面
        } else {//失败
            //显示新的图片验证码
          this.getCaptcha();
          //提示警告信息
          const msg=result.msg;
          this.showAlert(msg);
        }
      },
      //关闭警告框
      closeTip() {
        this.AlertShow = false;
        this.AlertText = '';
      },
      //获取一次性图形验证码
      getCaptcha() {
        this.$refs.captcha.src = 'http://localhost:8080/captcha?time=' + Date.now()
      }
    },
    components: {
      AlertTip
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        > form
          > div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
    .login_verification
      position relative
      margin-top 16px
      height 48px
      font-size 14px
      background #fff
      .switch_button
        font-size 12px
        border 1px solid #ddd
        border-radius 8px
        transition background-color .3s, border-color .3s
        padding 0 6px
        width 30px
        height 16px
        line-height 16px
        color #fff
        position absolute
        top 50%
        right 10px
        transform translateY(-50%)
        &.off
          background #fff
          .switch_text
            float right
            color #ddd
        &.on
          background #02a774
        > .switch_circle
          //transform translateX(27px)
          position absolute
          top -1px
          left -1px
          width 16px
          height 16px
          border 1px solid #ddd
          border-radius 50%
          background #fff
          box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
          transition transform .3s
          &.right
            transform translateX(30px)
    .login_hint
      margin-top 12px
      color #999
      font-size 14px
      line-height 20px
      > a
        color #02a774
    .login_submit
      display block
      width 100%
      height 42px
      margin-top 30px
      border-radius 4px
      background #4cd96f
      color #fff
      text-align center
      font-size 16px
      line-height 42px
      border 0
    .about_us
      display block
      font-size 12px
      margin-top 20px
      text-align center
      color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      > .iconfont
        font-size 20px
        color #999
</style>
