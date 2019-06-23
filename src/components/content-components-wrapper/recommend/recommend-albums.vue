<template lang="pug">
  section(
    :class='["albums"]'
  )
    h1(
      :class='["albums-header"]'
    ) 最新专辑
      span(
        :class='["albums-more"]'
        @click='jumpToAlbums'
      ) {{ '更多>>' }}
    div(
      :class='["albums-content"]'
    )
      div(
        :class='["albums-item"]'
        v-for='(album, index) of currentAlbums'
        :key='album.id'
      )
        a(
          :class='["albums-item-cover-wrapper"]'
        )
          img(
            :class='["albums-item-cover"]'
            :src='album.picUrl'
          )
          span(
            :class='["albums-item-play"]'
            @click='playAllSongs(album.id)'
          )
        h4(
          :class='["albums-item-name"]'
          @click='jumpToAlbumDetails(album.id)'
        ) {{ album.name }}
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      currentWidth: '',
      currentAlbums: []
    }
  },
  mounted () {
    this.currentWidth = window.innerWidth;
    (async () => {
      await this.$store.dispatch('requestNewAlbums')
      if (window.innerWidth > 1024) {
        this.currentAlbums = this.$store.getters.getNewAlbums.slice(0, 6)
      } else {
        this.currentAlbums = this.$store.getters.getNewAlbums
      }
    })()
    window.addEventListener('resize', () => {
      this.currentWidth = window.innerWidth
      if (window.innerWidth > 1024) {
        this.currentAlbums = this.$store.getters.getNewAlbums.slice(0, 6)
      } else {
        this.currentAlbums = this.$store.getters.getNewAlbums
      }
    })
  },
  methods: {
    jumpToAlbumDetails (id) {
      this.$router.push(`/album/${id}`)
    },
    jumpToAlbums () {
      this.$router.push(`/albums`)
    },
    playAllSongs (id) {
      (async () => {
        await this.$store.dispatch('requestAlbumDetails', id)
        let list = await this.$store.getters.getAlbumDetails.tracks
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
  .albums
    width 100%
  .albums-header
    padding 10px
    font-size 20px
    font-weight bold
    color #eee
    text-shadow 2px 2px 0 #333
    border-bottom 1px solid
    border-image linear-gradient(90deg, #eee, transparent) 1
    @media screen and (max-width 768px)
      box-shadow 0 1px 0 #aaa
      border-image none
  .albums-more
    padding-left 10px
    font-size 12px
    color #eee
    cursor pointer
  .albums-content
    display flex
    width 100%
    padding 20px 0
    @media screen and (max-width 1024px)
      display block
      padding 20px 0 40px
      white-space nowrap
      overflow-x auto
      overflow-y hidden
      -webkit-overflow-scrolling touch
  .albums-item
    width calc(100% / 7)
    margin 0 10px
    @media screen and (max-width 1024px)
      display inline-block
      width 150px
      height 150px
  .albums-item-cover-wrapper
    display block
    position relative
  .albums-item-play
    width 40px
    height 40px
    border-radius 50%
    background url('../../../assets/images/sprite.png') -10px -272px
    background-size 408px 325px
    background-repeat no-repeat
    box-shadow 0 0 10px rgba(0, 0, 0, .35)
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    cursor pointer
  .albums-item-name
    padding-top 10px
    font-size 14px
    color #eee
    text-shadow 1px 1px 0 #333
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
</style>
