<template lang="pug">
  section(
    :class='["radios"]'
  )
    div(
        :class='["radios-items-wrapper"]'
      )
        div(
          :class='["radios-item"]'
          v-for='(radio, index) of getSearch.result'
          :key='index'
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
            :class='["radios-item-creator-nickname"]'
            @click='jumpToCreator(radio.creator.id)'
          ) by {{ radio.creator.name}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getSearch'
    ])
  },
  methods: {
    jumpToRadio (id) {
      this.$router.push(`/radio/${id}`)
    },
    jumpToCreator (id) {
      this.$router.push(`/creator/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .radios
    width 100%
    height 100%
    font-size 12px
    color #eee
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
