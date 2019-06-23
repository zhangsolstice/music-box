<template lang="pug">
  section(
    :class='["playlist"]'
  )
    section(
      :style='{backgroundImage: `url("${getPlaylistDetails.coverImgUrl}")`}'
      :class='["playlist-info-wrapper"]'
    )
      div(
        :class='["playlist-info"]'
      )
        h1(
          :class='["playlist-name"]'
        ) {{ getPlaylistDetails.name }}
        a(
          :style='{backgroundImage: `url("${getPlaylistDetails.userAvatarUrl}")`}'
          :class='["playlist-creator-avatar"]'
          @click='jumpToCreator(getPlaylistDetails.userId)'
        )
        a(
          :class='["playlist-creator-nickname"]'
          @click='jumpToCreator(getPlaylistDetails.userId)'
        ) {{ getPlaylistDetails.userNickname }}
        span(
          :class='["playlist-create-time"]'
        ) {{ getPlaylistDetails.createTime }} 创建
        span(
          :class='["playlist-tag"]'
          @click='jumpToPlaylists(tag)'
          v-for='(tag, index) of getPlaylistDetails.tags'
          :key='index'
        ) {{ tag }}
        span(
          :class='["playlist-tag"]'
          v-if='getPlaylistDetails.tags.length === 0'
        ) 全部
        div(
          :class='["playlist-related"]'
        )
          div(
            :class='["playlist-related-item"]'
            v-for='(item, index) of getRelatedPlaylists'
            :key='item.id'
          )
            a(
              :style='{backgroundImage: `url(${item.coverImgUrl})`}'
              :class='["playlist-related-cover"]'
              @click='jumpToPlaylist(item.id)'
            )
            a(
              :class='["playlist-related-name"]'
              @click='jumpToPlaylist(item.id)'
            ) {{ item.name }}
            a(
              :class='["playlist-related-creator"]'
              @click='jumpToCreator(item.creator.userId)'
            ) by {{ item.creator.nickname }}
    ControlAll(
      :list='getPlaylistDetails.tracks'
    )
    SongList(
      :list='getPlaylistDetails.tracks'
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
    playlistId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getPlaylistDetails',
      'getRelatedPlaylists'
    ])
  },
  created () {
    (async () => {
      let playlistId = await this.$store.dispatch('requestPlaylistDetails', this.playlistId)
      await this.$store.dispatch('requestRelatedPlaylists', playlistId)
    })()
  },
  methods: {
    jumpToPlaylist (id) {
      this.$router.push({ name: 'playlist', params: { playlistId: id } })
    },
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    },
    jumpToPlaylists (cat) {
      this.$router.push({ name: 'playlists', params: { type: 'hot', cat: cat } })
    }
  },
  beforeRouteUpdate (to, from, next) {
    (async () => {
      let playlistId = await this.$store.dispatch('requestPlaylistDetails', to.params.playlistId)
      await this.$store.dispatch('requestRelatedPlaylists', playlistId)
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .playlist
    font-size .18rem
    margin auto
    width 700px
    background-color rgba(33, 33, 33, .7)
    background-clip padding-box
    @media screen and (max-width 700px)
      width 100vw
  .playlist-info-wrapper
    width 700px
    height 500px
    padding-top 170px
    background-size cover
    background-position center
    @media screen and (max-width 700px)
      width 100vw
  .playlist-info
    width 100%
    height 325px
    color #eee
    background linear-gradient(0deg, rgba(60, 60, 60, 1), transparent)
    text-shadow 1px 1px 0 #111
  .playlist-name
  .playlist-creator-avatar
  .playlist-creator-nickname
  .playlist-create-time
    display block
    margin 5px 0 0 5px
    width 100%
  .playlist-name
    font-size 18px
    font-weight bold
  .playlist-creator-avatar
    display inline-block
    margin-right 10px
    width 25px
    height 25px
    background-size contain
    background-repeat no-repeat
    border-radius 50%
    vertical-align bottom
    cursor pointer
  .playlist-creator-nickname
    display inline-block
    font-size 14px
    color #1c92d2
    width calc(700px - 50px)
    text-shadow 1px 1px 0 rgba(30, 30, 30, .7)
    cursor pointer
    @media screen and (max-width 700px)
      width calc(100vw - 50px)
  .playlist-create-time
    font-size 12px
  .playlist-tag
    display inline-block
    font-size 14px
    margin 10px 6px 0
    padding 3px
    border 1px solid #aaa
    border-radius 6px
    cursor pointer
  .playlist-related
    margin-top 15px
    width 100%
    @media screen and (max-width 700px)
      width 100vw
      white-space nowrap
      overflow-x auto
      overflow-y hidden
      -webkit-overflow-scrolling touch
  .playlist-related-item
    display inline-block
    margin 0 5px 10px
    width 130px
    height 170px
    vertical-align bottom
  .playlist-related-cover
    display block
    width 130px
    height 130px
    background-size contain
    background-repeat no-repeat
    box-shadow 0 0 5px #999, 0 0 10px #999 inset
    cursor pointer
  .playlist-related-name
    display block
    margin-top 5px
    font-size 14px
    font-weight bold
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
  .playlist-related-creator
    display block
    margin 5px 0 0 4px
    font-size 12px
    color #999
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
</style>
