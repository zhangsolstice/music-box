<template lang="pug">
  section(
    :class='["artists"]'
  )
    h1(
      :class='["artists-header"]'
    ) 热门歌手
      span(
        :class='["artists-more"]'
        @click='jumpToArtists'
      ) {{ '更多>>' }}
    div(
      :class='["artists-content"]'
    )
      div(
        :class='["artists-item"]'
        v-for='(artist, index) of this.$store.getters.getPopArtists'
        :key='artist.id'
      )
        a(
          :class='["artists-item-cover-wrapper"]'
          @click='jumpToArtist(artist.id)'
        )
          img(
            :class='["artists-item-cover"]'
            :src='artist.img1v1Url'
          )
        h4(
          :class='["artists-item-name"]'
          @click='jumpToArtist(artist.id)'
        ) {{ artist.name }}
</template>

<script>

export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    (async () => {
      await this.$store.dispatch('requestPopArtists', {
        limit: 6,
        offset: 3
      })
    })()
  },
  methods: {
    jumpToArtist (id) {
      this.$router.push(`/artist/${id}`)
    },
    jumpToArtists () {
      this.$router.push({ name: 'artists', params: { cat: 0, order: 'all' } })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .artists
    width 100%
  .artists-header
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
  .artists-more
    padding-left 10px
    font-size 12px
    color #eee
    cursor pointer
  .artists-content
    display flex
    width 100%
    padding 20px 0
    @media screen and (max-width 1024px)
      display block
      padding 20px 0 20px
      white-space nowrap
      overflow-x auto
      overflow-y hidden
      -webkit-overflow-scrolling touch
  .artists-item
    width calc(100% / 7)
    margin 0 10px
    @media screen and (max-width 1024px)
      display inline-block
      width 150px
      height 150px
  .artists-item-cover-wrapper
    display block
  .artists-item-name
    padding-top 10px
    font-size 14px
    color #eee
    text-align center
    text-shadow 1px 1px 0 #333
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    cursor pointer
</style>
