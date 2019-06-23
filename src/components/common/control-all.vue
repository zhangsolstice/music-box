<template lang="pug">
  section(
    :class='["interaction"]'
  )
    label(
      for='playall'
      :class='["playall"]'
      @click='playAllSongs(list)'
    )
      div
      input(
        id='playall'
        type='button'
        value='播放全部'
      )
    label(
      for='add'
      :class='["add"]'
      @click='addAllSongs(list)'
    )
      div
      input(
        id='add'
        type='button'
        value='添加全部'
      )
    label(
      v-if='radio !== "radio"'
      for='collectall'
      :class='["collectall"]'
      @click='switchCollect'
    )
      div
      input(
        id='collectall'
        type='button'
        value='收藏全部'
      )
</template>

<script>

export default {
  components: {

  },
  props: {
    list: {
      type: [Object, Array, String],
      default: function () {
        return {}
      }
    },
    radio: {
      type: String,
      default: ''
    }
  },
  methods: {
    switchCollect () {
      let songs = this.list.map(v => {
        v = v.id
        return v
      })
      this.$store.dispatch('requestCollectSongs', songs)
      this.$store.dispatch('switchIsCollect', true)
    },
    playAllSongs (list) {
      (async () => {
        await localStorage.setItem('currentSongList', JSON.stringify(list))
        await localStorage.setItem('currentSongIndex', 0)
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: false,
          playerList: list
        })
        await this.$store.dispatch('requestPlayerCurrentSongIndex', 0)
        await this.$store.dispatch(
          'requestCurrentSong',
          [this.$store.getters.getPlayerList[this.$store.getters.getPlayerCurrentSongIndex].id]
        )
        document.getElementsByClassName('audio')[0].play()
        document.getElementsByClassName('lyric')[0].style.transform = 'translate(0, 90px)'
        this.$store.dispatch('switchIsPlayed', true)
      })()
    },
    addAllSongs (list) {
      (async () => {
        await localStorage.setItem(
          'currentSongList',
          JSON.stringify(JSON.parse(localStorage.getItem('currentSongList')).concat(list))
        )
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: true,
          playerList: list
        })
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .interaction
    margin 5px 0
    width 100%
    height 30px
  .playall
  .add
  .collectall
    display inline-block
    margin-left 5px
    padding 5px 3px
    width 80px
    height 30px
    border-radius 3px
    cursor pointer
  .playall
    background linear-gradient(90deg, #2b5876, #3d5173)
  .add
    background linear-gradient(90deg, #3d5173, #454a73)
  .collectall
    background linear-gradient(90deg, #454a73, #4e4376)
  .playall div
    background url('../../assets/images/sprite.png') -8px -297px
    background-size 204px 162px
  .add div
    background url('../../assets/images/sprite.png') -35px -186px
    background-size 174px 131px
  .collectall div
    background url('../../assets/images/sprite.png') -97px -186px
    background-size 174px 131px
  .playall>div
  .add>div
  .collectall>div
    display inline-block
    width 20px
    height 20px
  #playall
  #add
  #collectall
    display inline-block
    font-size 12px
    font-weight bold
    color #eee
    height 20px
    vertical-align top
    cursor pointer
  #playall
    background linear-gradient(90deg, #2b5876, #3d5173)
  #add
    background linear-gradient(90deg, #3d5173, #454a73)
  #collectall
    background linear-gradient(90deg, #454a73, #4e4376)
</style>
