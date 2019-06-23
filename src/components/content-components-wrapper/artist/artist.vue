<template lang="pug">
  div(
    :class='["artist"]'
  )
    section(
      :style='{backgroundImage: `url("${getArtist.backgroundUrl}")`}'
      :class='["artist-info-wrapper"]'
    )
      div(
        :class='["artist-info"]'
      )
        div(
          :style='{backgroundImage: `url("${getArtist.avatarUrl}")`}'
          :class='["artist-avatar"]'
          @click='jumpToCreator(getArtist.userId)'
        )
        h1(
          :class='["artist-nickname"]'
          @click='jumpToCreator(getArtist.userId)'
        ) {{ getArtist.name}}
        p(
          :class='["artist-signature"]'
        ) 个人介绍：{{ getArtist.desc.slice(0, 200) }} ...
        div(
          :class='["artist-albums-wrapper"]'
        )
          div(
            :class='["artist-albums-item"]'
            v-for='(album, index) of getArtist.albums'
            :key='album.id'
          )
            a(
              :style='{backgroundImage: `url("${album.picUrl}")`}'
              :class='["artist-albums-cover"]'
              @click='jumpToAlbum(album.id)'
            )
            h4(
              :class='["artist-albums-name"]'
              @click='jumpToAlbum(album.id)'
            ) {{ album.name }}
    ControlAll(
      :list='getArtist.tracks'
    )
    SongList(
      :list='getArtist.tracks'
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
    artistId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'getArtist'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestArtistInfoAndSongs', {
        id: this.artistId,
        limit: 1000,
        offset: 0
      })
    })()
  },
  methods: {
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    },
    jumpToAlbum (id) {
      this.$router.push(`/album/${id}`)
    }
  },
  beforeRouteUpdate (to, from, next) {
    (async () => {
      await this.$store.dispatch('requestArtistInfoAndSongs', {
        id: to.params.artistId,
        limit: 1000,
        offset: 0
      })
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .artist
    margin auto
    width 700px
    height 100%
    font-size 12px
    @media screen and (max-width 700px)
      width 100%
  .artist-info-wrapper
    width 700px
    height 500px
    background-size cover
    background-position center center
    position relative
    @media screen and (max-width 700px)
      width 100%
  .artist-info
    width 100%
    position absolute
    bottom 0
  .artist-avatar
  .artist-nickname
  .artist-signature
    margin auto
    padding-top 10px
    color #eee
    text-align center
    text-shadow 1px 1px 0 #333
  .artist-avatar
    width 80px
    height 80px
    background-size cover
    background-position center center
    border-radius 50%
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    vertical-align bottom
    cursor pointer
  .artist-nickname
    font-size 20px
    font-weight bold
    color #009fab
    cursor pointer
  .artist-signature
    padding 10px 20px 0
    font-size 12px
  .artist-albums-wrapper
    width 100%
    white-space nowrap
    overflow-x auto
    overflow-y hidden
    -webkit-overflow-scrolling touch
  .artist-albums-item
    display inline-block
    margin 10px
    width 150px
    height 180px
  .artist-albums-cover
    display block
    width 150px
    height 150px
    background-size cover
    background-position center center
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    cursor pointer
  .artist-albums-name
    padding 10px 0
    font-size 12px
    font-weight bold
    color #eee
    text-shadow 1px 1px 0 #333
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
</style>
