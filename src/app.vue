<template lang="pug">
  div(class='app')
    audio(
      :class='["audio"]'
      :src='getCurrentSong.audioUrl'
    )
    Nav
    Player
    Content
    Bar
</template>

<script>
import { mapGetters } from 'vuex'
import Bar from 'views/bar'
import Nav from 'views/nav'
import Player from 'views/player'
import Content from 'views/content'

export default {
  components: {
    Nav,
    Player,
    Content,
    Bar
  },
  data () {
    return {
      imgLen: 0
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentSong'
    ])
  },
  watch: {
    imgLen (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  created () {
    this.$store.dispatch('checkLoginStatus')
  }
}
</script>

<style lang="stylus" scoped>
  .app
    width 100%
    height 100%
  .audio
    display none
    width 0
    height 0
</style>
