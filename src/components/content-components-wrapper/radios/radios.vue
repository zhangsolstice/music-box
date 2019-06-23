<template lang="pug">
  section(
    :class='["radios"]'
  )
    nav(
      :class='["radios-nav", isNavActive ? "radios-nav-active" : ""]'
      @click='switchNavContentActive'
    )
      span(
        :class='["radios-nav-cat"]'
      ) {{ currentCat }}
    div(
      :class='["radios-nav-content", isNavContentActive ? "radios-nav-content-active" : ""]'
    )
      div(
        :class='["radios-nav-content-cat"]'
      )
        div(
          v-for='(cat, index) of radiosCategory'
          :key='index'
        )
          span(
            :class='["radios-nav-content-cat-item", catIndex === index ? "radios-nav-content-cat-item-active" : ""]'
            @click='switchCat(cat.name, index, cat.code)'
          ) {{ cat.name }}
    div(
        :class='["radios-items-wrapper"]'
      )
        div(
          :class='["radios-item"]'
          v-for='(radio, index) of getCatRadios'
          :key='radio.id'
        )
          a(
            :class='["radios-item-cover"]'
            @click='jumpToRadio(radio.id)'
          )
            img(
              :src='radio.picUrl'
            )
          h4(
            :class='["radios-item-name"]'
            @click='jumpToRadio(radio.id)'
          ) {{ radio.name }}
          p(
            :class='["radios-item-rcmdtext"]'
          ) {{radio.rcmdtext }}
          p(
            :class='["radios-item-creator-nickname"]'
            @click='jumpToCreator(radio.userId)'
          ) by {{ radio.userNickname}}
          p(
            :class='["radios-item-create-time"]'
          ) {{radio.createTime }} 创建
</template>

<script>
import { mapGetters } from 'vuex'
import { category } from './category.js'

export default {
  props: {
    type: {
      type: [String, Number],
      default: 3001
    }
  },
  data () {
    return {
      radiosCategory: category(),
      isNavActive: false,
      isNavContentActive: false,
      catIndex: -1,
      currentCat: ''
    }
  },
  computed: {
    ...mapGetters([
      'getCatRadios'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestCatRadios', this.type)
      this.isNavActive = true
      this.radiosCategory.filter((v, k) => {
        if (+v.code === +this.type) {
          this.currentCat = v.name
          this.catIndex = k
        }
      })
    })()
    window.addEventListener('load', () => {
      this.isNavActive = true
    })
  },
  methods: {
    switchNavContentActive () {
      this.isNavContentActive = !this.isNavContentActive
    },
    switchCat (name, index, code) {
      this.isNavContentActive = false
      this.currentCat = name
      this.catIndex = index
      this.$router.push({ params: { type: code } })
    },
    jumpToRadio (id) {
      this.$router.push(`/radio/${id}`)
    },
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    }
  },
  beforeRouteUpdate (to, from, next) {
    (async () => {
      await this.$store.dispatch('requestCatRadios', to.params.type)
      this.isNavActive = true
      this.radiosCategory.filter((v, k) => {
        if (+v.code === +this.type) {
          this.currentCat = v.name
          this.catIndex = k
        }
      })
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .radios
    width 100%
    height 100%
    font-size 12px
    color #eee
  .radios-nav
    height 30px
    line-height 30px
    border-radius 5px 5px 0 0
    position fixed
    left 50%
    bottom -60px
    transform translate(-50%, 0)
    z-index 2
    cursor pointer
  .radios-nav-cat
    padding 0 5px
  .radios-nav-active
    bottom 50px
    background-color #999
    box-shadow 0 -5px 10px #333,
               0 5px 10px #eee inset
    opacity .95
    transition all 1s ease-in-out
  .radios-nav-content
    width 100%
    height 400px
    position fixed
    top -400px
    z-index 1
    overflow hidden
    transition all 1s ease-in-out
  .radios-nav-content-active
    background-color #999
    box-shadow 0 -5px 20px #eee inset,
               0 5px 5px #333
    top 0
    opacity .95
    transition all 1s ease-in-out
  .radios-nav-content-cat
    display grid
    grid-template-rows repeat(5, 20px)
    grid-template-columns repeat(4, 90px)
    justify-content center
    align-content center
    text-align center
    width 100%
    height 320px
  .radios-nav-content-cat-item
    display inline-block
    width 80px
    height 20px
    border-radius 4px
    cursor pointer
    transition all .5s ease-in-out
  .radios-nav-content-cat-item-active
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
  .radios-items-wrapper
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
  .radios-item
    width 13%
    min-width 150px
    padding 5px
    margin 5px
  .radios-item-cover
    display block
    position relative
  .radios-item-info
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .radios-item-rcmdtext
    padding-top 5px
  .radios-item-name
    padding-top 5px
    font-size 14px
    font-weight bold
    color #eee
    text-shadow 1px 1px 0 #333
    word-break break-all
    cursor pointer
  .radios-item-creator-nickname
    padding 5px 5px 0
    font-size 12px
    color #ccc
    word-break break-all
    cursor pointer
  .radios-item-create-time
    padding-left 5px
    font-size 12px
    color #aaa
</style>
