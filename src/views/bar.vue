<template lang="pug">
  div(
    class='bar'
    @click='switchIsCollect'
  )
    NavSlider
    Search
    Logo
    User
    PlayerSlider
</template>

<script>
import NavSlider from 'components/bar-components-wrapper/nav-slider/nav-slider.vue'
import Search from 'components/bar-components-wrapper/search/search.vue'
import Logo from 'components/bar-components-wrapper/logo/logo.vue'
import User from 'components/bar-components-wrapper/user/user.vue'
import PlayerSlider from 'components/bar-components-wrapper/player-slider/player-slider.vue'

export default {
  components: {
    NavSlider,
    Search,
    Logo,
    User,
    PlayerSlider
  },
  methods: {
    switchIsCollect () {
      this.$store.dispatch('switchIsCollect')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bar
    width 100%
    height .5em
    background-color #999
    box-shadow 0 -5px 10px #333,
               0 5px 20px #eee inset
    opacity .95
    position fixed
    bottom 0
    z-index 9999
</style>
