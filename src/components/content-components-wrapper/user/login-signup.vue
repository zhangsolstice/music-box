<template lang="pug">
  div(
    :class='["login-signup"]'
  )
    section(
      :class='["login"]'
    )
      form(
        :class='["login-form"]'
      )
        select(
          :class='["login-countrycode"]'
          v-model='loginCountryCodeValue'
        )
          option(
            v-for='(countryCode, k) of countryCodes'
            :key='countryCode.code'
            :value='countryCode.code'
          ) {{ countryCode.code }} - {{ countryCode.country }}
        label(
          for='login-username'
          :class='["login-username"]'
        )
          span 手机号码
          input(
            id='login-username'
            type='text'
            v-model.number='loginUsernameValue'
          )
          span {{ checkLoginUsernameValue }}
        label(
          for='login-password'
          :class='["login-password"]'
        )
          span 密码
          input(
            id='login-password'
            type='password'
            v-model='loginPasswordValue'
          )
        label(
          for='login-submit'
          :class='["login-submit"]'
        )
          input(
            id='login-submit'
            type='button'
            value='登录'
            @click='loginSubmit'
          )
        span {{ getLoginErrInfo }}
</template>

<script>
import { mapGetters } from 'vuex'
import { countryCodes } from './country-codes.js'

export default {
  components: {

  },
  data () {
    return {
      loginCountryCodeValue: '+86',
      loginUsernameValue: '',
      loginPasswordValue: '',
      countryCodes: countryCodes()
    }
  },
  computed: {
    checkLoginUsernameValue () {
      if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.loginUsernameValue))) {
        return '请输入正确的手机号码'
      }
      return ''
    },
    ...mapGetters([
      'getLoginErrInfo'
    ])
  },
  methods: {
    loginSubmit () {
      (async () => {
        await this.$store.dispatch('updateLoginStatus', {
          phone: this.loginUsernameValue,
          password: this.loginPasswordValue,
          countryCode: this.loginCountryCodeValue.slice(1)
        })
        await this.$router.push('/')
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login-signup
    display flex
    align-items center
    width 100%
    height calc(100vh - 50px)
    font-size .14rem
    font-weight bold
    color #eee
    text-shadow 1px 1px 1px #333
  .login
    width 3.2rem
    margin auto
  .login-form
  .login-username
  .login-password
    display block
    margin-bottom 5px
    width 100%
    &>span
      display block
      margin-bottom 5px
  .login-countrycode
  .login-username>input
  .login-password>input
  .login-submit>input
    width 100%
    height .3rem
    font-size 12px
    font-weight bold
    color #eee
    background-color transparent
    border 1px solid #eee
    border-radius 6px
    cursor pointer
</style>
