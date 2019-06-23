<template lang="pug">
  section(
    :class='["album"]'
  )
    section(
      :style='{backgroundImage: `url("${getAlbumDetails.picUrl}")`}'
      :class='["album-info-wrapper"]'
    )
      div(
        :class='["album-info"]'
      )
        h1(
          :class='["album-name"]'
        ) {{ getAlbumDetails.name }}
          span(
            :class='["album-name-alias"]'
            v-for='(alia, index) of getAlbumDetails.alias'
            :key='index'
          ) {{ alia }}
        a(
          :style='{backgroundImage: `url("${getAlbumDetails.artist.picUrl}")`}'
          :class='["album-artist-avatar"]'
          @click='jumpToArtist(getAlbumDetails.artist.id)'
        )
        a(
          :class='["album-artist-name"]'
          @click='jumpToArtist(getAlbumDetails.artist.id)'
        ) {{ getAlbumDetails.artist.name }}
        span(
          :class='["album-create-time"]'
        ) 发行时间 {{ getAlbumDetails.createTime }}
        span(
          :class='["album-create-company"]'
        ) 发行公司 {{ getAlbumDetails.company }}
    ControlAll(
      :list='getAlbumDetails.tracks'
    )
    SongList(
      :list='getAlbumDetails.tracks'
      :album='"album"'
    )
</template>

<script>
import { mapGetters } from 'vuex'
import SongList from 'components/common/song-list'
import ControlAll from 'components/common/control-all'

export default {
  components: {
    SongList,
    ControlAll
  },
  props: {
    albumId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'getAlbumDetails'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestAlbumDetails', this.albumId)
    })()
  },
  methods: {
    jumpToArtist (id) {
      this.$router.push({ name: 'artist', params: { artistId: id } })
    }
  },
  beforeRouteUpdate (to, from, next) {
    (async () => {
      await this.$store.dispatch('requestAlbumDetails', to.params.albumId)
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .album
    font-size .18rem
    margin auto
    width 700px
    background-color rgba(33, 33, 33, .7)
    background-clip padding-box
    @media screen and (max-width 700px)
      width 100vw
  .album-info-wrapper
    width 700px
    height 500px
    padding-top 370px
    background-size cover
    background-position center
    @media screen and (max-width 700px)
      width 100vw
  .album-info
    width 100%
    height 125px
    color #eee
    background linear-gradient(0deg, rgba(60, 60, 60, 1), transparent)
    text-shadow 1px 1px 0 #111
  .album-name
  .album-artist-avatar
  .album-artist-name
  .album-create-time
  .album-create-company
    display block
    margin 5px 0 0 5px
    width 100%
  .album-name
    font-size 18px
    font-weight bold
  .album-name-alias
    font-size 12px
    color #ddd
  .album-artist-avatar
    display inline-block
    margin-right 10px
    width 25px
    height 25px
    background-size contain
    background-repeat no-repeat
    border-radius 50%
    vertical-align bottom
    cursor pointer
  .album-artist-name
    display inline-block
    font-size 14px
    color #1c92d2
    width calc(700px - 50px)
    text-shadow 1px 1px 0 rgba(30, 30, 30, .7)
    cursor pointer
    @media screen and (max-width 700px)
      width calc(100vw - 50px)
  .album-create-time
  .album-create-company
    font-size 12px
</style>
