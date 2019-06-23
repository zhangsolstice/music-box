<template lang="pug">
  section(
    :class='["hot"]'
  )
    h1(
      :class='["hot-header"]'
    ) 排行榜
      span(
        :class='["hot-more"]'
        @click='jumpTohots'
      ) {{ '更多>>' }}
    section(
        :style='{backgroundImage: `url("${getHots.userBackgroundUrl}")`}'
        :class='["hot-info-wrapper"]'
      )
        div(
          :class='["hot-info"]'
        )
          div(
            :style='{backgroundImage: `url("${getHots.userAvatarUrl}")`}'
            :class='["hot-avatar"]'
          )
          h1(
            :class='["hot-nickname"]'
          ) {{ getHots.userNickname}}
          p(
            :class='["hot-signature"]'
          ) {{ getHots.userSignature.slice(0, 50) }} ...
    SongList(
      :list='getHots.tracks.slice(0, 60)'
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
      'getHots'
    ])
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestHots', Math.round(Math.random() * 23))
    })()
  },
  methods: {
    jumpTohots () {
      this.$router.push({ name: 'hots', params: { hotId: 1 } })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .hot
    width 28vw
    @media screen and (max-width: 1024px)
      width 100%
  .hot-header
    margin-bottom 20px
    padding 10px
    font-size 20px
    font-weight bold
    color #eee
    text-shadow 2px 2px 0 #333
    border-bottom 1px solid
    border-image linear-gradient(90deg, #eee, transparent) 1
    @media screen and (max-width 768px)
      box-shadow 0 1px 0 #aaa
      border-image none
  .hot-more
    padding-left 10px
    font-size 12px
    color #eee
    cursor pointer
  .hot-info-wrapper
    width 100%
    height 200px
    background-size cover
    background-position center center
    position relative
    @media screen and (max-width 700px)
      width 100%
  .hot-info
    width 100%
    position absolute
    top 50%
    transform translate(0, -50%)
  .hot-avatar
  .hot-nickname
  .hot-signature
    margin auto
    padding-top 10px
    color #eee
    text-align center
    text-shadow 1px 1px 0 #333
  .hot-avatar
    width 80px
    height 80px
    background-size cover
    background-position center center
    border-radius 50%
    box-shadow 0 0 5px #eee inset,
               0 0 5px #333
    vertical-align bottom
  .hot-nickname
    font-size 20px
    font-weight bold
    color #009fab
  .hot-signature
    padding 10px 20px 0
    font-size 12px
</style>
