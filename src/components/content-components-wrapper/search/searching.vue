<template lang="pug">
  section(
    :class='["searching"]'
  )
    label(
      :class='["searching-bar-wrapper"]'
    )
      input(
        autofocus
        :class='["searching-bar"]'
        v-model='searchContent'
        @keypress.enter='jumpToSearch(searchContent)'
      )
    h4(
      :class='["searching-history-header"]'
    ) 搜索历史
    div(
      :class='["searching-history-wrapper"]'
    )
      span(
        :class='["searching-history"]'
        v-for='(item, index) of searchHistory'
        :key='index'
        @click='jumpToSearch(item)'
      ) {{ item }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      searchContent: '',
      searchHistory: []
    }
  },
  computed: {
    ...mapGetters([
      'getIsSearching'
    ])
  },
  mounted () {
    if (localStorage.getItem('searchHistory')) {
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    }
  },
  methods: {
    jumpToSearch (keywords) {
      this.searchContent = ''
      if (this.searchHistory.indexOf(keywords) !== -1) {
        this.searchHistory.unshift(this.searchHistory.splice(this.searchHistory.indexOf(keywords), 1)[0])
      } else {
        this.searchHistory.unshift(keywords)
      }
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      this.$store.dispatch('switchIsSearching')
      this.$router.push({ name: 'search', params: { keywords: keywords, type: 1 } })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .searching
    width 100%
    height 100%
    font-size 12px
    color #eee
    position fixed
    top 100%
    left 0
    z-index 9999
    background-color #999
    opacity 0
    transition all .5s ease-in-out
  .searching-bar-wrapper
    width 80%
    height 50px
    position absolute
    top 100px
    left 10%
    box-shadow 0 30px 50px #333,
               0 0 5px #eee inset
    border-radius 10px
  .searching-bar
    margin-bottom 20px
    padding 0 10px
    width 100%
    height 100%
    line-height 50px
    font-size 20px
    font-weight bold
    color #eee
    background-color transparent
  .searching-history-header
    display block
    width 100%
    font-size 16px
    font-weight bold
    text-shadow 0 2px 2px #333
    text-align center
    position absolute
    top 200px
  .searching-history-wrapper
    display flex
    flex-wrap wrap
    align-content flex-start
    padding 10px
    width 300px
    height calc(100% - 200px)
    text-align center
    position absolute
    top 240px
    left 50%
    transform translate(-50%, 0)
    overflow hidden
  .searching-history
    margin 0 5px 5px 0
    padding 0 10px
    height 30px
    line-height 30px
    text-shadow 0 2px 2px #333
    border 1px solid #eee
    border-radius 4px
    box-shadow 0 5px 15px #eee inset
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
</style>
