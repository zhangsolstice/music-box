<template lang="pug">
  section(
    :class='["radios"]'
  )
    h1(
      :class='["radios-header"]'
    ) 推荐电台
      span(
        :class='["radios-more"]'
        @click='jumpToRadios'
      ) {{ '更多>>' }}
    div(
      :class='["radios-content"]'
    )
      div(
        :class='["radios-item"]'
        v-for='(item, index) of radios'
        :key='item.id'
      )
        div(
          :class='["radios-item-info-wrapper"]'
        )
          a(
            :style='currentWidth < 1025 ? {backgroundImage: `url("${item.picUrl}")`} : {}'
            :class='["radios-item-info-cover-wrapper"]'
            @click='jumpToRedioDetails(item.id)'
          )
            img(
              v-if='currentWidth >= 1025'
              :src='item.picUrl'
              :class='["radios-item-info-cover"]'
            )
          div(
            :class='["radios-item-info-play"]'
          )
            span(
              :class='["radios-item-info-playcount-icon"]'
            )
            span(
              :class='["radios-item-info-playcount"]'
            ) {{ item.subCount }}
            span(
              :class='["radios-item-info-playall"]'
              @click='playAllSongs(item.id)'
            )
        h4(
          :class='["radios-item-intro"]'
          @click='jumpToRedioDetails(item.id)'
        ) {{ item.name }}
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      currentWidth: '',
      radios: []
    }
  },
  mounted () {
    this.currentWidth = window.innerWidth;
    (async () => {
      await this.$store.dispatch('requestPersonalRadios')
      this.radios = this.$store.getters.getPersonalRadios
    })()
    window.addEventListener('resize', () => {
      this.currentWidth = window.innerWidth
    })
  },
  methods: {
    jumpToRedioDetails (id) {
      this.$router.push(`/radio/${id}`)
    },
    jumpToRadios () {
      this.$router.push({ name: 'radios', params: { type: 3001 } })
    },
    playAllSongs (id) {
      (async () => {
        await this.$store.dispatch('requestRadioDetailsDj', {
          rid: id,
          limit: 1000,
          offset: 0
        })
        let list = await this.$store.getters.getRadioDetails.tracks
        await localStorage.setItem(
          'currentSongList',
          JSON.stringify(list)
        )
        await localStorage.setItem(
          'currentSongIndex',
          0
        )
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: false,
          playerList: list
        })
        await this.$store.dispatch('requestPlayerCurrentSongIndex', 0)
        await this.$store.dispatch(
          'requestCurrentSong',
          [this.$store.getters.getPlayerList[this.$store.getters.getPlayerCurrentSongIndex].id]
        )
        let audio = document.getElementsByClassName('audio')[0]
        audio.play()
        this.$store.dispatch('switchIsPlayed', true)
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .radios
    width 100%
  .radios-header
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
  .radios-more
    padding-left 10px
    font-size 12px
    color #eee
    cursor pointer
  .radios-content
    display grid
    grid-template-rows repeat(2, 1fr)
    grid-template-columns repeat(3, 1fr)
    grid-gap 50px 30px
    padding 20px 20px 30px 10px
    @media screen and (max-width 1024px)
      display block
      width 100%
      white-space nowrap
      overflow-x auto
      overflow-y hidden
      -webkit-overflow-scrolling touch
  .radios-item
    width 100%
    color #eee
    position relative
    @media screen and (max-width 1024px)
      display inline-block
      margin-right 20px
      width 170px
      vertical-align top
  .radios-item-info-wrapper
    position relative
  .radios-item-info-cover-wrapper
    display block
    width 100%
    @media screen and (max-width 1024px)
      width 170px
      height 170px
      background-size cover
      background-position center center
  .radios-item-info-play
    width 100%
    height 30px
    background linear-gradient(0deg, rgba(0, 0, 0, .65) 70%, transparent)
    box-shadow 0 1px 1px #333
    position absolute
    bottom 0
  .radios-item-info-playcount-icon
  .radios-item-info-playall
    background-size contain
    background-repeat no-repeat
  .radios-item-info-playcount-icon
    width 10px
    height 10px
    background url('../../../assets/images/sprite.png') -4px -117px
    background-size 102px 81px
    position absolute
    left 5px
    bottom 4px
  .radios-item-info-playcount
    font-size 12px
    position absolute
    left 18px
    bottom 1px
  .radios-item-info-playall
    width 25px
    height 25px
    background url('../../../assets/images/sprite.png') -8px -169px
    background-size 255px 203px
    position absolute
    right 0
    bottom 0
    cursor pointer
  .radios-item-intro
    padding-top 5px
    font-size 12px
    font-weight bold
    text-shadow 1px 1px 0 #333
    cursor pointer
    position absolute
    @media screen and (max-width 1024px)
      position static
      white-space normal
</style>
