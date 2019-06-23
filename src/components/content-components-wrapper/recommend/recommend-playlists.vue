<template lang="pug">
  section(
    :class='["playlists"]'
  )
    h1(
      :class='["playlists-header"]'
    ) 推荐歌单
      span(
        :class='["playlists-more"]'
        @click='jumpToPlaylists("全部")'
      ) {{ '更多>>' }}
    div(
      :class='["playlists-content"]'
    )
      div(
        :class='["playlists-major"]'
      )
        a(
          ref='playerListsMajorCoverWrapper'
          :class='["playlists-major-cover-wrapper"]'
          @click='jumpToPlaylistDetails(majorPlaylist.id)'
        )
          img(
            v-if='currentWidth > 600'
            :class='["playlists-major-cover"]'
            :src='majorPlaylist.coverImgUrl'
          )
        div(
          :class='["playlists-major-playcount-play"]'
        )
          span(
            :class='["playlists-major-playcount"]'
          ) {{ majorPlaylist.playCount }}
          span(
            :class='["playlists-major-play"]'
            @click='playAllSongs(majorPlaylist.id)'
          )
        div(
          :class='["playlists-major-info"]'
        )
          h1(
            :class='["playlists-major-header"]'
            @click='jumpToPlaylistDetails(majorPlaylist.id)'
          ) {{ majorPlaylist.name }}
          a(
            ref='playlistsMajorCreatorAvatar'
            :class='["playlists-major-creator-avatar"]'
            @click='jumpToCreator(majorPlaylist.userId)'
          )
          a(
            :class='["playlists-major-creator-nickname"]'
            @click='jumpToCreator(majorPlaylist.userId)'
          ) {{ majorPlaylist.userNickname }}
          span(
            :class='["playlists-major-create-time"]'
          ) {{ majorPlaylist.createTime }} 创建
          span(
            :class='["playlists-major-tag"]'
            @click='jumpToPlaylists(tag)'
            v-for='(tag, index) of majorPlaylist.tags'
            :key='index'
          ) {{ tag }}
          div(
            v-if='currentWidth <= 600'
            :class='["playlists-row-minor"]'
          )
            div(
              :class='["playlists-row-minor-item"]'
              v-for='(item, index) of minorPlaylists'
              :key='item.id'
            )
              div(
                :class='["playlists-row-minor-item-bg"]'
              )
                a(
                  :style='{backgroundImage: `url("${item.picUrl}")`}'
                  :class='["playlists-row-minor-item-cover"]'
                  @click='jumpToPlaylistDetails(item.id)'
                )
                div(
                  :class='["playlists-row-minor-item-info-play"]'
                )
                  span(
                    :class='["playlists-row-minor-item-playcount-icon"]'
                  )
                  span(
                    :class='["playlists-row-minor-item-playcount"]'
                  ) {{ item.playCount }}
                  span(
                    :class='["playlists-row-minor-item-playall"]'
                    @click='playAllSongs(item.id)'
                  )
              h4(
                :class='["playlists-row-minor-item-intro"]'
                @click='jumpToPlaylistDetails(item.id)'
              ) {{ item.name }}
      div(
        v-if='currentWidth > 600'
        :class='["playlists-minor"]'
        v-for='(item, index) of minorPlaylists'
        :key='item.id'
      )
        div(
          :class='["playlists-minor-info-wrapper"]'
        )
          a(
            :class='["playlists-minor-cover-wrapper"]'
            @click='jumpToPlaylistDetails(item.id)'
          )
            img(
              :class='["playlists-minor-cover"]'
              :src='item.picUrl'
            )
          div(
            :class='["playlists-minor-info-play"]'
          )
            span(
              :class='["playlists-minor-playcount-icon"]'
            )
            span(
              :class='["playlists-minor-playcount"]'
            ) {{ item.playCount }}
            span(
              :class='["playlists-minor-playall"]'
              @click='playAllSongs(item.id)'
            )
        h4(
          :class='["playlists-minor-intro"]'
          @click='jumpToPlaylistDetails(item.id)'
        ) {{ item.name }}
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      currentWidth: '',
      majorPlaylist: {},
      minorPlaylists: []
    }
  },
  computed: {

  },
  mounted () {
    this.currentWidth = window.innerWidth;
    (async () => {
      await this.$store.dispatch('requestPersonalPlaylists')
      await this.$store.dispatch('requestPlaylistDetails', this.$store.getters.getPersonalPlaylists[0].id)
      this.majorPlaylist = Object.assign(
        this.$store.getters.getPlaylistDetails,
        {
          playCount: this.$store.getters.getPersonalPlaylists[0].playCount,
          tracks: ''
        }
      )
      this.$refs.playlistsMajorCreatorAvatar.style.backgroundImage = `url("${this.majorPlaylist.userAvatarUrl}")`
      if (window.innerWidth <= 600) {
        this.$refs.playerListsMajorCoverWrapper.style.backgroundImage = `url("${this.majorPlaylist.coverImgUrl}")`
        this.minorPlaylists = this.$store.getters.getPersonalPlaylists.slice(1)
      } else {
        this.minorPlaylists = this.$store.getters.getPersonalPlaylists.slice(1, 10)
      }
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 600) {
          this.currentWidth = window.innerWidth
          this.$refs.playerListsMajorCoverWrapper.style.backgroundImage = `url("${this.majorPlaylist.coverImgUrl}")`
          this.minorPlaylists = this.$store.getters.getPersonalPlaylists.slice(1)
        } else {
          this.currentWidth = window.innerWidth
          this.minorPlaylists = this.$store.getters.getPersonalPlaylists.slice(1, 10)
        }
      })
    })()
  },
  methods: {
    jumpToPlaylistDetails (id) {
      this.$router.push(`/playlist/${id}`)
    },
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    },
    jumpToPlaylists (cat) {
      this.$router.push({ name: 'playlists', params: { type: 'hot', cat: cat } })
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
  .playlists
    width 50%
    color #eee
    @media screen and (max-width 1024px)
      width 100%
  .playlists-header
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
  .playlists-more
    padding-left 10px
    font-size 12px
    color #eee
    cursor pointer
  .playlists-content
    display grid
    grid-template-rows repeat(6, 1fr)
    grid-template-columns repeat(3, 1fr)
    grid-gap 20px 50px
    padding 20px 20px 10px
    @media screen and (min-width 601px) and (max-width 1024px)
      grid-template-rows repeat(3, 1fr)
      grid-template-columns repeat(6, 1fr)
    @media screen and (max-width 600px)
      display block
      padding 20px 0
      width 100%
  .playlists-major
    grid-row 1 / 4
    grid-column 1 / 4
    position relative
    @media screen and (max-width 600px)
      height 500px
  .playlists-major-cover-wrapper
    display block
    width 100%
    height 100%
    background-size cover
    background-position center center
  .playlists-major-playcount-play
    display inline-block
    width 100px
    height 25px
    text-align right
    font-size 12px
    position absolute
    top 0
    right 0
    background linear-gradient(270deg, rgba(0, 0, 0, .45), transparent)
  .playlists-major-playcount
    display inline-block
    font-weight bold
    color #fff
    text-shadow 1px 1px 0 #666
    transform translate(0, -8px)
  .playlists-major-play
    display inline-block
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    background-repeat no-repeat
    cursor pointer
  .playlists-major-info
    width 100%
    position absolute
    bottom 0
    background linear-gradient(0deg, rgba(0, 0, 0, .65), transparent)
    box-shadow 0 1px 1px #333
  .playlists-major-header
    display block
    padding 0 0 5px 5px
    font-size 16px
    font-weight bold
    text-shadow 1px 1px 0 #333
    cursor pointer
  .playlists-major-creator-avatar
    display inline-block
    margin-left 5px
    width 20px
    height 20px
    border-radius 50%
    background-size contain
    background-repeat no-repeat
    vertical-align bottom
    cursor pointer
  .playlists-major-creator-nickname
    display inline-block
    padding-left 5px
    font-size 14px
    color #1c92d2
    text-shadow 1px 1px 0 rgba(30, 30, 30, .7)
    cursor pointer
  .playlists-major-create-time
    display block
    font-size 12px
    padding 5px 0 5px 10px
  .playlists-major-tag
    display inline-block
    margin 0 0 10px 10px
    padding 2px 5px
    font-size 14px
    border 1px solid #eee
    border-radius 6px
    text-shadow 1px 1px 0 #333
    cursor pointer
  .playlists-row-minor
    width 100%
    height 170px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    white-space nowrap
    overflow-x auto
    overflow-y hidden
    -webkit-overflow-scrolling touch
  .playlists-row-minor-item
    display inline-block
    margin-left 10px
    width 130px
    height 170px
    vertical-align bottom
  .playlists-row-minor-item-bg
    width 100%
    height 130px
    position relative
  .playlists-row-minor-item-cover
    display block
    width 100%
    height 130px
    background-size cover
    background-position center center
    box-shadow 0 0 5px #eee inset
  .playlists-row-minor-item-intro
    font-size 14px
    text-shadow 1px 1px 0 #333
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
  .playlists-minor
    font-size 12px
    position relative
  .playlists-minor-info-wrapper
    position relative
  .playlists-minor-cover-wrapper
    display block
  .playlists-row-minor-item-info-play
  .playlists-minor-info-play
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .playlists-row-minor-item-playcount-icon
  .playlists-row-minor-item-playall
  .playlists-minor-playcount-icon
  .playlists-minor-playall
    background-size contain
    background-repeat no-repeat
  .playlists-row-minor-item-playcount-icon
  .playlists-minor-playcount-icon
    width 10px
    height 10px
    background url('../../../assets/images/sprite.png') -4px -117px
    background-size 102px 81px
    position absolute
    left 5px
    bottom 4px
    @media screen and (min-width 601px) and (max-width 800px)
      display none
  .playlists-row-minor-item-playcount
  .playlists-minor-playcount
    font-size 12px
    position absolute
    left 18px
    bottom 1px
    @media screen and (min-width 601px) and (max-width 800px)
      display none
  .playlists-row-minor-item-playall
  .playlists-minor-playall
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    position absolute
    right 0
    bottom 0
    cursor pointer
  .playlists-minor-intro
    padding-top 5px
    font-size 12px
    font-weight bold
    text-shadow 1px 1px 0 #333
    cursor pointer
    position absolute
</style>
