<template lang="pug">
  div(
    :class='["introduction"]'
  )
    span(
      :class='["introduction-content"]'
    )
    span(
      :class='["cursor"]'
    ) |
</template>

<script>
import { introduction } from './introduction.js'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    introduction()
  }
}
</script>

<style lang="stylus" scoped>
  .introduction
    width 100%
    height .5rem
    background-color transparent
    text-align center
  .introduction-content
  .cursor
    color #eee
    text-shadow 2px 0 0 #333,
                0 2px 0 #333,
                2px 2px 0 #333,
                -2px -2px 0 #333
  .introduction-content
    line-height .5rem
    font-size .26rem
    font-weight bold
    text-shadow 0 1em .1em rgba(255, 255, 255, 0), 0 -1em .1em rgba(255, 255, 255, 0)
    transition all .2s ease-in-out
  .introduction-content-vue
    color #64b587
    text-shadow 0 0 .1em rgba(57, 73, 92, 1), 0 0 .2em rgba(255, 255, 255, 1)
    transition all .2s ease-in-out
  .introduction-content-webpack
    color #3978ba
    text-shadow 0 0 .1em #2d3941, 0 0 .2em #9ed5f7
    transition all .2s ease-in-out
  .introduction-content-pug
    color #9f6758
    text-shadow 0 0 .1em #000, 0 0 .2em #fff
    transition all .2s ease-in-out
  .introduction-content-stylus
    color #ed6d52
    text-shadow 0 0 .1em #ec6144, 0 0 .2em #333
    transition all .2s ease-in-out
  .introduction-content-koa
    color #33333c
    text-shadow 0 0 .1em #33333c, 0 0 .2em #fff
    transition all .2s ease-in-out
  .cursor
    font-size 30px
</style>
