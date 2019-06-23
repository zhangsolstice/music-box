<template lang="pug">
  div(
    :class='["recommend"]'
  )
    Carousel
    Introduction
    section(
      :class='["content-wrapper"]'
    )
      section(
        :class='["content-withouthot-wrapper"]'
      )
        Personal(
          v-if='getUserInfo.status'
        )
        section(
          :class='["playlists-radios-newsongs-wrapper"]'
        )
          Playlists
          section(
            :class='["radios-newsongs-wrapper"]'
          )
            Radios
            NewSongs
        Artists
        Albums
      Hot
</template>

<script>
import { mapGetters } from 'vuex'
import Carousel from './recommend-carousel'
import Introduction from './recommend-introduction'
import Personal from './recommend-personal'
import Playlists from './recommend-playlists'
import Radios from './recommend-radios'
import NewSongs from './recommend-newsongs'
import Artists from './recommend-artists'
import Albums from './recommend-albums'
import Hot from './recommend-hot'

export default {
  components: {
    Carousel,
    Introduction,
    Personal,
    Playlists,
    Radios,
    NewSongs,
    Artists,
    Albums,
    Hot
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .recommend
    width 100%
    height 100%
    overflow hidden
    position relative
    font-size .18rem
  .content-wrapper
    display flex
    justify-content space-between
    width 100%
    @media screen and (max-width: 1024px)
      flex-direction column
  .content-withouthot-wrapper
    width 70vw
    @media screen and (max-width: 1024px)
      width 100vw
  .playlists-radios-newsongs-wrapper
    display flex
    width 100%
    @media screen and (max-width: 1024px)
      flex-direction column
  .radios-newsongs-wrapper
    width 50%
    @media screen and (max-width: 1024px)
      width 100%
</style>
