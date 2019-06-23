<template lang="pug">
  section(
    :class='["user"]'
  )
    section(
      :style='{backgroundImage: `url("${getCreator.backgroundUrl}")`}'
      :class='["user-info-wrapper"]'
    )
      div(
        :class='["user-info"]'
      )
        div(
          :style='{backgroundImage: `url("${getCreator.avatarUrl}")`}'
          :class='["user-avatar"]'
        )
        h1(
          :class='["user-nickname"]'
        ) {{ getCreator.nickname}}
        p(
          v-if='getCreator.allAuthTypes'
          :class='["user-types"]'
        )
          span(
            :class='["user-type"]'
            v-for='(type, index) of getCreator.allAuthTypes'
            :key='index'
          )  {{ type }}
        p(
          :class='["user-signature"]'
        ) 个人介绍：{{ getCreator.signature}}
    h1(
      :class='["user-ownplaylists-header"]'
    ) 创建的歌单
    section(
      v-if='getUserInfo.ownPlaylists'
      :class='["user-ownplaylists"]'
    )
      div(
        :class='["user-ownplaylists-item"]'
        v-for='(ownPlaylist, index) of getUserInfo.ownPlaylists'
        :key='ownPlaylist.id'
      )
        a(
          :style='{backgroundImage: `url("${ownPlaylist.coverImgUrl}")`}'
          :class='["user-ownplaylists-item-cover"]'
          @click='jumpToPlaylistDetails(ownPlaylist.id)'
        )
          div(
            :class='["user-ownplaylists-item-info-play"]'
          )
            span(
              :class='["user-ownplaylists-item-playcount-icon"]'
            )
            span(
              :class='["user-ownplaylists-item-playcount"]'
            ) {{ ownPlaylist.playCount }}
            span(
              :class='["user-ownplaylists-item-playall"]'
              @click='playAllSongs(ownPlaylist.id)'
            )
        a(
          :class='["user-ownplaylists-item-name"]'
          @click='jumpToPlaylistDetails(ownPlaylist.id)'
        ) {{ ownPlaylist.name }}
    h1(
      :class='["user-collectplaylists-header"]'
    ) 收藏的歌单
    section(
      v-if='getUserInfo.collectPlaylists'
      :class='["user-collectplaylists"]'
    )
      div(
        :class='["user-collectplaylists-item"]'
        v-for='(collectPlaylist, index) of getUserInfo.collectPlaylists'
        :key='collectPlaylist.id'
      )
        a(
          :style='{backgroundImage: `url("${collectPlaylist.coverImgUrl}")`}'
          :class='["user-collectplaylists-item-cover"]'
          @click='jumpToPlaylistDetails(collectPlaylist.id)'
        )
          div(
            :class='["user-collectplaylists-item-info-play"]'
          )
            span(
              :class='["user-collectplaylists-item-playcount-icon"]'
            )
            span(
              :class='["user-collectplaylists-item-playcount"]'
            ) {{ collectPlaylist.playCount }}
            span(
              :class='["user-collectplaylists-item-playall"]'
              @click='playAllSongs(collectPlaylist.id)'
            )
        a(
          :class='["user-collectplaylists-item-name"]'
          @click='jumpToPlaylistDetails(collectPlaylist.id)'
        ) {{ collectPlaylist.name }}
    section(
      :class='["user-logout"]'
      @click='logout'
    ) 退出
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'getCreator',
      'getUserInfo'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestCreator', {
        uid: this.$store.getters.getUserInfo.id,
        limit: 1000,
        offset: 0
      })
    })()
  },
  methods: {
    jumpToPlaylistDetails (id) {
      this.$router.push(`/playlist/${id}`)
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
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
  .user
    width 100%
    height 100%
    font-size 12px
    color #ccc
  .user-info-wrapper
    width 100%
    height 500px
    background-size cover
    background-position center center
    position relative
  .user-info
    width 100%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  .user-avatar
  .user-nickname
  .user-types
  .user-signature
    margin auto
    padding-top 10px
    text-align center
    color #eee
    text-shadow 1px 1px 0 #333
  .user-avatar
    width 80px
    height 80px
    background-size cover
    background-position center center
    border-radius 50%
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    vertical-align bottom
  .user-nickname
    font-size 20px
    font-weight bold
  .user-types
    font-size 16px
  .user-signature
    padding 10px 20px 0
    font-size 12px
  .user-ownplaylists-header
  .user-collectplaylists-header
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
  .user-ownplaylists
  .user-collectplaylists
    display flex
    flex-wrap wrap
    justify-content flex-start
    width 100%
    padding 20px 0
  .user-ownplaylists-item
  .user-collectplaylists-item
    width 150px
    height 200px
    margin 0 10px
  .user-ownplaylists-item-cover
  .user-collectplaylists-item-cover
    display block
    width 150px
    height 150px
    background-size cover
    background-position center center
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    position relative
  .user-ownplaylists-item-info-play
  .user-collectplaylists-item-info-play
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .user-ownplaylists-item-playcount-icon
  .user-collectplaylists-item-playcount-icon
  .user-ownplaylists-item-playall
  .user-collectplaylists-item-playall
    background-size contain
    background-repeat no-repeat
  .user-ownplaylists-item-playcount-icon
  .user-collectplaylists-item-playcount-icon
    width 10px
    height 10px
    background url('../../../assets/images/sprite.png') -4px -117px
    background-size 102px 81px
    position absolute
    left 5px
    bottom 4px
    @media screen and (min-width 601px) and (max-width 800px)
      display none
  .user-ownplaylists-item-playcount
  .user-collectplaylists-item-playcount
    font-size 12px
    position absolute
    left 18px
    bottom 1px
    @media screen and (min-width 601px) and (max-width 800px)
      display none
  .user-ownplaylists-item-playall
  .user-collectplaylists-item-playall
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    position absolute
    right 0
    bottom 0
    cursor pointer
  .user-ownplaylists-item-name
  .user-collectplaylists-item-name
    display block
    padding-top 10px
    text-shadow 1px 1px 0 #333
    cursor pointer
  .user-logout
    width 100%
    height 30px
    line-height 30px
    padding-bottom 5px
    font-size 18px
    font-weight bold
    text-shadow 0 0 2px #333
    text-align center
    background linear-gradient(0deg, #ff416c, #ff4b2b)
    box-shadow 0 -2px 5px #ff4b2b
    cursor pointer
</style>
