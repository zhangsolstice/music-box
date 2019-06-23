<template lang="pug">
  section(
    :class='["songs"]'
  )
    div(
      :class='["song-list"]'
    )
      SongList(
        :list='getSearch.result'
      )
</template>

<script>
import { mapGetters } from 'vuex'
import SongList from 'components/common/song-list'

export default {
  components: {
    SongList
  },
  computed: {
    ...mapGetters([
      'getSearch'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .songs
    width 100%
    height 100%
    font-size 12px
    color #eee
  .song-list
    margin auto
    width 700px
    @media screen and (max-width 700px)
      width 100%
</style>
