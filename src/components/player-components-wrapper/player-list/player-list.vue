<template lang="pug">
  section(
    :class='["player-list", active ? "player-list-active" : ""]'
  )
    div(
      :class='["player-list-item"]'
      v-for='(song, index) of getPlayerList'
      :key='song.id'
    )
      span(
        :class='["player-list-index", index === +getPlayerCurrentSongIndex ? "player-list-index-active" : ""]'
      ) {{ index }}
      span(
        :class='["player-list-songname", index === +getPlayerCurrentSongIndex ? "player-list-songname-active" : ""]'
        @click='switchToNewSong(song.id, index)'
      ) {{ song.name }}
      span(
        :class='["player-list-duration", index === +getPlayerCurrentSongIndex ? "player-list-duration-active" : ""]'
      ) {{ song.duration }}
      a(
        :class='["player-list-artist", index === +getPlayerCurrentSongIndex ? "player-list-artist-active" : ""]'
        @click='jumpToArtist(song.artist[0].id)'
      ) {{ song.artist[0].name }}
      a(
        :class='["player-list-album", index === +getPlayerCurrentSongIndex ? "player-list-album-active" : ""]'
        @click='jumpToAlbum(song.album.id)'
      ) {{ song.album.name }}
      div(
        :class='["player-list-control-collect", index === +getPlayerCurrentSongIndex ? "player-list-control-collect-active" : ""]'
        @click='collectSong(song.id)'
      )
      div(
        :class='["player-list-control-del", index === +getPlayerCurrentSongIndex ? "player-list-control-del-active" : ""]'
        @click='delSong(index)'
      )
</template>

<script>
import { mapGetters } from 'vuex'
// import { audioControl } from '../audio.js'

export default {
  components: {

  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentSong',
      'getPlayerList',
      'getPlayerCurrentSongIndex'
    ])
  },
  mounted () {

  },
  methods: {
    jumpToArtist (id) {
      this.$router.push({ name: 'artist', params: { artistId: id } })
      this.$store.dispatch('switchPlayer')
    },
    jumpToAlbum (id) {
      this.$router.push({ name: 'album', params: { albumId: id } })
      this.$store.dispatch('switchPlayer')
    },
    switchToNewSong (id, index) {
      (async () => {
        await this.$store.dispatch(
          'requestCurrentSong',
          [id]
        )
        await localStorage.setItem('currentSongIndex', index)
        await this.$store.dispatch('requestPlayerCurrentSongIndex', index)
        let audio = document.getElementsByClassName('audio')[0]
        audio.play()
        this.$store.dispatch('switchIsPlayed', true)
      })()
    },
    delSong (index) {
      let audio = document.getElementsByClassName('audio')[0];
      (async () => {
        let list = this.getPlayerList
        list.splice(index, 1)
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: false,
          playerList: list
        })
        await localStorage.setItem('currentSongList', JSON.stringify(list))
        await localStorage.setItem('currentSongIndex', index === this.getPlayerList.length ? 0 : index)
        await this.$store.dispatch('requestPlayerCurrentSongIndex', index === this.getPlayerList.length ? 0 : index)
        if (this.getPlayerList.length === 0) {
          await this.$store.dispatch('requestCurrentSong', [405167260])
        } else {
          await this.$store.dispatch('requestCurrentSong', index === this.getPlayerList.length ? [this.getPlayerList[0].id] : [this.getPlayerList[index].id])
        }
        await this.$store.dispatch('switchIsPlayed', true)
        audio.play()
        document.getElementsByClassName('lyric')[0].style.transform = 'translate(0, 90px)'
      })()
    },
    collectSong (id) {
      this.$store.dispatch('requestCollectSongs', [id])
      this.$store.dispatch('switchIsCollect', true)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .player-list
    width 100%
    height 100%
    background-color #333
    position absolute
    top 100%
    left -100%
    z-index -100000
    opacity 0
    overflow-x hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
    transition all .5s ease-in-out
  .player-list-active
    top 0
    left 0
    z-index 0
    opacity .8
    transition all .5s ease-in-out
  .player-list-item
    display flex
    width 100%
    height 30px
    line-height 30px
    &:last-of-type
      margin-bottom 30px
  .player-list-index
  .player-list-songname
  .player-list-duration
  .player-list-artist
  .player-list-album
  .player-list-control-collect
  .player-list-control-del
    padding 0 0 0 5px
    height 30px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .player-list-index
    width 30px
    text-align center
  .player-list-index-active
    animation song-info 2s ease-in-out 0s infinite
  .player-list-songname
    width calc((100% - 140px) * 0.5)
    cursor pointer
  .player-list-songname-active
    animation song-info 2s ease-in-out .15s infinite
  .player-list-duration
    width 50px
  .player-list-duration-active
    animation song-info 2s ease-in-out .3s infinite
  .player-list-artist
    width calc((100% - 140px) * 0.25)
    cursor pointer
  .player-list-artist-active
    animation song-info 2s ease-in-out .45s infinite
  .player-list-album
    width calc((100% - 140px) * 0.25)
    cursor pointer
  .player-list-album-active
    animation song-info 2s ease-in-out .6s infinite
  @keyframes song-info
    0%
      transform translate(0, 0)
      text-shadow 0 0 0 #f7797d,
                  0 0 0 #fbd786,
                  0 0 0 #c6ffdd
    50%
      transform translate(-2px, -2px)
      text-shadow 2px 2px 0 #f7797d,
                  4px 4px 0 #fbd786,
                  6px 6px 0 #c6ffdd
    100%
      transform translate(0, 0)
      text-shadow 0 0 0 #f7797d,
                  0 0 0 #fbd786,
                  0 0 0 #c6ffdd
  .player-list-control-collect
  .player-list-control-del
    width 30px
    background-size 20px 20px
    background-position 5px 5px
    background-repeat no-repeat
    cursor pointer
  .player-list-control-collect
    background url('../../../assets/images/sprite.png') -107px -195px
    background-size 204px 162px
  .player-list-control-del
    background url('../../../assets/images/sprite.png') -98px -261px
    background-size 204px 162px
  .player-list-control-collect-active
  .player-list-control-del-active
    position relative
    &::before
    &::after
      content ''
      width 30px
      height 30px
      position absolute
      top 0
      left 0
  .player-list-control-collect-active
    animation collect-active 2s ease-in-out .7s infinite
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -68px -227px
      background-size 204px 162px
      animation control-active-shadow-1 2s ease-in-out .7s infinite
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -108px -1px
      background-size 204px 162px
      animation control-active-shadow-2 2s ease-in-out .7s infinite
  .player-list-control-del-active
    animation del-active 2s ease-in-out .8s infinite
    &::before
      z-index -1
      background url('../../../assets/images/sprite.png') -33px -261px
      background-size 204px 162px
      animation control-active-shadow-1 2s ease-in-out .8s infinite
    &::after
      z-index -2
      background url('../../../assets/images/sprite.png') -66px -261px
      background-size 204px 162px
      animation control-active-shadow-2 2s ease-in-out .8s infinite
  @keyframes collect-active
    0%
      top 0
      left 0
    50%
      top -2px
      left -2px
    100%
      top 0
      left 0
  @keyframes del-active
    0%
      top 0
      left 0
    50%
      top -2px
      left -2px
    100%
      top 0
      left 0
  @keyframes control-active-shadow-1
    0%
      top 0
      left 0
    50%
      top 2px
      left 2px
    100%
      top 0
      left 0
  @keyframes control-active-shadow-2
    0%
      top 0
      left 0
    50%
      top 4px
      left 4px
    100%
      top 0
      left 0
</style>
