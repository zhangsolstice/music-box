<template lang="pug">
  div(
    :class='["user"]'
  )
    LoginSignup(
      v-if='!getUserInfo.status'
    )
    UserInfo(
      v-if='getUserInfo.status'
    )
</template>

<script>
import { mapGetters } from 'vuex'
import LoginSignup from './login-signup.vue'
import UserInfo from './user-info'

export default {
  components: {
    LoginSignup,
    UserInfo
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .user
    width 100%
    height 100%
</style>
