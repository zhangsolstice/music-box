<template lang="pug">
  section(
    :class='["audio-player", active ? "audio-player-active" : "" ]'
  )
    div(
      :class='["audio-volume"]'
    )
      div(
        :class='["audio-volume-off-icon"]'
      )
      div(
        :class='["audio-volume-on-icon"]'
      )
      div(
        :class='["audio-volume-bar"]'
      )
        div(
          :class='["audio-volume-handler"]'
        )
    div(
      :class='["audio-previous-wrapper"]'
      @click='switchPreviousSong'
    )
      div(
        :class='["audio-previous-major"]'
      )
      div(
        :class='["audio-previous-minor"]'
      )
    div(
      :class='["audio-play-wrapper"]'
      @click='playOrPause'
    )
      div(
        :class='["audio-play-part-one", getIsPlayed ? "audio-pause-part-one" : ""]'
      )
      div(
        :class='["audio-play-part-two", getIsPlayed ? "audio-pause-part-two" : ""]'
      )
    div(
      :class='["audio-next-wrapper"]'
      @click='switchNextSong'
    )
      div(
        :class='["audio-next-major"]'
      )
      div(
        :class='["audio-next-minor"]'
      )
    div(
      :class='["audio-collect"]'
      v-if='getUserInfo.status'
      @click='collectCurrentSong(getCurrentSong.id)'
    )
    div(
      :class='["audio-mode"]'
      @click='switchMode'
    )
      div(
        v-if='isListLoop'
        :class='["audio-mode-list-loop"]'
      )
      div(
        v-if='isSongLoop'
        :class='["audio-mode-song-loop"]'
      )
      div(
        v-if='isRandom'
        :class='["audio-mode-random-loop"]'
      )
    div(
      :class='["audio-song"]'
    ) {{ getCurrentSong.name }}
    div(
      :class='["audio-artists-wrapper"]'
    )
      div(
        :class='["audio-artists"]'
        v-for='(artist, index) of getCurrentSong.artists'
        :key='artist.id'
        @click='jumpToArtist(artist.id)'
      ) {{ '歌手：' }} {{ artist.name }}
    div(
      :class='["audio-album"]'
      @click='jumpToAlbum(getCurrentSong.album.id)'
    ) {{ '专辑：' }} {{ getCurrentSong.album.name }}
    div(
      :class='["audio-duration"]'
    )
    div(
      :class='["audio-progress"]'
    )
      div(
        :class='["audio-progress-handler"]'
      )
</template>

<script>
import { mapGetters } from 'vuex'
import { audioControl } from '../audio.js'

export default {
  components: {

  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isListLoop: true,
      isSongLoop: false,
      isRandom: false
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getCurrentSong',
      'getPlayerList',
      'getPlayerCurrentSongIndex',
      'getIsPlayed'
    ])
  },
  mounted () {
    const audio = document.getElementsByClassName('audio')[0]
    const lyric = document.getElementsByClassName('lyric')[0]
    audioControl()
    audio.addEventListener('ended', () => {
      if (this.isListLoop) {
        (async () => {
          if (this.getPlayerList.length - 1 === +this.getPlayerCurrentSongIndex) {
            await this.$store.dispatch(
              'requestCurrentSong',
              [this.getPlayerList[0].id]
            )
            await localStorage.setItem(
              'currentSongIndex',
              0
            )
            await this.$store.dispatch(
              'requestPlayerCurrentSongIndex',
              0
            )
            audio.play()
            this.$store.dispatch('switchIsPlayed', true)
            lyric.style.transform = 'translate(0, 90px)'
          } else {
            await this.$store.dispatch(
              'requestCurrentSong',
              [this.getPlayerList[+this.getPlayerCurrentSongIndex + 1].id]
            )
            await localStorage.setItem(
              'currentSongIndex',
              +localStorage.getItem('currentSongIndex') + 1
            )
            await this.$store.dispatch(
              'requestPlayerCurrentSongIndex',
              +this.$store.getters.getPlayerCurrentSongIndex + 1
            )
            audio.play()
            this.$store.dispatch('switchIsPlayed', true)
            lyric.style.transform = 'translate(0, 90px)'
          }
        })()
      }
      if (this.isSongLoop) {
        audio.currentTime = 0
        audio.play()
        lyric.style.transform = 'translate(0, 90px)'
      }
      if (this.isRandom) {
        let nextSongIndex = Math.round(Math.random() * (this.getPlayerList.length - 1));
        (async () => {
          await this.$store.dispatch(
            'requestCurrentSong',
            [this.getPlayerList[nextSongIndex].id]
          )
          await localStorage.setItem(
            'currentSongIndex',
            nextSongIndex
          )
          await this.$store.dispatch(
            'requestPlayerCurrentSongIndex',
            nextSongIndex
          )
          audio.play()
          lyric.style.transform = 'translate(0, 90px)'
        })()
      }
    })
  },
  methods: {
    jumpToArtist (id) {
      this.$store.dispatch('switchPlayer')
      this.$router.push({ name: 'artist', params: { artistId: String(id) } })
    },
    jumpToAlbum (id) {
      this.$store.dispatch('switchPlayer')
      this.$router.push(`/album/${id}`)
    },
    switchMode () {
      if (this.isListLoop) {
        this.isListLoop = false
        this.isSongLoop = true
        return ''
      }
      if (this.isSongLoop) {
        this.isSongLoop = false
        this.isRandom = true
        return ''
      }
      if (this.isRandom) {
        this.isRandom = false
        this.isListLoop = true
        return ''
      }
    },
    playOrPause () {
      let audio = document.getElementsByClassName('audio')[0]
      if (audio.paused) {
        audio.play()
        this.$store.dispatch('switchIsPlayed', true)
      } else {
        audio.pause()
        this.$store.dispatch('switchIsPlayed', false)
      }
    },
    switchPreviousSong () {
      (async () => {
        let audio = document.getElementsByClassName('audio')[0]
        let lyric = document.getElementsByClassName('lyric')[0]
        if (+this.getPlayerCurrentSongIndex === 0) {
          await this.$store.dispatch(
            'requestCurrentSong',
            [this.getPlayerList[this.getPlayerList.length - 1].id]
          )
          await localStorage.setItem(
            'currentSongIndex',
            JSON.parse(localStorage.getItem('currentSongList')).length - 1
          )
          await this.$store.dispatch(
            'requestPlayerCurrentSongIndex',
            this.getPlayerList.length - 1
          )
          audio.play()
          this.$store.dispatch('switchIsPlayed', true)
          lyric.style.transform = 'translate(0, 90px)'
        } else {
          await this.$store.dispatch(
            'requestCurrentSong',
            [this.getPlayerList[+this.getPlayerCurrentSongIndex - 1].id]
          )
          await localStorage.setItem(
            'currentSongIndex',
            +localStorage.getItem('currentSongIndex') - 1
          )
          await this.$store.dispatch(
            'requestPlayerCurrentSongIndex',
            +this.getPlayerCurrentSongIndex - 1
          )
          audio.play()
          this.$store.dispatch('switchIsPlayed', true)
          lyric.style.transform = 'translate(0, 90px)'
        }
      })()
    },
    switchNextSong () {
      (async () => {
        let audio = document.getElementsByClassName('audio')[0]
        let lyric = document.getElementsByClassName('lyric')[0]
        if (this.getPlayerList.length - 1 === +this.getPlayerCurrentSongIndex) {
          await this.$store.dispatch(
            'requestCurrentSong',
            [this.getPlayerList[0].id]
          )
          await localStorage.setItem(
            'currentSongIndex',
            0
          )
          await this.$store.dispatch(
            'requestPlayerCurrentSongIndex',
            0
          )
          audio.play()
          this.$store.dispatch('switchIsPlayed', true)
          lyric.style.transform = 'translate(0, 90px)'
        } else {
          await this.$store.dispatch(
            'requestCurrentSong',
            [this.getPlayerList[+this.getPlayerCurrentSongIndex + 1].id]
          )
          await localStorage.setItem(
            'currentSongIndex',
            +localStorage.getItem('currentSongIndex') + 1
          )
          await this.$store.dispatch(
            'requestPlayerCurrentSongIndex',
            +this.$store.getters.getPlayerCurrentSongIndex + 1
          )
          audio.play()
          this.$store.dispatch('switchIsPlayed', true)
          lyric.style.transform = 'translate(0, 90px)'
        }
      })()
    },
    collectCurrentSong (id) {
      this.$store.dispatch('requestCollectSongs', [id])
      this.$store.dispatch('switchIsCollect', true)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .audio-player
    width 100%
    height 100%
    background-color #333
    opacity 0
    position absolute
    top -100%
    left 0
    z-index -100000
    transition all .5s ease-in-out
  .audio-player-active
    top 0
    z-index 0
    opacity .8
    transition all .5s ease-in-out
  .audio-previous-wrapper
  .audio-play-wrapper
  .audio-next-wrapper
    width 40px
    height 40px
    position absolute
    cursor pointer
  .audio-previous-wrapper
    left calc(50% - 80px)
  .audio-play-wrapper
    width 50px
    height 50px
    left 50%
    transform translate(-50%, 0)
  .audio-play-part-one
  .audio-play-part-two
    width 0
    height 0
    border 20px solid transparent
    border-left-color #eee
    border-radius 2px
    position absolute
    top 5px
    left 15px
    animation play 2s ease-in-out 0s infinite
    transition all .5s ease-in-out
    &::before
    &::after
      content ''
      width 0
      height 0
      border 20px solid transparent
      border-radius 2px
      position absolute
      top -20px
      left -20px
    &::before
      z-index -1
      border-left-color #E55D87
      animation play-part-one-shadow-1 2s ease-in-out 0s infinite
    &::after
      z-index -2
      border-left-color #5FC3E4
      animation play-part-one-shadow-2 2s ease-in-out 0s infinite
  .audio-pause-part-one
  .audio-pause-part-two
    border-top 20px solid #eee
    border-right 5px solid #eee
    border-bottom 20px solid #eee
    border-left 5px solid #eee
    transition all .5s ease-in-out
    animation pause 2s ease-in-out 0s infinite
    &::before
    &::after
      border-top 20px solid
      border-right 5px solid
      border-bottom 20px solid
      border-left 5px solid
      left -5px
  .audio-pause-part-one
    left 10px
    animation pause-part-1 2s ease-in-out 0s infinite
    &::before
      border-color #E55D87
      animation pause-part-one-shadow-1 2s ease-in-out 0s infinite
    &::after
      border-color #5FC3E4
      animation pause-part-one-shadow-2 2s ease-in-out 0s infinite
  .audio-pause-part-two
    left 30px
    animation pause-part-2 2s ease-in-out 0s infinite
    &::before
      border-color #E55D87
      animation pause-part-two-shadow-1 2s ease-in-out 0s infinite
    &::after
      border-color #5FC3E4
      animation pause-part-two-shadow-2 2s ease-in-out 0s infinite
  @keyframes play
    0%
      top 5px
      left 15px
    25%
      top 3px
      left 17px
    75%
      top 3px
      left 13px
    100%
      top 5px
      left 15px
  @keyframes play-part-one-shadow-1
    0%
      top -20px
      left -20px
    25%
      top -18px
      left -22px
    75%
      top -18px
      left -18px
    100%
      top -20px
      left -20px
  @keyframes play-part-one-shadow-2
    0%
      top -20px
      left -20px
    25%
      top -16px
      left -24px
    75%
      top -16px
      left -16px
    100%
      top -20px
      left -20px
  @keyframes pause-part-1
    0%
      top 5px
      left 10px
    50%
      top 3px
      left 8px
    100%
      top 5px
      left 10px
  @keyframes pause-part-2
    0%
      top 5px
      left 30px
    50%
      top 3px
      left 32px
    100%
      top 5px
      left 30px
  @keyframes pause-part-one-shadow-1
    0%
      top -20px
      left -5px
    50%
      top -18px
      left -3px
    100%
      top -20px
      left -5px
  @keyframes pause-part-one-shadow-2
    0%
      top -20px
      left -5px
    50%
      top -16px
      left -1px
    100%
      top -20px
      left -5px
  @keyframes pause-part-two-shadow-1
    0%
      top -20px
      left -5px
    50%
      top -18px
      left -7px
    100%
      top -20px
      left -5px
  @keyframes pause-part-two-shadow-2
    0%
      top -20px
      left -5px
    50%
      top -16px
      left -9px
    100%
      top -20px
      left -5px
  .audio-next-wrapper
    left calc(50% + 40px)
  .audio-previous-major
    width 0
    height 0
    border 15px solid transparent
    border-right-color #eee
    position absolute
    top 5px
    left 0
    animation previous-major 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 0
      height 0
      border 15px solid transparent
      position absolute
      top -15px
      left -15px
      z-index -1
    &::before
      border-right-color #5FC3E4
      animation previous-major-before 2s ease-in-out 0s infinite
    &::after
      border-right-color #E55D87
      animation previous-major-after 2s ease-in-out 0s infinite
  @keyframes previous-major
    0%
      top 5px
      left 0
    50%
      top 3px
      left -2px
    100%
      top 5px
      left 0
  @keyframes previous-major-before
    0%
      top -15px
      left -15px
    50%
      top -7px
      left -11px
    100%
      top -15px
      left -15px
  @keyframes previous-major-after
    0%
      top -15px
      left -15px
    50%
      top -11px
      left -13px
    100%
      top -15px
      left -15px
  .audio-previous-minor
    width 5px
    height 30px
    background-color #eee
    border-radius 2px
    position absolute
    top 5px
    left 8px
    animation previous-minor 2s ease-in-out .5s infinite
    &::before
    &::after
      content ''
      width 5px
      height 30px
      border-radius 2px
      position absolute
      top 0
      left 0
      z-index -1
    &::before
      background-color #5FC3E4
      animation previous-minor-before 2s ease-in-out .5s infinite
    &::after
      background-color #E55D87
      animation previous-minor-after 2s ease-in-out .5s infinite
  @keyframes previous-minor
    0%
      top 5px
      left 8px
    50%
      top 3px
      left 6px
    100%
      top 5px
      left 8px
  @keyframes previous-minor-before
    0%
      top 0
      left 0
    50%
      top 4px
      left 4px
    100%
      top 0
      left 0
  @keyframes previous-minor-after
    0%
      top 0
      left 0
    50%
      top 2px
      left 2px
    100%
      top 0
      left 0
  .audio-next-major
    width 0
    height 0
    border 15px solid transparent
    border-left-color #eee
    position absolute
    top 5px
    right 0
    animation next-major 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 0
      height 0
      border 15px solid transparent
      position absolute
      top -15px
      left -15px
      z-index -1
    &::before
      border-left-color #5FC3E4
      animation next-major-before 2s ease-in-out 0s infinite
    &::after
      border-left-color #E55D87
      animation next-major-after 2s ease-in-out 0s infinite
  @keyframes next-major
    0%
      top 5px
      right 0
    50%
      top 3px
      right -2px
    100%
      top 5px
      right 0
  @keyframes next-major-before
    0%
      top -15px
      left -15px
    50%
      top -7px
      left -19px
    100%
      top -15px
      left -15px
  @keyframes next-major-after
    0%
      top -15px
      left -15px
    50%
      top -11px
      left -17px
    100%
      top -15px
      left -15px
  .audio-next-minor
    width 5px
    height 30px
    background-color #eee
    border-radius 2px
    position absolute
    top 5px
    right 8px
    animation next-minor 2s ease-in-out .5s infinite
    &::before
    &::after
      content ''
      width 5px
      height 30px
      border-radius 2px
      position absolute
      top 0
      left 0
      z-index -1
    &::before
      background-color #5FC3E4
      animation next-minor-before 2s ease-in-out .5s infinite
    &::after
      background-color #E55D87
      animation next-minor-after 2s ease-in-out .5s infinite
  @keyframes next-minor
    0%
      top 5px
      right 8px
    50%
      top 3px
      right 6px
    100%
      top 5px
      right 8px
  @keyframes next-minor-before
    0%
      top 0
      left 0
    50%
      top 4px
      left -4px
    100%
      top 0
      left 0
  @keyframes next-minor-after
    0%
      top 0
      left 0
    50%
      top 2px
      left -2px
    100%
      top 0
      left 0
  .audio-mode
  .audio-collect
    height 30px
    position absolute
    right 0
    cursor pointer
  .audio-volume
    height 30px
    position absolute
    left 0
    width 80px
  .audio-volume-off-icon
  .audio-volume-on-icon
    width 30px
    height 30px
    background-size 20px 20px
    background-position 5px
    background-repeat no-repeat
    position absolute
    top 0
    left 0
    animation volume-icon 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 100%
      height 100%
      background-repeat no-repeat
      position absolute
      top 0
      left 0
    &::before
      animation volume-icon-shadow-1 2s ease-in-out 0s infinite
    &::after
      animation volume-icon-shadow-2 2s ease-in-out 0s infinite
  .audio-volume-off-icon
    background url('../../../assets/images/sprite.png') -74px -195px
    background-size 204px 162px
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -3px -1px
      background-size 204px 162px
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -39px -1px
      background-size 204px 162px
  .audio-volume-on-icon
    background url('../../../assets/images/sprite.png') -39px -195px
    background-size 204px 162px
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -3px -195px
      background-size 204px 162px
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -74px -1px
      background-size 204px 162px
  @keyframes volume-icon
    0%
      top 0
      left 0
    50%
      top -2px
      left -2px
    100%
      top 0
      left 0
  @keyframes volume-icon-shadow-1
    0%
      top 0
      left 0
    50%
      top 2px
      left 2px
    100%
      top 0
      left 0
  @keyframes volume-icon-shadow-2
    0%
      top 0
      left 0
    50%
      top 4px
      left 4px
    100%
      top 0
      left 0
  .audio-volume-bar
    width 50px
    height 10px
    border-radius 2px
    position absolute
    top 10px
    left 30px
    background linear-gradient(90deg, #0099f7, #f11712 25px, #eee 25px)
    animation volume-bar 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 50px
      height 10px
      border-radius 2px
      position absolute
      top 0
      left 0
    &::before
      z-index -1
      background-color #fc354c
      animation volume-bar-shadow-1 2s ease-in-out 0s infinite
    &::after
      z-index -2
      background-color #0abfbc
      animation volume-bar-shadow-2 2s ease-in-out 0s infinite
  .audio-volume-handler
    width 10px
    height 10px
    background-color #f11712
    border-radius 2px
    position absolute
    top 0
    left 20px
    cursor pointer
  @keyframes volume-bar
    0%
      top 10px
      left 30px
    50%
      top 8px
      left 28px
    100%
      top 10px
      left 30px
  @keyframes volume-bar-shadow-1
    0%
      top 0px
      left 0px
    50%
      top 2px
      left 2px
    100%
      top 0px
      left 0px
  @keyframes volume-bar-shadow-2
    0%
      top 0px
      left 0px
    50%
      top 4px
      left 4px
    100%
      top 0px
      left 0px
  .audio-mode
    width 30px
    top 0
  .audio-mode-list-loop
  .audio-mode-song-loop
  .audio-mode-random-loop
    width 100%
    height 100%
    font-weight bold
    position absolute
    top 0
    left 0
    animation mode-loop 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 100%
      height 100%
      position absolute
      top 0
      left 0
    &::before
      animation mode-loop-shadow-1 2s ease-in-out 0s infinite
    &::after
      animation mode-loop-shadow-2 2s ease-in-out 0s infinite
  @keyframes mode-loop
    0%
      top 0
      left 0
    50%
      top -2px
      left -2px
    100%
      top 0
      left 0
  @keyframes mode-loop-shadow-1
    0%
      top 0
      left 0
    50%
      top 2px
      left 2px
    100%
      top 0
      left 0
  @keyframes mode-loop-shadow-2
    0%
      top 0
      left 0
    50%
      top 4px
      left 4px
    100%
      top 0
      left 0
  .audio-mode-list-loop
    background url('../../../assets/images/sprite.png') -141px -260px
    background-size 204px 162px
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -141px -194px
      background-size 204px 162px
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -141px -226px
      background-size 204px 162px
  .audio-mode-song-loop
    background url('../../../assets/images/sprite.png') -174px -196px
    background-size 204px 162px
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -133px -293px
      background-size 204px 162px
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -174px -1px
      background-size 204px 162px
  .audio-mode-random-loop
    background url('../../../assets/images/sprite.png') -99px -293px
    background-size 204px 162px
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -34px -293px
      background-size 204px 162px
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -67px -293px
      background-size 204px 162px
  .audio-collect
    width 30px
    background url('../../../assets/images/sprite.png') -107px -195px
    background-size 204px 162px
    top 0px
    right 40px
    animation collect 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 100%
      height 100%
      position absolute
      top 0
      left 0
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -68px -227px
      background-size 204px 162px
      animation collect-shadow-1 2s ease-in-out 0s infinite
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -107px -164px
      background-size 204px 162px
      animation collect-shadow-2 2s ease-in-out 0s infinite
  @keyframes collect
    0%
      top 0
      right 40px
    50%
      top -2px
      right 42px
    100%
      top 0
      right 40px
  @keyframes collect-shadow-1
    0%
      top 0
      left 0
    50%
      top 2px
      left 2px
    100%
      top 0
      left 0
  @keyframes collect-shadow-2
    0%
      top 0
      left 0
    50%
      top 4px
      left 4px
    100%
      top 0
      left 0
  .audio-song
  .audio-artists-wrapper
  .audio-album
    font-weight bold
    text-align center
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    position absolute
    left 50%
    transform translate(-50%, 0)
  .audio-song
    top 70px
    animation audio-song 2s ease-in-out 0s infinite
  .audio-artists-wrapper
    bottom 70px
    animation audio-artists 2s ease-in-out 0s infinite
  .audio-artists
    cursor pointer
  .audio-album
    bottom 50px
    cursor pointer
    animation audio-album 2s ease-in-out 0s infinite
  .audio-duration
  .audio-progress
    width calc(100% - 100px)
    position absolute
    left 50px
  .audio-duration
    height 12px
    text-align center
    font-size 12px
    left 50%
    bottom 30px
    transform translate(-50%, 0)
    animation audio-duration 2s ease-in-out 0s infinite
  @keyframes audio-song
    0%
      top 70px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
    25%
      top 68px
      left calc(50% + 2px)
      text-shadow -2px 2px 0 #ff4b1f,
                  -4px 4px 0 #1fddff
    75%
      top 68px
      left calc(50% - 2px)
      text-shadow 2px 2px 0 #ff4b1f,
                  4px 4px 0 #1fddff
    100%
      top 70px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
  @keyframes audio-artists
    0%
      bottom 70px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
    25%
      bottom 72px
      left calc(50% + 2px)
      text-shadow -2px 2px 0 #ff4b1f,
                  -4px 4px 0 #1fddff
    75%
      bottom 72px
      left calc(50% - 2px)
      text-shadow 2px 2px 0 #ff4b1f,
                  4px 4px 0 #1fddff
    100%
      bottom 70px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
  @keyframes audio-album
    0%
      bottom 50px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
    25%
      bottom 52px
      left calc(50% + 2px)
      text-shadow -2px 2px 0 #ff4b1f,
                  -4px 4px 0 #1fddff
    75%
      bottom 52px
      left calc(50% - 2px)
      text-shadow 2px 2px 0 #ff4b1f,
                  4px 4px 0 #1fddff
    100%
      bottom 50px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
  @keyframes audio-duration
    0%
      bottom 30px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
    25%
      bottom 32px
      left calc(50% + 2px)
      text-shadow -2px 2px 0 #ff4b1f,
                  -4px 4px 0 #1fddff
    75%
      bottom 32px
      left calc(50% - 2px)
      text-shadow 2px 2px 0 #ff4b1f,
                  4px 4px 0 #1fddff
    100%
      bottom 30px
      left 50%
      text-shadow 0px 0px 0 #ff4b1f,
                  0px 0px 0 #1fddff
  .audio-progress
    height 18px
    border-radius 2px
    position absolute
    bottom 5px
    background linear-gradient(90deg, #0099f7, #f11712 18px, #eee 18px)
    animation progress 2s ease-in-out 0s infinite
    &::before
    &::after
      content ''
      width 100%
      height 100%
      border-radius 2px
      position absolute
      top 0
      left 0
    &::before
      z-index -1
      background-color #fc354c
      animation progress-shadow-1 2s ease-in-out 0s infinite
    &::after
      z-index -2
      background-color #0abfbc
      animation progress-shadow-2 2s ease-in-out 0s infinite
  .audio-progress-handler
    width 18px
    height 18px
    background-color #f11712
    border-radius 2px
    position absolute
    top 0
    left 0
    cursor pointer
  @keyframes progress
    0%
      left 50px
      bottom 5px
    50%
      left 48px
      bottom 7px
    100%
      left 50px
      bottom 5px
  @keyframes progress-shadow-1
    0%
      top 0px
      left 0px
    50%
      top 2px
      left 2px
    100%
      top 0px
      left 0px
  @keyframes progress-shadow-2
    0%
      top 0px
      left 0px
    50%
      top 4px
      left 4px
    100%
      top 0px
      left 0px
</style>
