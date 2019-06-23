<template lang="pug">
  section(
    :class='["user"]'
    @click='toDefaultLoginRoute'
  )
    div(
      :style='getUserInfo.status ? {backgroundImage: `url("${getUserInfo.avatarUrl}")`} : {}'
      :class='["user-icon", getUserInfo.status ? "user-icon-active" : ""]'
    )
      div(
        :class='["user-icon-up", getUserInfo.status ? "user-icon-up-active" : ""]'
      )
      div(
        :class='["user-icon-down", getUserInfo.status ? "user-icon-down-active" : ""]'
      )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      xx: false
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods: {
    toDefaultLoginRoute () {
      this.$router.push({ name: 'user', params: { userId: this.getUserInfo.id || 0 } })
    },
    x () {
      this.xx = !this.xx
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user
    font-size .2rem
    width .5rem
    height .5rem
    position absolute
    right .5rem
    cursor pointer
  .user-icon
    width 30px
    height 30px
    position absolute
    top 10px
    left 10px
    overflow hidden
  .user-icon-active
    background-size cover
    background-position center center
    border-radius 50%
  .user-icon-up
  .user-icon-down
    content ''
    display block
    position absolute
    border 4px solid #eee
    transition all .5s ease-in-out
  .user-icon-up
    width 18px
    height 18px
    border-radius 50%
    left 6px
  .user-icon-down
    width 30px
    height 30px
    border-radius 50%
    top 15px
  .user-icon-up-active
  .user-icon-down-active
    width 30px
    height 15px
    left 0
    transition all .5s ease-in-out
  .user-icon-up-active
    border-bottom none
    border-radius 15px 15px 0 0
    top 0
  .user-icon-down-active
    border-top none
    border-radius 0 0 15px 15px
    bottom 0
</style>
