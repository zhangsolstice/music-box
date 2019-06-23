<template lang="pug">
  div(
    :class='["new-songs"]'
  )
    section(
      :class='["new-songs-header"]'
    )
      h1 每日歌曲推荐
      p 根据你的音乐口味生成，每天6:00更新
    ControlAll(
      :list='this.$store.getters.getUserInfo.recommendSongs'
    )
    SongList(
      :list='this.$store.getters.getUserInfo.recommendSongs'
    )
</template>

<script>
import SongList from 'components/common/song-list'
import ControlAll from 'components/common/control-all'

export default {
  components: {
    SongList,
    ControlAll
  },
  created () {
    this.$store.dispatch('requestRecommend')
  }
}
</script>

<style lang="stylus" scoped>
  .new-songs
    font-size .18rem
    margin auto
    width 700px
    @media screen and (max-width 700px)
      width 100vw
  .new-songs-header
    width 100%
    height 200px
    padding 80px 20px
    background-image url('../../../assets/images/recommend-songs-info.png')
    background-size cover
    background-position top center
    & h1
      margin-bottom 10px
      font-size 20px
      font-weight bold
      text-shadow 1px 1px 0 #aaa
    & p
      font-size 14px
      color #666
</style>
