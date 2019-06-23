<template lang="pug">
  section(
    :style='{backgroundImage: `url(${getCurrentSong.album.picUrl})`}'
    :class='["player-animation"]'
  )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getCurrentSong'
    ])
  },
  mounted () {

  }
}
</script>

<style lang="stylus" scoped>
  .player-animation
    width 100%
    height calc(100% - 50px)
    background-size cover
    background-position center
    position fixed
    top 0
    left 0
    z-index -2
    filter blur(50px) sepia(100%)
    transform translateZ(-1000px)
</style>
