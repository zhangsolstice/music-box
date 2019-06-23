<template lang="pug">
  section(
    :class='["player", getPlayerIsActive ? "player-active" : ""]'
  )
    PlayerAnimation
    div(
      :class='["player-content-wrapper"]'
    )
      div(
        :class='["player-switcher-list-wrapper"]'
        @click='switchList'
      )
        div(
          :class='["player-switcher-list", isListActive ? "player-switcher-list-active" : ""]'
        )
          div(
            :class='["player-switcher-list-icon"]'
            v-for='(item, index) of 9'
            :key='index'
          )
      div(
        :class='["player-switcher-video-wrapper"]'
        @click='switchVideo'
      )
        div(
          :class='["player-switcher-video", getCurrentSong.videoUrl ? "player-switcher-video-include" : "", isVideoActive ? "player-switcher-video-active" : ""]'
        )
      AudioPlayer(
        :active='!isListActive && !isVideoActive'
      )
      PlayerList(
        :active='isListActive && !isVideoActive'
        @click='switchList'
      )
      VideoPlayer(
        :active='isVideoActive && !isListActive'
        @click='switchVideo'
      )
    SongLyric
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerAnimation from 'components/player-components-wrapper/player-animation/player-animation.vue'
import AudioPlayer from 'components/player-components-wrapper/audio-player/audio-player.vue'
import PlayerList from 'components/player-components-wrapper/player-list/player-list.vue'
import VideoPlayer from 'components/player-components-wrapper/video-player/video-player.vue'
import SongLyric from 'components/player-components-wrapper/song-lyric/song-lyric.vue'

export default {
  components: {
    PlayerAnimation,
    AudioPlayer,
    PlayerList,
    VideoPlayer,
    SongLyric
  },
  data () {
    return {
      isListActive: false,
      isVideoActive: false
    }
  },
  computed: {
    ...mapGetters([
      'getPlayerIsActive',
      'getCurrentSong',
      'getPlayerList',
      'getPlayerCurrentSongIndex'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestPlayerList', {
        isAddAtLast: false,
        playerList: JSON.parse(localStorage.getItem('currentSongList'))
      })
      await this.$store.dispatch(
        'requestPlayerCurrentSongIndex',
        localStorage.getItem('currentSongIndex')
      )
      await this.$store.dispatch(
        'requestCurrentSong',
        [this.$store.getters.getPlayerList[+this.$store.getters.getPlayerCurrentSongIndex].id]
      )
    })()
  },
  methods: {
    switchList () {
      this.isVideoActive = false
      this.isListActive = !this.isListActive
    },
    switchVideo () {
      this.isListActive = false
      this.isVideoActive = !this.isVideoActive
    }
  }
}
</script>

<style lang="stylus" scoped>
  .player
    width 100%
    height calc(100% - 50px)
    font-size 12px
    font-weight bold
    color #eee
    text-shadow 0 0 2px #333
    position fixed
    right -100%
    z-index -9999
    background-color #999
    overflow hidden
    transition all .3s ease-in-out
  .player-active
    right 0
    z-index 9999
    transition all .3s ease-in-out
  .player-content-wrapper
    width 90vw
    max-width 700px
    height 56.25vw
    max-height 437.5px
    background-color #999
    border-radius 15px
    box-shadow 0 20px 20px #333
    background-size cover
    background-position center
    position absolute
    left 50%
    bottom 150px
    opacity .6
    transform translate(-50%, 0)
    overflow hidden
  .player-switcher-list-wrapper
  .player-switcher-video-wrapper
    width 40px
    height 30px
    position absolute
    bottom 0
    z-index 1
    overflow hidden
    cursor pointer
  .player-switcher-list-wrapper
    left 0
  .player-switcher-video-wrapper
    right 0
  .player-switcher-list
    width 100%
    height 100%
    transform translate(0, 3px)
    transition all .5s ease-in-out
  .player-switcher-list-active
    transition all .5s ease-in-out
    animation switcher-list 4s ease-in-out .2s alternate-reverse infinite
  @keyframes switcher-list
    0%
      transform translate(0, -58px)
    100%
      transform translate(0, 3px)
  .player-switcher-list-icon
    margin-bottom 5px
    width 100%
    height 5px
    position relative
    &::after
      content ''
      width 5px
      height 5px
      border-radius 1px
      background-color #eee
      box-shadow 2px 2px 2px #999
      position absolute
      top 0
      left 2px
    &::before
      content ''
      width 25px
      height 5px
      border-radius 2px
      background-color #eee
      box-shadow 2px 2px 2px #999
      position absolute
      top 0
      left 12px
    &:nth-of-type(5)
      &::after
      &::before
        background-color #ff522a
        box-shadow 2px 2px 2px #ffa843
  .player-switcher-video
    width 40px
    height 30px
    border 5px solid #eee
    border-radius 8px
    box-shadow -2px 2px 2px #999 inset
    position relative
    &::before
      content ''
      width 0
      height 0
      border 7px solid transparent
      border-left-color #eee
      border-radius 3px
      position absolute
      top 3px
      left 12px
  .player-switcher-video-include
    border-color #ff522a
    box-shadow -2px 2px 2px #ffa843 inset
    &::before
      border-left-color #ff522a
  .player-switcher-video-active
    &::before
      animation switcher-video 2s ease-in-out 0s infinite
  @keyframes switcher-video
    0%
      left -20px
    10%
      left 12px
    20%
      left 12px
    30%
      left 12px
    40%
      left 12px
    50%
      left 12px
    60%
      left 12px
    70%
      left 12px
    80%
      left 12px
    90%
      left 12px
    100%
      left 20px
</style>
