<template lang="pug">
  section(
    :class='["song-lyric"]'
  )
    div(
      :class='["lyric"]'
    )
      p(
        v-if='getCurrentSong.lyric.userNickname'
        :class='["lyric-creator"]'
        @click='jumpToCreator(getCurrentSong.lyric.userId)'
      ) {{ '作者：' }} {{ getCurrentSong.lyric.userNickname }}
      p(
        :class='["lyric-lrc"]'
        v-for='(line, index) of currentLyric'
        :data-time='line.time'
        :key='index'
      ) {{ line.txt }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      lyric: ''
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentSong'
    ]),
    currentLyric () {
      let basedLyric = this.getCurrentSong.lyric.data
      const basedLyricArr = basedLyric.split('\n')
      const formatedLyric = basedLyricArr.map(v => {
        let time
        let txt
        v = v.trim()
        time = v.slice(1, v.indexOf(']')).split(':')
        time = (time[0] * 60 * 1000) + (time[1] * 1000)
        txt = v.slice((v.indexOf('] ') === -1 ? v.indexOf(']') : v.indexOf('] ')) + 1).trim()
        v = {
          time: time,
          txt: txt
        }
        return v
      }).sort((a, b) => {
        return a.time - b.time
      })
      return formatedLyric
    }
  },
  mounted () {

  },
  methods: {
    jumpToCreator (id) {
      this.$router.push({ name: 'creator', params: { creatorId: String(id) } })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .song-lyric
    font-size 16px
    font-weight bold
    width 100%
    max-width 700px
    height 220px
    text-align center
    text-shadow 1px 1px 0 #000
    background-color transparent
    opacity .8
    position fixed
    left 50%
    bottom 50px
    z-index -1
    transform-origin 50% 100%
    transform translate(-50%, 0) perspective(300px) rotateX(25deg)
    overflow hidden
  .lyric
    width 100%
    transform translate(0, 90px)
    transition all .3s ease-in-out
  .lyric-creator
  .lyric-lrc
    margin-bottom 20px
  .lyric-lrc
    font-size 18px
    font-weight bold
    color #fff
    text-shadow 2px 0 0 #333,
                0 2px 0 #333,
                2px 2px 0 #333,
                -2px -2px 0 #333,
                0 20px 5px #aaa
  .lyric-creator
    color #009fab
    cursor pointer
</style>
