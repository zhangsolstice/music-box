<template lang="pug">
  section(
    :class='["search"]'
    @click='switchSearching'
  )
    div(
      :class='["search-icon"]'
    )
      div(
        :class='["search-icon-content", getIsSearching ? "search-icon-content-active" : ""]'
        v-for='(item, index) of 3'
        :key='index'
      )
    div(
      :class='["search-icon-bar"]'
    )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapGetters([
      'getIsSearching'
    ])
  },
  methods: {
    switchSearching () {
      this.$store.dispatch('switchIsSearching')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    font-size 12px
    color #eee
    width .5rem
    height .5rem
    position absolute
    left .5rem
    cursor pointer
  .search-icon
    width 25px
    height 25px
    border 4px solid #eee
    border-radius 50%
    position absolute
    top 12px
    left 12px
    overflow hidden
  .search-icon-bar
    content ''
    display block
    width 8px
    height 4px
    background-color #eee
    border-radius 2px
    position absolute
    top 32px
    left 32px
    transform rotate(45deg)
  .search-icon-content
    width 50px
    height 4px
    position absolute
    left -50px
    transform translate(-50%, -50%)
    &:nth-of-type(1)
      top 3px
      background linear-gradient(90deg, #eee 3px, transparent 3px, transparent 6px, #eee 6px, #eee 13px, transparent 13px, transparent 18px, #eee 18px, #eee 25px, transparent 25px, transparent 30px, #eee 30px, #eee 40px, transparent 40px, transparent 42px, #eee 42px, #eee 44px, transparent 44px, transparent 48px, #eee 48px, #eee 50px)
    &:nth-of-type(2)
      top 8px
      background linear-gradient(90deg, #eee 5px, transparent 5px, transparent 9px, #eee 9px, #eee 17px, transparent 17px, transparent 23px, #eee 23px, #eee 29px, transparent 29px, transparent 32px, #eee 32px, #eee 34px, transparent 34px, transparent 38px, #eee 38px, #eee 48px, transparent 48px, transparent 50px)
      animation-delay .2s
    &:nth-of-type(3)
      top 13px
      background linear-gradient(90deg, #eee 1px, transparent 1px, transparent 3px, #eee 3px, #eee 6px, transparent 6px, transparent 14px, #eee 14px, #eee 16px, transparent 16px, transparent 26px, #eee 26px, #eee 30px, transparent 30px, transparent 32px, #eee 32px, #eee 38px, transparent 38px, transparent 40px, #eee 40px, #eee 50px)
      animation-delay .5s
  .search-icon-content-active
    animation search-active 5s linear 0s infinite
  @keyframes search-active
    0%
      left -30px
    100%
      left 40px
</style>
