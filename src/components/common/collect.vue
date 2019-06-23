<template lang="pug">
  section(
    :class='["collect", getIsCollect ? "collect-active" : ""]'
  )
    div(
      :class='["collect-close"]'
    )
      span(
        @click='switchCollect'
      ) ✖
      span(
        v-if='getUserInfo.status'
      ) 请选择歌单或新建一个
      div(
        v-if='!getUserInfo.status'
        :class='["collect-not-login"]'
        @click='jumpToUser'
      ) 请先登录
    div(
      v-if='getUserInfo.status'
      :class='["collect-login"]'
    )
      div(
        :class='["collect-add"]'
      )
        div(
          :class='["collect-add-avatar"]'
          @click='add'
        ) ✚
        input(
          placeholder='新建歌单并添加进入此新建歌单'
          v-if='isNew'
          :class='["collect-add-name"]'
          v-model='newName'
          @keypress.enter='createNewPlaylist(newName)'
          @click='inputName'
        )
      div(
        :class='["collect-playlists"]'
      )
        div(
          :class='["collect-playlist"]'
          v-for='(playlist, index) of getUserInfo.ownPlaylists'
          :key='playlist.id'
        )
          a(
            :style='{backgroundImage: `url("${playlist.coverImgUrl}")`}'
            :class='["collect-playlist-avatar"]'
            @click='addSongs(playlist.id)'
          )
          span(
            :class='["collect-playlist-name"]'
            @click='addSongs(playlist.id)'
          ) {{ playlist.name }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isNew: false,
      newName: ''
    }
  },
  computed: {
    ...mapGetters([
      'getIsCollect',
      'getUserInfo'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('checkLoginStatus')
      if (this.getUserInfo.status) {
        await this.$store.dispatch('requestCreatorPlaylists', {
          uid: this.getUserInfo.id,
          limit: 1000,
          offset: 0
        })
      }
    })()
  },
  methods: {
    switchCollect () {
      this.$store.dispatch('switchIsCollect')
    },
    jumpToUser () {
      this.$store.dispatch('switchIsCollect')
      this.$router.push({ name: 'user', params: { userId: 0 } })
    },
    add () {
      this.isNew = true
      this.$store.dispatch('switchIsCollect', true)
    },
    inputName () {
      this.$store.dispatch('switchIsCollect', true)
    },
    createNewPlaylist (name) {
      (async () => {
        let id = await this.$store.dispatch('requestNewPlaylist', name)
        this.newName = ''
        this.isNew = false
        await this.$store.dispatch('requestAddSongsToPlaylist', {
          pid: id,
          tracks: this.$store.getters.getCollectSongs.join(',')
        })
        await this.$store.dispatch('switchIsCollect')
      })()
    },
    addSongs (id) {
      this.$store.dispatch('requestAddSongsToPlaylist', {
        pid: id,
        tracks: this.$store.getters.getCollectSongs.join(',')
      })
      this.$store.dispatch('switchIsCollect')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .collect
    padding 10px
    width 340px
    max-height 340px
    font-size 12px
    font-weight bold
    color #eee
    text-shadow 0 0 2px #333
    background-color #999
    border-radius 0 8px 8px 8px
    box-shadow 0 0 10px #eee inset,
               0 0 20px #333
    opacity 0
    overflow-x hidden
    overflow-y auto
    position fixed
    top calc(50% - 50px)
    left 50%
    z-index -1000
    transform translate(-50%, -50%)
    transition all .5s ease-in-out
  .collect-active
    opacity .95
    z-index 100000
    transition all .5s ease-in-out
  .collect-close
    width 100%
    font-size 20px
    color #eee
    text-align center
    cursor pointer
    &>span
      display inline-block
    &>span:nth-of-type(2)
      width calc(100% - 23px)
  .collect-not-login
    display inline-block
    width calc(100% - 20px)
    cursor pointer
  .collect-add
    width 100%
    height 20px
    line-height 20px
  .collect-add-avatar
    display inline-block
    width 20px
    height 20px
    font-size 20px
    font-weight bold
    text-align center
    vertical-align middle
    position relative
    cursor pointer
  .collect-add-name
    display inline-block
    padding 0 10px
    width calc(100% - 20px)
    height 20px
    vertical-align middle
    font-size 12px
    font-weight bold
    color #eee
    background-color transparent
    border-bottom 1px solid #eee
    border-radius 2px
  .collect-playlist
    margin 5px 0
  .collect-playlist-avatar
    display inline-block
    width 30px
    height 30px
    background-size cover
    background-position center center
    box-shadow 0 0 5px #eee inset
    vertical-align middle
    cursor pointer
  .collect-playlist-name
    display inline-block
    padding 0 10px
    width calc(100% - 30px)
    height 20px
    font-size 12px
    font-weight bold
    color #eee
    vertical-align middle
    cursor pointer
</style>
