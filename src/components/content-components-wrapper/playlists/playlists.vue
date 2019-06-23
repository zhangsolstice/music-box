<template lang="pug">
  section(
    :class='["playlists"]'
  )
    nav(
      :class='["playlists-nav", isNavActive ? "playlists-nav-active" : ""]'
      @click='switchNavContentActive'
    )
      span(
        :class='["playlists-nav-type"]'
      ) {{ this.navType[getPlaylists.type] }}
      span(
        :class='["playlists-nav-sep"]'
      ) {{ ' | ' }}
      span(
        :class='["playlists-nav-cat"]'
      ) {{ getPlaylists.cat }}
    div(
      :class='["playlists-nav-content", isNavContentActive ? "playlists-nav-content-active" : ""]'
    )
      div(
        :class='["playlists-nav-content-cat-wrapper"]'
      )
        div(
          :class='["playlists-nav-content-cat-all", allActive === true ? "playlists-nav-content-cat-all-active" : ""]'
          @click='switchAll'
        ) 全部
        div(
          :class='["playlists-nav-content-cat", typeCode === 0 || typeCode === 1 ? "playlists-nav-content-cat-hotandnew" : "playlists-nav-content-cat-highquality"]'
        )
          div(
            v-for='(item, index) of category'
            :key='index'
          )
            span(
              :class='["playlists-nav-content-cat-item", catIndex === index ? "playlists-nav-content-cat-item-active" : ""]'
              @click='switchCat(index, item)'
            ) {{ item }}
      div(
        :class='["playlists-nav-content-type"]'
      )
        span(
          :class='["playlists-nav-content-type-hot", typeCode === 0 ? "playlists-nav-content-type-active" : ""]'
          @click='switchType(0)'
        ) 最热
        span(
          :class='["playlists-nav-content-type-new", typeCode === 1 ? "playlists-nav-content-type-active" : ""]'
          @click='switchType(1)'
        ) 最新
        span(
          :class='["playlists-nav-content-type-highquality", typeCode === 2 ? "playlists-nav-content-type-active" : ""]'
          @click='switchType(2)'
        ) 精品
    div(
      :class='["playlists-items-wrapper"]'
    )
      div(
        :class='["playlists-item"]'
        v-for='(playlist, index) of getPlaylists.list'
        :key='playlist.id'
      )
        a(
          :class='["playlists-item-cover"]'
          @click='jumpToPlaylist(playlist.id)'
        )
          img(
            :src='playlist.coverImgUrl'
          )
          div(
            :class='["Playlists-item-info"]'
          )
            span(
              :class='["playlists-item-playcount-icon"]'
            )
            span(
              :class='["playlists-item-playcount"]'
            ) {{ playlist.playCount }}
            span(
              :class='["playlists-item-playall"]'
              @click='playAllSongs(playlist.id)'
            )
        h4(
          :class='["playlists-item-name"]'
          @click='jumpToPlaylist(playlist.id)'
        ) {{ playlist.name }}
        p(
          :class='["playlists-item-creator-nickname"]'
          @click='jumpToCreator(playlist.creatorId)'
        ) by {{ playlist.creatorNickname}}
        p(
          :class='["playlists-item-create-time"]'
        ) {{playlist.createTime }} 创建
</template>

<script>
import { mapGetters } from 'vuex'
import { hotAndNewCategory, highQualityCategory } from './category.js'

export default {
  components: {

  },
  props: {
    type: {
      type: String,
      default: ''
    },
    cat: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isNavActive: false,
      isNavContentActive: false,
      allActive: -1,
      typeCode: -1,
      catIndex: -1,
      navType: {
        hot: '最热',
        new: '最新',
        highquality: '精品'
      },
      offsetIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'getPlaylists'
    ]),
    category () {
      return this.typeCode === 2 ? highQualityCategory() : hotAndNewCategory()
    }
  },
  mounted () {
    this.isNavActive = true
    this.typeCode = Object.keys(this.navType).indexOf(this.type)
    this.catIndex = this.category.indexOf(this.cat)
    this.catIndex !== -1 ? this.allActive = false : this.allActive = true
    this.$store.dispatch('requestPlaylists', {
      type: this.type,
      cat: decodeURI(this.cat),
      limit: 55,
      offset: 0
    })
    this.offsetIndex = 55
    window.addEventListener('scroll', () => {
      setTimeout(() => {
        if (document.body.scrollHeight - window.innerHeight - window.pageYOffset === 0) {
          this.offsetIndex += 10
          this.$store.dispatch('requestPlaylists', {
            type: this.type,
            cat: decodeURI(this.cat),
            limit: 10,
            offset: this.offsetIndex,
            before: this.getPlaylists.updateTime
          })
        }
      }, 1000)
    })
    window.addEventListener('load', () => {
      this.isNavActive = true
    })
  },
  methods: {
    switchNavContentActive () {
      this.isNavContentActive = !this.isNavContentActive
    },
    switchType (code) {
      this.typeCode = code
      this.catIndex = -1
      this.allActive = true
      this.isNavContentActive = false
      if (code === 0) {
        this.$router.push({ params: { type: 'hot', cat: '全部' } })
      }
      if (code === 1) {
        this.$router.push({ params: { type: 'new', cat: '全部' } })
      }
      if (code === 2) {
        this.$router.push({ params: { type: 'highquality', cat: '全部' } })
      }
    },
    switchAll () {
      this.catIndex = -1
      this.allActive = true
      this.isNavContentActive = false
      this.$router.push({ params: { cat: '全部' } })
    },
    switchCat (index, selectedCat) {
      this.allActive = false
      this.catIndex = index
      this.isNavContentActive = false
      this.$router.push({ params: { cat: selectedCat } })
    },
    jumpToPlaylist (id) {
      this.$router.push(`/playlist/${id}`)
    },
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
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
  },
  beforeRouteUpdate (to, from, next) {
    (async () => {
      this.$store.dispatch('requestPlaylists', {
        type: to.params.type || from.type,
        cat: decodeURI(to.params.cat) || decodeURI(from.cat),
        limit: 55,
        offset: 0
      })
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .playlists
    width 100%
    height 100%
    font-size 12px
  .playlists-nav
    width 140px
    height 30px
    line-height 30px
    border-radius 5px 5px 0 0
    position fixed
    left 50%
    bottom -60px
    transform translate(-50%, 0)
    z-index 2
    cursor pointer
  .playlists-nav-active
    bottom 50px
    background-color #999
    box-shadow 0 -5px 10px #333,
               0 5px 10px #eee inset
    opacity .95
    transition all 1s ease-in-out
  .playlists-nav-type
  .playlists-nav-sep
  .playlists-nav-cat
    display inline-block
    text-align center
    font-weight bold
    color #eee
    vertical-align bottom
  .playlists-nav-type
    width 40px
    font-size 14px
    text-shadow 2px 2px 0 #333
  .playlists-nav-sep
    width 8px
  .playlists-nav-cat
    width 90px
    text-shadow 1px 1px 0 #666
  .playlists-nav-content
    width 100%
    height 400px
    position fixed
    top -400px
    z-index 1
    transition all 1s ease-in-out
  .playlists-nav-content-active
    background-color #999
    box-shadow 0 -5px 20px #eee inset,
               0 5px 5px #333
    top 0
    opacity .95
    transition all 1s ease-in-out
  .playlists-nav-content-type
    position absolute
    left 50%
    bottom 10px
    transform translate(-50%, 0)
  .playlists-nav-content-type-hot
  .playlists-nav-content-type-new
  .playlists-nav-content-type-highquality
    display inline-block
    margin 10px 5px
    padding 5px
    font-size 14px
    font-weight bold
    color #eee
    border-radius 6px
    cursor pointer
  .playlists-nav-content-type-active
    border 2px solid #eee
    text-shadow 0 0 10px #333
    animation type-active 1s linear 0s infinite
    transition all .3s ease-in-out
  .playlists-nav-content-cat-wrapper
    width 100%
    height 340px
    color #eee
  .playlists-nav-content-cat-all
    width 100px
    height 28px
    padding 5px
    text-align center
    border-radius 4px
    position absolute
    left 50%
    bottom 60px
    transform translate(-50%, 0)
    cursor pointer
    transition all .5s ease-in-out
  .playlists-nav-content-cat-all-active
    border 2px solid #eee
    text-shadow 0 0 10px #333
    animation all-active 1s linear 0s infinite
    transition all .3s ease-in-out
  .playlists-nav-content-cat
    display grid
    justify-content center
    align-content center
    width 100%
    height 320px
    &>div
      padding 1px 0
  .playlists-nav-content-cat-hotandnew
    grid-template-rows repeat(15, 20px)
    grid-template-columns repeat(5, 82px)
  .playlists-nav-content-cat-highquality
    grid-template-rows repeat(5, 20px)
    grid-template-columns repeat(4, 70px)
  .playlists-nav-content-cat-item
    display inline-block
    padding 1px 3px
    border-radius 4px
    cursor pointer
  .playlists-nav-content-cat-item-active
    border 2px solid #eee
    text-shadow 0 0 10px #333
    animation cat-active 1s linear 0s infinite
    transition all .3s ease-in-out
  @keyframes type-active
    0%
      box-shadow 1px 0 2px #22c1c3,-1px 0 2px #fdbb2d,0 0 10px #eee inset
    12%
      box-shadow 1px 1px 2px #22c1c3,-1px -1px 2px #fdbb2d,0 0 10px #eee inset
    25%
      box-shadow 0 1px 2px #22c1c3,0 -1px 2px #fdbb2d,0 0 10px #eee inset
    37%
      box-shadow -1px 1px 2px #22c1c3,1px -1px 2px #fdbb2d,0 0 10px #eee inset
    50%
      box-shadow -1px  2px #22c1c3,1px 0 2px #fdbb2d,0 0 10px #eee inset
    62%
      box-shadow -1px -1px 2px #22c1c3,1px 1px 2px #fdbb2d,0 0 10px #eee inset
    75%
      box-shadow 0 -1px 2px #22c1c3,0 1px 2px #fdbb2d,0 0 10px #eee inset
    87%
      box-shadow 1px -1px 2px #22c1c3,-1px 1px 2px #fdbb2d,0 0 10px #eee inset
    100%
      box-shadow 1px 0 2px #22c1c3,-1px 0 2px #fdbb2d,0 0 10px #eee inset
  @keyframes all-active
    0%
      box-shadow 1px 0 2px #fc354c,-1px 0 2px #0abfbc,0 0 10px #eee inset
    12%
      box-shadow 1px 1px 2px #fc354c,-1px -1px 2px #0abfbc,0 0 10px #eee inset
    25%
      box-shadow 0 1px 2px #fc354c,0 -1px 2px #0abfbc,0 0 10px #eee inset
    37%
      box-shadow -1px 1px 2px #fc354c,1px -1px 2px #0abfbc,0 0 10px #eee inset
    50%
      box-shadow -1px  2px #fc354c,1px 0 2px #0abfbc,0 0 10px #eee inset
    62%
      box-shadow -1px -1px 2px #fc354c,1px 1px 2px #0abfbc,0 0 10px #eee inset
    75%
      box-shadow 0 -1px 2px #fc354c,0 1px 2px #0abfbc,0 0 10px #eee inset
    87%
      box-shadow 1px -1px 2px #fc354c,-1px 1px 2px #0abfbc,0 0 10px #eee inset
    100%
      box-shadow 1px 0 2px #fc354c,-1px 0 2px #0abfbc,0 0 10px #eee inset
  @keyframes cat-active
    0%
      box-shadow 1px 0 2px #ff4b1f,-1px 0 2px #1fddff,0 0 10px #eee inset
    12%
      box-shadow 1px 1px 2px #ff4b1f,-1px -1px 2px #1fddff,0 0 10px #eee inset
    25%
      box-shadow 0 1px 2px #ff4b1f,0 -1px 2px #1fddff,0 0 10px #eee inset
    37%
      box-shadow -1px 1px 2px #ff4b1f,1px -1px 2px #1fddff,0 0 10px #eee inset
    50%
      box-shadow -1px  2px #ff4b1f,1px 0 2px #1fddff,0 0 10px #eee inset
    62%
      box-shadow -1px -1px 2px #ff4b1f,1px 1px 2px #1fddff,0 0 10px #eee inset
    75%
      box-shadow 0 -1px 2px #ff4b1f,0 1px 2px #1fddff,0 0 10px #eee inset
    87%
      box-shadow 1px -1px 2px #ff4b1f,-1px 1px 2px #1fddff,0 0 10px #eee inset
    100%
      box-shadow 1px 0 2px #ff4b1f,-1px 0 2px #1fddff,0 0 10px #eee inset
  .playlists-items-wrapper
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
  .playlists-item
    width 13%
    min-width 150px
    padding 5px
    margin 5px
  .playlists-item-cover
    display block
    position relative
  .Playlists-item-info
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .playlists-item-playcount-icon
  .playlists-item-playall
    background-size contain
    background-repeat no-repeat
  .playlists-item-playcount-icon
    width 10px
    height 10px
    background url('../../../assets/images/sprite.png') -4px -117px
    background-size 102px 81px
    position absolute
    left 5px
    bottom 4px
  .playlists-item-playcount
    font-size 12px
    position absolute
    left 18px
    bottom 1px
  .playlists-item-playall
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    position absolute
    right 0
    bottom 0
    cursor pointer
  .playlists-item-name
    padding-top 5px
    font-size 14px
    font-weight bold
    color #eee
    text-shadow 1px 1px 0 #333
    word-break break-all
    cursor pointer
  .playlists-item-creator-nickname
    padding 5px 5px 0
    font-size 12px
    color #ccc
    cursor pointer
  .playlists-item-create-time
    padding-left 5px
    font-size 12px
    color #aaa
</style>
