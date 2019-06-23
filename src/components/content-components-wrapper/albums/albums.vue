<template lang="pug">
  section(
    :class='["albums"]'
  )
    div(
      :class='["albums-items-wrapper"]'
    )
      div(
        :class='["albums-item"]'
        v-for='(album, index) of getTopAlbums'
        :key='album.id'
      )
        a(
          :class='["albums-item-cover"]'
          @click='jumpToAlbum(album.id)'
        )
          img(
            :src='album.picUrl'
          )
        h4(
          :class='["albums-item-name"]'
          @click='jumpToAlbum(album.id)'
        ) {{ album.name }}
        p(
          :class='["albums-item-creator-nickname"]'
          v-for='(artist, index) of album.artists'
          :key='artist.id'
          @click='jumpToArtist(artist.id)'
        ) by {{ artist.name}}
        p(
          :class='["albums-item-create-time"]'
        ) 发行公司：{{album.company }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      offsetIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'getTopAlbums'
    ])
  },
  mounted () {
    this.$store.dispatch('requestTopAlbums', {
      limit: 55,
      offset: 0
    })
    this.offsetIndex = 55
    window.addEventListener('scroll', () => {
      setTimeout(() => {
        if (document.body.scrollHeight - window.innerHeight - window.pageYOffset === 0) {
          this.offsetIndex += 10
          this.$store.dispatch('requestTopAlbums', {
            limit: 10,
            offset: this.offsetIndex
          })
        }
      }, 1000)
    })
  },
  methods: {
    jumpToAlbum (id) {
      this.$router.push(`/album/${id}`)
    },
    jumpToArtist (id) {
      this.$router.push(`/artist/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .albums
    width 100%
    height 100%
    font-size 12px
    color #eee
  .albums-items-wrapper
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
  .albums-item
    width 13%
    min-width 150px
    padding 5px
    margin 5px
  .albums-item-cover
    display block
    position relative
  .albums-item-info
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .albums-item-name
    padding-top 5px
    font-size 14px
    font-weight bold
    color #eee
    text-shadow 1px 1px 0 #333
    word-break break-all
    cursor pointer
  .albums-item-creator-nickname
    padding 5px 5px 0
    font-size 12px
    color #ccc
    word-break break-all
    cursor pointer
  .albums-item-create-time
    padding-left 5px
    font-size 12px
    color #aaa
</style>
