<template lang="pug">
  div(
    :class='["nav-slider", getNavIsActive ? "nav-slider-active" : ""]'
    @click='switchNav'
  )
    div(
      :class='["nav-slider-part", getNavIsActive ? "nav-slider-part-active" : ""]'
      v-for='(v, k) of 3'
      :key='k'
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {

  },
  computed: {
    ...mapGetters([
      'getNavIsActive'
    ])
  },
  methods: {
    ...mapActions([
      'switchNav'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .nav-slider
    width .5em
    height .5em
    position absolute
    cursor pointer
  .nav-slider-part
    width 30px
    height 5px
    background-color #eee
    border-radius 2px
    position absolute
    left 10px
    transition all .5s ease-in-out
    &:nth-of-type(1)
      top 12px
    &:nth-of-type(2)
      top 22px
    &:nth-of-type(3)
      top 32px
  .nav-slider-part-active
    transform-origin left
    transition all .5s ease-in-out
    &:nth-of-type(1)
      left 12px
      transform rotate(40deg)
      animation part-one-active .5s linear .5s infinite
    &:nth-of-type(2)
      left -50px
      opacity 0
    &:nth-of-type(3)
      transform rotate(-40deg)
      left 12px
      animation part-two-active .5s linear .5s infinite
  @keyframes part-one-active
    0%
      top 12px
      left 12px
    25%
      top 13px
      left 13px
    50%
      top 11px
      left 11px
    75%
      top 14px
      left 14px
    100%
      top 12px
      left 12px
  @keyframes part-two-active
    0%
      top 32px
      left 12px
    25%
      top 34px
      left 14px
    50%
      top 31px
      left 11px
    75%
      top 33px
      left 13px
    100%
      top 32px
      left 12px
</style>
