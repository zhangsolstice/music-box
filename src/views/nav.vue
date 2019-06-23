<template lang="pug">
  div(
    :class='["nav", getNavIsActive ? "nav-active" : ""]'
  )
    NavItems
</template>

<script>
import { mapGetters } from 'vuex'
import NavItems from 'components/nav-components-wrapper/nav-items/nav-items.vue'

export default {
  components: {
    NavItems
  },
  computed: {
    ...mapGetters([
      'getNavIsActive'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .nav
    width 100%
    height calc(100% - 50px)
    background-color #999
    position fixed
    z-index -9999
    transform scale(3)
    opacity 0
    transition all .5s ease-in-out
  .nav-active
    box-shadow 0 5px 5px #eee inset
    z-index 9999
    transform scale(1)
    opacity .95
    transition all .5s ease-in-out
    animation nav-shadow 10s ease-in-out 0s infinite
  @keyframes nav-shadow
    0%
      box-shadow 0 5px 5px #eee inset
    70%
      box-shadow 0 30px 30px #eee inset
    100%
      box-shadow 0 5px 5px #eee inset
</style>
