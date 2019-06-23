<template lang="pug">
  div(
    :class='["radio"]'
  )
    section(
      :style='{backgroundImage: `url("${getRadioDetails.picUrl}")`}'
      :class='["radio-info-wrapper"]'
    )
      div(
        :class='["radio-info"]'
      )
        h1(
          :class='["radio-name"]'
        ) {{ getRadioDetails.name }}
        a(
          :style='{backgroundImage: `url("${getRadioDetails.userAvatarUrl}")`}'
          :class='["radio-creator-avatar"]'
          @click='jumpToCreator(getRadioDetails.userId)'
        )
        a(
          :class='["radio-creator-nickname"]'
          @click='jumpToCreator(getRadioDetails.userId)'
        ) {{ getRadioDetails.userNickname }}
        span(
          :class='["radio-create-time"]'
        ) {{ getRadioDetails.createTime }} 创建
        span(
          :class='["radio-tag"]'
          @click='jumpToRadios(getRadioDetails.categoryId)'
        ) {{ getRadioDetails.category }}
    ControlAll(
      :radio='"radio"'
      :list='getRadioDetails.tracks'
    )
    SongList(
      :list='getRadioDetails.tracks'
      :radio='"radio"'
    )
</template>

<script>
import { mapGetters } from 'vuex'
import SongList from 'components/common/song-list'
import ControlAll from 'components/common/control-all'

export default {
  components: {
    SongList,
    ControlAll
  },
  props: {
    radioId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'getRadioDetails'
    ])
  },
  created () {
    (async () => {
      await this.$store.dispatch('requestRadioDetailsInfo', {
        rid: this.radioId,
        limit: 1000,
        offset: 0
      })
    })()
  },
  methods: {
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    },
    jumpToRadios (id) {
      this.$router.push(`/radios/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .radio
    font-size .18rem
    margin auto
    width 700px
    background-color rgba(33, 33, 33, .7)
    background-clip padding-box
    @media screen and (max-width 700px)
      width 100vw
  .radio-info-wrapper
    width 700px
    height 500px
    padding-top 370px
    background-size cover
    background-position center
    @media screen and (max-width 700px)
      width 100vw
  .radio-info
    width 100%
    height 125px
    color #eee
    background linear-gradient(0deg, rgba(60, 60, 60, 1), transparent)
    text-shadow 1px 1px 0 #111
  .radio-name
  .radio-creator-avatar
  .radio-creator-nickname
  .radio-create-time
    display block
    margin 5px 0 0 5px
    width 100%
  .radio-name
    font-size 18px
    font-weight bold
  .radio-creator-avatar
    display inline-block
    margin-right 10px
    width 25px
    height 25px
    background-size contain
    background-repeat no-repeat
    border-radius 50%
    vertical-align bottom
    cursor pointer
  .radio-creator-nickname
    display inline-block
    font-size 14px
    color #1c92d2
    width calc(700px - 50px)
    text-shadow 1px 1px 0 rgba(30, 30, 30, .7)
    cursor pointer
    @media screen and (max-width 700px)
      width calc(100vw - 50px)
  .radio-create-time
    font-size 12px
  .radio-tag
    display inline-block
    font-size 14px
    margin 10px 6px 0
    padding 3px
    border 1px solid #aaa
    border-radius 6px
    cursor pointer
</style>
