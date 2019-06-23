<template lang="pug">
  section(
    :class='["player-slider"]'
    @click='switchPlayer'
  )
    section(
      :class='["player-current-song"]'
    )
      div(
        :style='{backgroundImage: `url(${getCurrentSong.album.picUrl})`}'
        :class='["player-current-song-glitch"]'
      )
      div(
        v-if='getPlayerIsActive'
        :style='{backgroundImage: `url(${getCurrentSong.album.picUrl})`}'
        :class='["player-current-song-glitch"]'
      )
      div(
        v-if='getPlayerIsActive'
        :style='{backgroundImage: `url(${getCurrentSong.album.picUrl})`}'
        :class='["player-current-song-glitch"]'
      )
      div(
        v-if='getPlayerIsActive'
        :style='{backgroundImage: `url(${getCurrentSong.album.picUrl})`}'
        :class='["player-current-song-glitch"]'
      )
      div(
        v-if='getPlayerIsActive'
        :style='{backgroundImage: `url(${getCurrentSong.album.picUrl})`}'
        :class='["player-current-song-glitch"]'
      )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapGetters([
      'getPlayerIsActive',
      'getCurrentSong'
    ])
  },
  methods: {
    ...mapActions([
      'switchPlayer'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .player-slider
    width .5em
    height .5em
    position absolute
    right 0
    cursor pointer
  .player-current-song
    margin 10px
    width 30px
    height 30px
    position relative
    overflow hidden
  .player-current-song-glitch
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    background-color transparent
    background-size cover
    &:nth-of-type(2)
      transform translate3d(2px, 0, 0)
      animation glitch-1 1s linear 0s infinite
    &:nth-of-type(3)
      transform translate3d(-2px, 0, 0)
      animation glitch-2 .8s linear 0s infinite
    &:nth-of-type(4)
      transform translate3d(0, -2px, 0) scale3d(-1, -1, -1)
      animation glitch-3 1.2s linear 0s infinite
    &:nth-of-type(5)
      animation flash .3s steps(2, start) 0s infinite
  @keyframes glitch-1
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
  @keyframes glitch-2
    0%
      opacity 1
      transform translate3d(-2, 0, 0)
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
      transform translate3d(-2, 0, 0)
    22%, 100%
      opacity 0
      transform translate3d(0, 0, 0)
      clip-path polygon(0 0, 0 0, 0 0, 0 0)
  @keyframes glitch-3
    0%
      opacity 1
      transform translate3d(0, -2, 0) scale3d(-1,-1, 1)
      clip-path polygon(0 1%, 100% 1%, 100% 3%, 0 3%)
    1.5%
      clip-path polygon(0 10%, 100% 10%, 100% 30%, 0 30%)
    2%
      clip-path polygon(0 5%, 100% 5%, 100% 80%, 0 80%)
    2.5%
      clip-path polygon(0 20%, 100% 20%, 100% 20%, 0 20%)
    3%
      clip-path polygon(0 10%, 100% 10%, 100% 10%, 0 10%)
    5%
      clip-path polygon(0 30%, 100% 30%, 100% 25%, 0 25%)
    5.5%
      clip-path polygon(0 15%, 100% 15%, 100% 16%, 0 16%)
    7%
      clip-path polygon(0 40%, 100% 40%, 100% 39%, 0 39%)
    8%
      clip-path polygon(0 20%, 100% 20%, 100% 21%, 0 21%)
    9%
      clip-path polygon(0 60%, 100% 60%, 100% 55%, 0 55%)
    10.5%
      clip-path polygon(0 30%, 100% 30%, 100% 31%, 0 31%)
    11%
      clip-path polygon(0 70%, 100% 70%, 100% 69%, 0 69%)
    13%
      clip-path polygon(0 40%, 100% 40%, 100% 41%, 0 41%)
    14%
      clip-path polygon(0 80%, 100% 80%, 100% 75%, 0 75%)
    14.5%
      clip-path polygon(0 50%, 100% 50%, 100% 51%, 0 51%)
    15%
      clip-path polygon(0 90%, 100% 90%, 100% 90%, 0 90%)
    16%
      clip-path polygon(0 60%, 100% 60%, 100% 60%, 0 60%)
    18%
      clip-path polygon(0 100%, 100% 100%, 100% 99%, 0 99%)
    20%
      clip-path polygon(0 70%, 100% 70%, 100% 71%, 0 71%)
    21.9%
      opacity 1
      transform translate3d(0, -2, 0) scale3d(-1, -1, 1)
    22%, 100%
      opacity 0
      transform translate3d(0, 0, 0)
      clip-path polygon(0 0, 0 0, 0 0, 0 0)
  @keyframes flash
    0%
      opacity 0
      transform translate3d(0, 0, 0)
    20%
      opacity 0
      transform translate3d(3px, 3px, 0)
    40%
      opacity 0
      transform translate3d(-1px, -1px, 0)
    60%
      opacity 0
      transform translate3d(6px, 6px, 0)
    80%
      opacity 0
      transform translate3d(0, 0, 0)
    100%
      opacity 0.2
      transform translate3d(5px, 5px, 0)
</style>
