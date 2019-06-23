<template lang="pug">
  section(
    :class='["search"]'
  )
    Songs(v-if='+type === 1')
    Albums(v-if='+type === 10')
    Artists(v-if='+type === 100')
    Playlists(v-if='+type === 1000')
    Radios(v-if='+type === 1009')
    div(
      :class='["search-type-wrapper", isNavActive ? "search-type-wrapper-active" : ""]'
    )
      div(
        :class='["search-type", typeIndex === index ? "search-type-active" : ""]'
        @click='switchType(type.code)'
        v-for='(type, index) of searchCategory'
        :key='index'
      ) {{ type.name }}
</template>

<script>
import { mapGetters } from 'vuex'
import { category } from './category.js'
import Songs from './search-songs'
import Albums from './search-albums'
import Artists from './search-artists'
import Playlists from './search-playlists'
import Radios from './search-radios'

export default {
  components: {
    Songs,
    Albums,
    Artists,
    Playlists,
    Radios
  },
  props: {
    keywords: {
      type: String,
      default: ''
    },
    type: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      searchCategory: category(),
      offsetIndex: 0,
      isNavActive: false,
      typeIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'getSearch'
    ])
  },
  mounted () {
    this.searchCategory.filter((v, k) => {
      if (v.code === +this.type) {
        this.typeIndex = k
      }
    });
    (async () => {
      await this.$store.dispatch('requestSearch', {
        keywords: this.keywords,
        type: this.type,
        limit: 55,
        offset: 0
      })
      this.isNavActive = true
      this.offsetIndex = 55
    })()
    window.addEventListener('scroll', () => {
      setTimeout(() => {
        if (document.body.scrollHeight - window.innerHeight - window.pageYOffset === 0) {
          this.offsetIndex += 10
          this.$store.dispatch('requestSearch', {
            keywords: this.keywords,
            type: this.type,
            limit: 10,
            offset: this.offsetIndex
          })
        }
      }, 1000)
    })
  },
  methods: {
    switchType (code) {
      this.searchCategory.filter((v, k) => {
        if (v.code === +this.type) {
          this.typeIndex = k
        }
      })
      this.$router.push({ name: 'search', params: { type: code } })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.searchCategory.filter((v, k) => {
      if (v.code === +to.params.type) {
        this.typeIndex = k
      }
    });
    (async () => {
      await this.$store.dispatch('requestSearch', {
        keywords: to.params.keywords,
        type: to.params.type,
        limit: 55,
        offset: 0
      })
      this.isNavActive = true
    })()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .search
    width 100%
    height 100%
    font-size 12px
    color #eee
  .search-type-wrapper
    width 260px
    height 30px
    position fixed
    left 50%
    bottom -60px
    z-index 2
    transform translate(-50%, 0)
  .search-type-wrapper-active
    bottom 50px
    border-radius 6px 6px 0 0
    opacity .95
    transition all 1s ease-in-out
  .search-type
    display inline-block
    padding 0 10px
    width 50px
    height 30px
    line-height 30px
    text-align center
    background-color #999
    box-shadow 0 -5px 10px #333,
               0 5px 10px #eee inset
    cursor pointer
    transition all .5s ease-in-out
    &:nth-of-type(1)
      border-radius 6px 0 0 0
    &:nth-of-type(5)
      border-radius 0 6px 0 0
  .search-type-active
    width 60px
    font-weight bold
    text-shadow 0 0 2px #333
    box-shadow 0 -10px 20px #333,
               0 10px 20px #eee inset
    transition all .5s ease-in-out
</style>
