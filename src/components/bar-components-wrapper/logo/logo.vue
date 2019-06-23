<template lang="pug">
  section(
    :class='["logo"]'
  )
    a(
      target='_blank'
      href='https://github.com/zhangsolstice/music-box'
      :class='["logo-creator"]'
    )
      span(
        :class='["logo-creator-github"]'
      )
      span(
        :class='["logo-creator-author"]'
      ) zhangsolstice
</template>

<script>

export default {
  components: {

  }
}
</script>

<style lang="stylus" scoped>
  .logo
    width 1.4rem
    height .5rem
    position absolute
    left 50%
    transform translate(-50%, 0)
    cursor pointer
  .logo-creator
    display block
    width 100%
    height 100%
    position relative
  .logo-creator-github
  .logo-creator-author
    display block
    height 20px
    position absolute
    top 15px
  .logo-creator-github
    width 20px
    background url('../../../assets/images/sprite.png') 59px -5px
    background-size 204px 162px
  .logo-creator-author
    font-size 18px
    font-weight bold
    color #eee
    left 22px
</style>
