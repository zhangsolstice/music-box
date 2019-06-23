<template lang="pug">
  div(
    class='content'
    @click.capture='switchIsCollect'
  )
    canvas(
      :class='["bg"]'
    )
    Collect
    Searching(
      :class='[getIsSearching ? "searching-active" : ""]'
    )
    router-view
</template>

<script>
import { mapGetters } from 'vuex'
import Searching from 'components/content-components-wrapper/search/searching.vue'
import Collect from 'components/common/collect.vue'
import { spaceTravel } from './space-travel'

export default {
  components: {
    Collect,
    Searching
  },
  computed: {
    ...mapGetters([
      'getIsSearching'
    ])
  },
  mounted () {
    spaceTravel()
  },
  methods: {
    switchIsCollect () {
      this.$store.dispatch('switchIsCollect')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    width 100%
    min-height calc(100% - 50px)
    padding-bottom .5em
    overflow-x hidden
  .bg
    display block
    margin 0
    padding 0
    width 100%
    height 100%
    position fixed
    z-index -100
  .searching-active
    top 0
    opacity .95
    transition all .5s ease-in-out
</style>
