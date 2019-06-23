<template lang="pug">
  section(
    :class='["hots"]'
  )
    nav(
      :class='["hots-nav", isNavActive ? "hots-nav-active" : ""]'
      @click='switchNavContentActive'
    )
      span(
        :class='["hots-nav-cat"]'
      ) {{ currentCat }}
    div(
      :class='["hots-nav-content", isNavContentActive ? "hots-nav-content-active" : ""]'
    )
      div(
        :class='["hots-nav-content-cat"]'
      )
        div(
          v-for='(cat, index) of hotsCategory'
          :key='index'
        )
          span(
            :class='["hots-nav-content-cat-item", catIndex === index ? "hots-nav-content-cat-item-active" : ""]'
            @click='switchCat(cat, index)'
          ) {{ cat }}
    section(
        :style='{backgroundImage: `url("${getHots.userBackgroundUrl}")`}'
        :class='["hots-info-wrapper"]'
      )
        div(
          :class='["hots-info"]'
        )
          div(
            :style='{backgroundImage: `url("${getHots.userAvatarUrl}")`}'
            :class='["hots-avatar"]'
          )
          h1(
            :class='["hots-nickname"]'
          ) {{ getHots.userNickname}}
          p(
            :class='["hots-signature"]'
          ) {{ getHots.userSignature }}
    ControlAll(
      :list='getHots.tracks'
    )
    SongList(
      :list='getHots.tracks'
    )
</template>

<script>
import { mapGetters } from 'vuex'
import { category } from './category.js'
import ControlAll from 'components/common/control-all.vue'
import SongList from 'components/common/song-list.vue'

export default {
  components: {
    ControlAll,
    SongList
  },
  props: {
    hotId: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      hotsCategory: category(),
      currentCat: '',
      isNavActive: false,
      isNavContentActive: false,
      catIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'getHots'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestHots', this.hotId)
      this.isNavActive = true
      this.catIndex = +this.hotId
      this.currentCat = this.hotsCategory[this.hotId]
    })()
  },
  methods: {
    switchNavContentActive () {
      this.isNavContentActive = !this.isNavContentActive
    },
    switchCat (cat, index) {
      this.currentCat = cat
      this.catIndex = index
      this.isNavContentActive = false
      this.$router.push({ params: { hotId: index } })
    }
  },
  beforeRouteUpdate (to, from, next) {
    (async () => {
      await this.$store.dispatch('requestHots', to.params.hotId)
      this.isNavActive = true
      this.catIndex = +to.params.hotId
      this.currentCat = this.hotsCategory[to.params.hotId]
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .hots
    margin auto
    width 700px
    height 100%
    font-size 12px
    color #eee
    @media screen and (max-width 700px)
      width 100%
  .hots-nav
    height 30px
    line-height 30px
    border-radius 5px 5px 0 0
    position fixed
    left 50%
    bottom -60px
    transform translate(-50%, 0)
    z-index 2
    cursor pointer
  .hots-nav-cat
    padding 0 5px
  .hots-nav-active
    bottom 50px
    background-color #999
    box-shadow 0 -5px 10px #333,
               0 5px 10px #eee inset
    opacity .95
    transition all 1s ease-in-out
  .hots-nav-content
    width 100%
    height 400px
    position fixed
    top -400px
    left 0
    z-index 1
    overflow hidden
    transition all 1s ease-in-out
  .hots-nav-content-active
    background-color #999
    box-shadow 0 -5px 20px #eee inset,
               0 5px 5px #333
    top 0
    opacity .95
    transition all 1s ease-in-out
  .hots-nav-content-cat
    display grid
    grid-template-rows repeat(12, 20px)
    grid-template-columns repeat(2, 170px)
    justify-content center
    align-content center
    text-align center
    width 100%
    height 320px
  .hots-nav-content-cat-item
    display inline-block
    width 160px
    height 20px
    border-radius 4px
    cursor pointer
    transition all .5s ease-in-out
  .hots-nav-content-cat-item-active
    border 2px solid #eee
    text-shadow 0 0 10px #333
    animation cat-active 1s linear 0s infinite
    transition all .3s ease-in-out
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
  .hots-info-wrapper
    width 700px
    height 500px
    background-size cover
    background-position center center
    position relative
    @media screen and (max-width 700px)
      width 100%
  .hots-info
    width 100%
    position absolute
    top 50%
    transform translate(0, -50%)
  .hots-avatar
  .hots-nickname
  .hots-signature
    margin auto
    padding-top 10px
    color #eee
    text-align center
    text-shadow 1px 1px 0 #333
  .hots-avatar
    width 80px
    height 80px
    background-size cover
    background-position center center
    border-radius 50%
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    vertical-align bottom
  .hots-nickname
    font-size 20px
    font-weight bold
    color #009fab
  .hots-signature
    padding 10px 20px 0
    font-size 12px
</style>
