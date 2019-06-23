<template lang="pug">
  section(
    :class='["artists"]'
  )
    div(
      :class='["artists-items-wrapper"]'
    )
      div(
        :class='["artists-item"]'
        v-for='(artist, index) of getSearch.result'
        :key='index'
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getSearch'
    ])
  },
  methods: {
    jumpToArtist (id) {
      this.$router.push(`/artist/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .artists
    width 100%
    height 100%
    font-size 12px
    color #eee
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
