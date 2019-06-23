<template lang="pug">
  section(
    :class='["not-found"]'
  )
    p 404 Not Found
</template>

<script>

export default {

}
</script>

<style lang="stylus" scoped>
  .not-found
    width 100vw
    height calc(100vh - 50px)
    font-size 50px
    font-weight bold
    color #eee
    background-color #999
    opacity .95
    text-align center
    position relative
    &>p
      white-space nowrap
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      overflow hidden
      animation glitch .2s linear 4s 1
      &::before
        content '404 Not Found'
        position absolute
        top 0
        left 0
        animation glitch-part-one 1s linear infinite
      &::after
        content '404 Not Found'
        position absolute
        top 0
        left 0
        animation glitch-part-two 1s linear .2s infinite
  @keyframes glitch
    0%
      transform translate(-50%, -50%) skewX(0deg)
    50%
      transform translate(-50%, -50%) skewX(-45deg)
    100%
      transform translate(-50%, -50%) skewX(0deg)
  @keyframes glitch-part-one
    0%
      opacity 1
      transform translate(5px, 0)
      clip-path polygon(0 2%, 100% 2%, 100% 5%, 0 5%)
    2%
      clip-path polygon(0 15%, 100% 15%, 100% 15%, 0 15%)
    4%
      clip-path polygon(0 10%, 100% 10%, 100% 20%, 0 20%)
    6%
      clip-path polygon(0 1%, 100% 1%, 100% 2%, 0 2%)
    8%
      clip-path polygon(0 33%, 100% 33%, 100% 33%, 0 33%)
    10%
      clip-path polygon(0 44%, 100% 44%, 100% 44%, 0 44%)
    12%
      clip-path polygon(0 50%, 100% 50%, 100% 20%, 0 20%)
    14%
      clip-path polygon(0 70%, 100% 70%, 100% 70%, 0 70%)
    16%
      clip-path polygon(0 80%, 100% 80%, 100% 80%, 0 80%)
    18%
      clip-path polygon(0 50%, 100% 50%, 100% 55%, 0 55%)
    20%
      clip-path polygon(0 70%, 100% 70%, 100% 80%, 0 80%)
    21.9%
      opacity 1
      transform translate3d(2px, 0, 0)
    22%, 100%
      opacity 0
      transform translate3d(0,0,0)
      clip-path polygon(0 0, 0 0, 0 0, 0 0)
  @keyframes glitch-part-two
    0%
      opacity 1
      transform translate3d(-5px, 0, 0)
      clip-path polygon(0 25%, 100% 25%, 100% 30%, 0 30%)
    3%
      clip-path polygon(0 3%, 100% 3%, 100% 3%, 0 3%)
    5%
      clip-path polygon(0 5%, 100% 5%, 100% 20%, 0 20%)
    7%
      clip-path polygon(0 20%, 100% 20%, 100% 20%, 0 20%)
    9%
      clip-path polygon(0 40%, 100% 40%, 100% 40%, 0 40%)
    11%
      clip-path polygon(0 52%, 100% 52%, 100% 59%, 0 59%)
    13%
      clip-path polygon(0 60%, 100% 60%, 100% 60%, 0 60%)
    15%
      clip-path polygon(0 75%, 100% 75%, 100% 75%, 0 75%)
    17%
      clip-path polygon(0 65%, 100% 65%, 100% 40%, 0 40%)
    19%
      clip-path polygon(0 45%, 100% 45%, 100% 50%, 0 50%)
    20%
      clip-path polygon(0 14%, 100% 14%, 100% 33%, 0 33%)
    21.9%
      opacity 1
      transform translate3d(-5px, 0, 0)
    22%, 100%
      opacity 0
      transform translate3d(0, 0, 0)
      clip-path polygon(0 0, 0 0, 0 0, 0 0)
</style>
