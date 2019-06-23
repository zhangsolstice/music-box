<template lang="pug">
  div(
    :class='["newsongs"]'
  )
    h1(
      :class='["newsongs-header"]'
    ) 推荐新歌
    div(
      :class='["newsongs-content"]'
    )
      div(
        :class='["newsongs-item"]'
        v-for='(item, index) of songs'
        :key='item.id'
      )
        a(
          :class='["newsongs-item-cover-wrapper"]'
        )
          img(
            :class='["newsongs-item-cover"]'
            :src='item.album.picUrl'
          )
          a(
            :class='["newsongs-item-play"]'
            @click='addSongAtLast(item)'
          )
        div(
          :class='["newsongs-item-info"]'
        )
          h4(
            :class='["newsongs-item-info-name"]'
          ) {{ item.name }}
          p(
            :class='["newsongs-item-info-artists"]'
          )
            span(
              :class='["newsongs-item-info-artist"]'
              v-for='(artist, index) of item.artist'
              :key='artist.id'
              @click='jumpToArtist(artist.id)'
            ) {{ artist.name }} {{ index !== item.artist.length - 1 ? ' / ' : '' }}
          p(
            :class='["newsongs-item-info-album"]'
            @click='jumpToAlbumDetails(item.album.id)'
          ) {{ item.album.name }}
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      songs: []
    }
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestPersonalNewSongs')
      this.songs = this.$store.getters.getPersonalNewSongs
    })()
  },
  methods: {
    jumpToAlbumDetails (id) {
      this.$router.push(`/album/${id}`)
    },
    jumpToArtist (id) {
      this.$router.push(`/artist/${id}`)
    },
    addSongAtLast (song) {
      (async () => {
        await localStorage.setItem(
          'currentSongList',
          JSON.stringify(JSON.parse(localStorage.getItem('currentSongList')).concat(song))
        )
        await localStorage.setItem(
          'currentSongIndex',
          JSON.parse(localStorage.getItem('currentSongList')).length - 1
        )
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: true,
          playerList: song
        })
        await this.$store.dispatch('requestPlayerCurrentSongIndex', this.$store.getters.getPlayerList.length - 1)
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .newsongs
    width 100%
  .newsongs-header
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
  .newsongs-content
    display grid
    grid-template-rows repeat(5, 1fr)
    grid-template-columns repeat(2, 50%)
    grid-gap 30px 10px
    padding 20px
    @media screen and (max-width 1024px)
      grid-gap 30px 20px
  .newsongs-item
    position relative
    @media screen and (min-width 783px) and (max-width 1024px)
      width 200px
    @media screen and (max-width 782px)
      width 150px
  .newsongs-item-cover-wrapper
    display inline-block
    width 40%
    vertical-align top
    position relative
  .newsongs-item-play
    width 40px
    height 40px
    background url('../../../assets/images/sprite.png') -10px -272px
    background-size 408px 325px
    background-repeat no-repeat
    border-radius 50%
    box-shadow 0 0 10px rgba(0, 0, 0, .35)
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    cursor pointer
  .newsongs-item-info
    width 60%
    padding 5px
    color #eee
    position absolute
    top 50%
    right 0
    transform translate(0, -50%)
  .newsongs-item-info-name
  .newsongs-item-info-artists
  .newsongs-item-info-album
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .newsongs-item-info-name
    font-size 16px
    font-weight bold
    text-shadow 1px 1px 0 #333
  .newsongs-item-info-artists
    font-size 14px
    cursor pointer
  .newsongs-item-info-album
    font-size 12px
    color #ddd
    cursor pointer
</style>
