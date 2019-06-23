<template lang="pug">
  section(
    :class='["video-player", active ? "video-player-active" : ""]'
  )
    video(
      controls
      v-if='getCurrentSong.videoUrl'
      :src='getCurrentSong.videoUrl'
      :class='["video"]'
    )
    div(
      v-if='!getCurrentSong.videoUrl'
      :class='["video-no"]'
    )
      p(
        :class='["video-no-content"]'
      ) {{ '此歌曲无相关视频' }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentSong'
    ])
  }
}
</script>

<style lang="stylus" scoped>
 .video-player
    width 100%
    height 100%
    position absolute
    top 100%
    right -100%
    z-index -100000
    opacity 0
    transition all .5s ease-in-out
  .video-player-active
    top 0
    right 0
    z-index 0
    opacity 1
    transition all .5s ease-in-out
  .video
    width 100%
    height calc(100% - 30px)
  .video-no
    width 100%
    height 100%
    font-size 30px
    font-weight bold
    text-align center
    box-shadow 0 0 30px #eee inset
    background-color #333
    opacity .8
    position relative
  .video-no-content
    text-shadow 2px 2px 0 #333,
                -2px 2px 0 #333,
                2px -2px 0 #333,
                -2px -2px 0 #333
    white-space nowrap
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>
