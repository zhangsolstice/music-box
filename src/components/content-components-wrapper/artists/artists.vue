<template lang="pug">
  section(
    :class='["artists"]'
  )
    nav(
      :class='["artists-nav", isNavActive ? "artists-nav-active" : ""]'
      @click='switchNavContentActive'
    )
      span(
        :class='["artists-nav-cat"]'
      ) {{ currentCat }}
      span(
        :style='currentOrder == false ? {display: "none"} : {}'
      ) {{ '|' }}
      span(
        :style='currentOrder == false ? {display: "none"} : {}'
        :class='["artists-nav-order"]'
      ) {{ currentOrder }}
    div(
      :class='["artists-nav-content", isNavContentActive ? "artists-nav-content-active" : ""]'
    )
      div(
        :class='["artists-nav-content-cat"]'
      )
        div(
          v-for='(cat, index) of artistsCategory'
          :key='index'
        )
          span(
            :class='["artists-nav-content-cat-item", catIndex === index ? "artists-nav-content-cat-item-active" : ""]'
            @click='switchCat(cat.name, index, cat.code)'
          ) {{ cat.name }}
      div(
        :class='["artists-nav-content-order", isOrderActive ? "artists-nav-content-order-active" : ""]'
      )
        div(
          v-for='(item, index) of artistsOrder'
          :key='index'
        )
          span(
            :class='["artists-nav-content-order-item", orderIndex === index ? "artists-nav-content-order-item-active" : ""]'
            @click='switchOrder(item, index)'
          ) {{ item }}
    div(
      :class='["artists-items-wrapper"]'
    )
      div(
        :class='["artists-item"]'
        v-for='(artist, index) of artists'
        :key='artist.id'
      )
        a(
          :class='["artists-item-cover"]'
          @click='jumpToArtist(artist.id)'
        )
          img(
            :src='artist.img1v1Url'
          )
        h4(
          :class='["artists-item-name"]'
          @click='jumpToArtist(artist.id)'
        ) {{ artist.name }}
</template>

<script>
import { category, order } from './category.js'

export default {
  components: {

  },
  props: {
    cat: {
      type: [String, Number],
      default: 0
    },
    order: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      artistsCategory: category(),
      artistsOrder: order(),
      currentCat: '热门歌手',
      currentOrder: '',
      isNavActive: false,
      isNavContentActive: false,
      isOrderActive: false,
      catIndex: 0,
      orderIndex: -1,
      artists: []
    }
  },
  mounted () {
    if (+this.cat === 0) {
      (async () => {
        await this.$store.dispatch('requestPopArtists', {
          limit: 100,
          offset: 0
        })
        this.artists = this.$store.getters.getPopArtists
        this.isNavActive = true
        this.currentCat = '热门歌手'
        this.currentOrder = ''
        this.catIndex = 0
        this.orderIndex = -1
        this.isOrderActive = false
      })()
    } else {
      (async () => {
        await this.$store.dispatch('requestCatArtists', {
          cat: +this.cat,
          initial: this.order,
          limit: 100,
          offset: 0
        })
        if (this.cat !== 5001) {
          this.isOrderActive = true
        }
        this.artists = this.$store.getters.getCatArtists
        this.isNavActive = true
        this.currentCat = this.artistsCategory.filter((v, k) => {
          if (+v.code === +this.cat) {
            this.catIndex = k
            return v
          }
        })[0].name
        this.currentOrder = this.order
        this.orderIndex = this.artistsOrder.indexOf(this.order)
      })()
    }
  },
  methods: {
    switchNavContentActive () {
      this.isNavContentActive = !this.isNavContentActive
    },
    switchCat (name, index, code) {
      if (index === 1) {
        return
      }
      this.currentCat = name
      this.catIndex = index
      this.orderIndex = -1
      this.currentOrder = ''
      if (index === 0 || index === 2) {
        this.isOrderActive = false
        this.$router.push({ params: { cat: code, order: 'all' } })
      } else {
        this.isOrderActive = true
        this.$router.push({ params: { cat: code, order: 'all' } })
      }
      this.isNavContentActive = false
    },
    switchOrder (name, index) {
      this.currentOrder = name
      this.orderIndex = index
      this.isNavContentActive = false
      this.$router.push({ params: { order: name } })
    },
    jumpToArtist (id) {
      this.$router.push(`/artist/${id}`)
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (+to.params.cat === 0) {
      (async () => {
        await this.$store.dispatch('requestPopArtists', {
          limit: 100,
          offset: 0
        })
        this.artists = this.$store.getters.getPopArtists
        this.isNavActive = true
        this.currentCat = '热门歌手'
        this.currentOrder = ''
        this.catIndex = 0
        this.orderIndex = -1
        this.isOrderActive = false
      })()
    } else {
      (async () => {
        await this.$store.dispatch('requestCatArtists', {
          cat: +to.params.cat,
          initial: to.params.order,
          limit: 100,
          offset: 0
        })
        this.artists = this.$store.getters.getCatArtists
      })()
    }
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .artists
    width 100%
    height 100%
    font-size 12px
    color #eee
  .artists-nav
    height 30px
    line-height 30px
    border-radius 5px 5px 0 0
    position fixed
    left 50%
    bottom -60px
    transform translate(-50%, 0)
    z-index 2
    cursor pointer
  .artists-nav-cat
  .artists-nav-order
    padding 0 5px
  .artists-nav-active
    bottom 50px
    background-color #999
    box-shadow 0 -5px 10px #333,
               0 5px 10px #eee inset
    opacity .95
    transition all 1s ease-in-out
  .artists-nav-content
    width 100%
    height 400px
    position fixed
    top -400px
    z-index 1
    overflow hidden
    transition all 1s ease-in-out
  .artists-nav-content-active
    background-color #999
    box-shadow 0 -5px 20px #eee inset,
               0 5px 5px #333
    top 0
    opacity .95
    transition all 1s ease-in-out
  .artists-nav-content-cat
    display grid
    grid-template-rows repeat(4, 20px)
    grid-template-columns repeat(3, 90px)
    justify-content center
    align-content center
    text-align center
    width 100%
    height 320px
  .artists-nav-content-cat-item
    display inline-block
    width 80px
    height 20px
    border-radius 4px
    cursor pointer
    transition all .5s ease-in-out
  .artists-nav-content-cat-item-active
    border 2px solid #eee
    text-shadow 0 0 10px #333
    animation cat-active 1s linear 0s infinite
    transition all .3s ease-in-out
  .artists-nav-content-order
    display none
    flex-wrap wrap
    margin auto
    padding 5px
    width 400px
    opacity 0
    transform translate(0, 100px)
    transition all .5s ease-in-out
    &>div
      display inline-block
      margin-top 10px
      padding 5px
      width calc(100% / 13)
      height 20px
      text-align center
  .artists-nav-content-order-active
    display flex
    opacity 1
    transform translate(0, 0)
    transition all .5s ease-in-out
  .artists-nav-content-order-item
    display inline-block
    width 20px
    height 20px
    border-radius 4px
    cursor pointer
    transition all .5s ease-in-out
  .artists-nav-content-order-item-active
    border 2px solid #eee
    text-shadow 0 0 10px #333
    animation order-active 1s linear 0s infinite
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
  @keyframes order-active
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
  .artists-items-wrapper
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
  .artists-item
    width 13%
    min-width 150px
    padding 5px
    margin 5px
  .artists-item-cover
    display block
    overflow hidden
    position relative
  .artists-item-name
    padding-top 5px
    font-size 14px
    font-weight bold
    color #eee
    text-align center
    text-shadow 1px 1px 0 #333
    word-break break-all
    cursor pointer
</style>
