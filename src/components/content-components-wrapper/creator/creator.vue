<template lang="pug">
  section(
    :class='["creator"]'
  )
    section(
      :style='{backgroundImage: `url("${getCreator.backgroundUrl}")`}'
      :class='["creator-info-wrapper"]'
    )
      div(
        :class='["creator-info"]'
      )
        div(
          :style='{backgroundImage: `url("${getCreator.avatarUrl}")`}'
          :class='["creator-avatar"]'
        )
        h1(
          :class='["creator-nickname"]'
        ) {{ getCreator.nickname}}
        p(
          v-if='getCreator.allAuthTypes'
          :class='["creator-types"]'
        )
          span(
            :class='["creator-type"]'
            v-for='(type, index) of getCreator.allAuthTypes'
            :key='index'
          )  {{ type }}
        p(
          :class='["creator-signature"]'
        ) 个人介绍：{{ getCreator.signature}}
    h1(
      :class='["creator-ownplaylists-header"]'
    ) 创建的歌单
    section(
      v-if='getCreator.ownPlaylists'
      :class='["creator-ownplaylists"]'
    )
      div(
        :class='["creator-ownplaylists-item"]'
        v-for='(ownPlaylist, index) of getCreator.ownPlaylists'
        :key='ownPlaylist.id'
      )
        a(
          :style='{backgroundImage: `url("${ownPlaylist.coverImgUrl}")`}'
          :class='["creator-ownplaylists-item-cover"]'
          @click='jumpToPlaylistDetails(ownPlaylist.id)'
        )
          div(
            :class='["creator-ownplaylists-item-info-play"]'
          )
            span(
              :class='["creator-ownplaylists-item-playcount-icon"]'
            )
            span(
              :class='["creator-ownplaylists-item-playcount"]'
            ) {{ ownPlaylist.playCount }}
            span(
              :class='["creator-ownplaylists-item-playall"]'
            )
        a(
          :class='["creator-ownplaylists-item-name"]'
          @click='jumpToPlaylistDetails(ownPlaylist.id)'
        ) {{ ownPlaylist.name }}
    h1(
      :class='["creator-collectplaylists-header"]'
    ) 收藏的歌单
    section(
      v-if='getCreator.collectPlaylists'
      :class='["creator-collectplaylists"]'
    )
      div(
        :class='["creator-collectplaylists-item"]'
        v-for='(collectPlaylist, index) of getCreator.collectPlaylists'
        :key='collectPlaylist.id'
      )
        a(
          :style='{backgroundImage: `url("${collectPlaylist.coverImgUrl}")`}'
          :class='["creator-collectplaylists-item-cover"]'
          @click='jumpToPlaylistDetails(collectPlaylist.id)'
        )
          div(
            :class='["creator-collectplaylists-item-info-play"]'
          )
            span(
              :class='["creator-collectplaylists-item-playcount-icon"]'
            )
            span(
              :class='["creator-collectplaylists-item-playcount"]'
            ) {{ collectPlaylist.playCount }}
            span(
              :class='["creator-collectplaylists-item-playall"]'
            )
        a(
          :class='["creator-collectplaylists-item-name"]'
          @click='jumpToPlaylistDetails(collectPlaylist.id)'
        ) {{ collectPlaylist.name }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  props: {
    creatorId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'getCreator'
    ])
  },
  mounted () {
    (async () => {
      let params = await this.$store.dispatch('requestCreator', {
        uid: this.creatorId,
        limit: 1000,
        offset: 0
      })
      await this.$store.dispatch('requestCreatorPlaylists', params)
    })()
  },
  methods: {
    jumpToPlaylistDetails (id) {
      this.$router.push(`/playlist/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .creator
    width 100%
    height 100%
    font-size 12px
  .creator-info-wrapper
    width 100%
    height 500px
    background-size cover
    background-position center center
    position relative
  .creator-info
    width 100%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  .creator-avatar
  .creator-nickname
  .creator-types
  .creator-signature
    margin auto
    padding-top 10px
    text-align center
    color #eee
    text-shadow 1px 1px 0 #333
  .creator-avatar
    width 80px
    height 80px
    background-size cover
    background-position center center
    border-radius 50%
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    vertical-align bottom
  .creator-nickname
    font-size 20px
    font-weight bold
  .creator-types
    font-size 16px
  .creator-signature
    padding 10px 20px 0
    font-size 12px
  .creator-ownplaylists-header
  .creator-collectplaylists-header
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
  .creator-ownplaylists
  .creator-collectplaylists
    display flex
    flex-wrap wrap
    justify-content flex-start
    width 100%
    padding 20px 0
  .creator-ownplaylists-item
  .creator-collectplaylists-item
    width 150px
    height 200px
    margin 0 10px
  .creator-ownplaylists-item-cover
  .creator-collectplaylists-item-cover
    display block
    width 150px
    height 150px
    background-size cover
    background-position center center
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    position relative
  .creator-ownplaylists-item-info-play
  .creator-collectplaylists-item-info-play
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .creator-ownplaylists-item-playcount-icon
  .creator-collectplaylists-item-playcount-icon
  .creator-ownplaylists-item-playall
  .creator-collectplaylists-item-playall
    background-size contain
    background-repeat no-repeat
  .creator-ownplaylists-item-playcount-icon
  .creator-collectplaylists-item-playcount-icon
    width 10px
    height 10px
    background url('../../../assets/images/sprite.png') -4px -117px
    background-size 102px 81px
    position absolute
    left 5px
    bottom 4px
    @media screen and (min-width 601px) and (max-width 800px)
      display none
  .creator-ownplaylists-item-playcount
  .creator-collectplaylists-item-playcount
    font-size 12px
    position absolute
    left 18px
    bottom 1px
    @media screen and (min-width 601px) and (max-width 800px)
      display none
  .creator-ownplaylists-item-playall
  .creator-collectplaylists-item-playall
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    position absolute
    right 0
    bottom 0
    cursor pointer
  .creator-ownplaylists-item-name
  .creator-collectplaylists-item-name
    display block
    padding-top 10px
    text-shadow 1px 1px 0 #333
    cursor pointer
</style>
