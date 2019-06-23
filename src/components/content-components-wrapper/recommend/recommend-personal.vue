<template lang="pug">
  div(
    :class='["personal-wrapper"]'
  )
    h1(
      :class='["personal-header"]'
    ) 个性推荐
    div(
      :class='["personal"]'
    )
      section(
        :class='["personal-songs"]'
      )
        div(
          :class='["personal-songs-playlists-bg"]'
        )
          a(
            @click='goToRecommendSongsPage'
          )
            img(
                src='../../../assets/images/recommend-songs.png'
              )
            span {{ date }}
          div(
            :class='["personal-songs-playlists-info-play"]'
          )
            span(
              @click='playAllSongs'
            )
        div(
          :class='["personal-songs-playlists-intro"]'
        )
          h4(
            @click='goToRecommendSongsPage'
          ) 每日歌曲推荐
          p 根据你的口味生成，每天6:00更新
      section(
        :class='["personal-playlists"]'
        v-for='(personalPlaylist, index) of currentPlaylists'
        :key='personalPlaylist.id'
      )
        div(
          :class='["personal-songs-playlists-bg"]'
        )
          a(
            @click='goToPlaylistPage(personalPlaylist.id)'
          )
            img(
              :src='personalPlaylist.picUrl'
            )
          div(
            :class='["personal-songs-playlists-info-play"]'
          )
            span(
              @click='playAllPlaylistSongs(personalPlaylist.id)'
            )
            span {{ personalPlaylist.playcount }}
            span
        div(
          :class='["personal-songs-playlists-intro"]'
        )
          h4(
            @click='goToPlaylistPage(personalPlaylist.id)'
          ) {{ personalPlaylist.name }}
          p  {{ personalPlaylist.copywriter}}
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      currentPlaylists: '',
      date: new Date().getDate()
    }
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestRecommend')
      if (window.innerWidth > 1024) {
        this.currentPlaylists = this.$store.getters.getUserInfo.recommendPlaylists.slice(0, 6)
      } else {
        this.currentPlaylists = this.$store.getters.getUserInfo.recommendPlaylists
      }
    })()
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        this.currentPlaylists = this.$store.getters.getUserInfo.recommendPlaylists.slice(0, 6)
      } else {
        this.currentPlaylists = this.$store.getters.getUserInfo.recommendPlaylists
      }
    })
  },
  methods: {
    goToPlaylistPage (id) {
      this.$router.push(`/playlist/${id}`)
    },
    goToRecommendSongsPage () {
      this.$router.push('/recommendsongs')
    },
    playAllSongs () {
      (async () => {
        await this.$store.dispatch('requestRecommend')
        let list = await this.$store.getters.getUserInfo.recommendSongs
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
    },
    playAllPlaylistSongs (id) {
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
  .personal-header
    padding 10px
    font-size 20px
    font-weight bold
    color #eee
    text-shadow 2px 2px 0 #333
    border-bottom 1px solid
    border-image linear-gradient(90deg, #eee, transparent) 1
    @media screen and (max-width 1024px)
      box-shadow 0 1px 0 #aaa
      border-image none
  .personal
    display flex
    font-size .14rem
    width 100%
    padding 20px 0
    @media screen and (max-width 1024px)
      display block
      width 100%
      overflow-x auto
      overflow-y hidden
      -webkit-overflow-scrolling touch
      white-space nowrap
  .personal-songs
  .personal-playlists
    display inline-block
    width 11vw
    margin 0 10px
    vertical-align top
    @media screen and (max-width 1024px)
      width 150px
  .personal-songs-playlists-bg
    position relative
    overflow hidden
    & a
      display block
      position relative
      & img
        width 100%
      & span
        font-size 80px
        font-weight bold
        color rgba(60, 60, 60, .7)
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
    @media screen and (max-width 1024px)
      width 150px
      height 150px
  .personal-songs-playlists-info-play
    width 100%
    height 30px
    position absolute
    bottom 0
    z-index 1
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    & span
      display inline-block
      color #fff
      background-size contain
      background-position center center
      background-repeat no-repeat
      position absolute
    & span:nth-child(1)
      width 25px
      height 25px
      right 0
      bottom 0
      background url('../../../assets/images/sprite.png') -8px -169px
      background-size 255px 203px
      cursor pointer
    & span:nth-child(2)
      font-size .12rem
      left 18px
      bottom 1px
    & span:nth-child(3)
      width 10px
      height 10px
      left 5px
      bottom 4px
      background url('../../../assets/images/sprite.png') -4px -117px
      background-size 102px 81px
  .personal-songs-playlists-intro
    margin-top 5px
    & h4
      display inline-block
      font-weight bold
      color #eee
      text-shadow 1px 1px 0 #333
      white-space normal
      word-break break-all
      cursor pointer
    & p
      font-size .12rem
      font-weight light
      color #ddd
      text-shadow 1px 1px 0 #333
      margin-top 5px
      word-break break-all
      @media screen and (max-width 1024px)
        display none
</style>
