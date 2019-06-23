<template lang="pug">
  section(
    :class='["playlists"]'
  )
    div(
      :class='["playlists-items-wrapper"]'
    )
      div(
        :class='["playlists-item"]'
        v-for='(playlist, index) of getSearch.result'
        :key='index'
      )
        a(
          :class='["playlists-item-cover"]'
          @click='jumpToPlaylist(playlist.id)'
        )
          img(
            :src='playlist.coverImgUrl'
          )
          div(
            :class='["Playlists-item-info"]'
          )
            span(
              :class='["playlists-item-playcount-icon"]'
            )
            span(
              :class='["playlists-item-playcount"]'
            ) {{ playlist.playCount }}
            span(
              :class='["playlists-item-playall"]'
              @click='playAllSongs(playlist.id)'
            )
        h4(
          :class='["playlists-item-name"]'
          @click='jumpToPlaylist(playlist.id)'
        ) {{ playlist.name }}
        p(
          :class='["playlists-item-creator-nickname"]'
          @click='jumpToCreator(playlist.creator.id)'
        ) by {{ playlist.creator.name }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getSearch'
    ])
  },
  methods: {
    jumpToPlaylist (id) {
      this.$router.push(`/playlist/${id}`)
    },
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    },
    playAllSongs (id) {
      (async () => {
        await this.$store.dispatch('requestPlaylistDetails', id)
        let list = await this.$store.getters.getPlaylistDetails.tracks
        await localStorage.setItem(
          'currentSongList',
          JSON.stringify(list)
        )
        await localStorage.setItem(
          'currentSongIndex',
          0
        )
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: false,
          playerList: list
        })
        await this.$store.dispatch('requestPlayerCurrentSongIndex', 0)
        await this.$store.dispatch(
          'requestCurrentSong',
          [this.$store.getters.getPlayerList[this.$store.getters.getPlayerCurrentSongIndex].id]
        )
        let audio = document.getElementsByClassName('audio')[0]
        audio.play()
        this.$store.dispatch('switchIsPlayed', true)
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .playlists
    width 100%
    height 100%
    font-size 12px
    color #eee
  .playlists-items-wrapper
    display grid
    grid-template-rows repeat(auto, auto)
    padding 5px
    width 100%
    @media screen and (min-width 1770px)
      grid-template-columns repeat(11, 1fr)
    @media screen and (max-width 1770px)
      grid-template-columns repeat(10, 1fr)
    @media screen and (max-width 1600px)
      grid-template-columns repeat(9, 1fr)
    @media screen and (max-width 1440px)
      grid-template-columns repeat(8, 1fr)
    @media screen and (max-width 1280px)
      grid-template-columns repeat(7, 1fr)
    @media screen and (max-width 1100px)
      grid-template-columns repeat(6, 1fr)
    @media screen and (max-width 950px)
      grid-template-columns repeat(5, 1fr)
    @media screen and (max-width 768px)
      grid-template-columns repeat(4, 1fr)
    @media screen and (max-width 630px)
      grid-template-columns repeat(3, 1fr)
    @media screen and (max-width 470px)
      grid-template-columns repeat(2, 1fr)
  .playlists-item
    width 13%
    min-width 150px
    padding 5px
    margin 5px
  .playlists-item-cover
    display block
    position relative
  .Playlists-item-info
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .playlists-item-playcount-icon
  .playlists-item-playall
    background-size contain
    background-repeat no-repeat
  .playlists-item-playcount-icon
    width 10px
    height 10px
    background url('../../../assets/images/sprite.png') -4px -117px
    background-size 102px 81px
    position absolute
    left 5px
    bottom 4px
  .playlists-item-playcount
    font-size 12px
    position absolute
    left 18px
    bottom 1px
  .playlists-item-playall
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    position absolute
    right 0
    bottom 0
    cursor pointer
  .playlists-item-name
    padding-top 5px
    font-size 14px
    font-weight bold
    color #eee
    text-shadow 1px 1px 0 #333
    word-break break-all
    cursor pointer
  .playlists-item-creator-nickname
    padding 5px 5px 0
    font-size 12px
    color #ccc
    cursor pointer
</style>
