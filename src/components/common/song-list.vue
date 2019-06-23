<template lang="pug">
  section(
    :class='["list"]'
  )
    ul
      li(
        :class='["song-list"]'
        v-for='(song, index) of list'
        :key='index'
      )
        span(
          :class='["serial-number"]'
        ) {{ index + 1 }}
        span(
          :class='["song-name"]'
          @click='addSongAtLast(song)'
        ) {{ song.name }}
          i(
            :class='["song-alia"]'
          )  {{ song.alia ? song.alia.join('') : '' }}
        div(
          :class='["more-info-switch", index === currentIndex ? "more-info-switch-active" : ""]'
          @click='onAndOff(index, song)'
        ) {{ radio !== 'radio' && album !== 'album' ? '⌵' : '+' }}
        section(
          v-if='index === currentIndex && radio !== "radio" && album !== "album"'
          :class='["more-info"]'
        )
          div(
            :class='["current-artist"]'
          )
            a(
              v-for='(artist, index) of song.artist'
              :key='artist.id'
              @click='jumpToArtist(artist.id)'
            ) {{ artist.name }} {{ index !== song.artist.length - 1 ? ' / ' : '' }}
          a(
            :class='["current-album"]'
            @click='jumpToAlbumDetails(song.album.id)'
          ) {{ song.album.name }}
          div(
            :class='["current-add"]'
            @click='addSong(song)'
          )
          div(
            :class='["current-collect"]'
            @click='switchCollect(song.id)'
          )
</template>

<script>

export default {
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
    },
    album: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentIndex: ''
    }
  },
  methods: {
    onAndOff (index, song) {
      const add = document.getElementsByClassName('more-info-switch')[index]
      if (add.innerHTML === '+') {
        localStorage.setItem(
          'currentSongList',
          JSON.stringify(JSON.parse(localStorage.getItem('currentSongList')).concat(song))
        )
        this.$store.dispatch('requestPlayerList', {
          isAddAtLast: true,
          playerList: song
        })
      }
      if (this.currentIndex !== index) {
        this.currentIndex = index
      } else {
        this.currentIndex = ''
      }
      return this.currentIndex
    },
    jumpToAlbumDetails (id) {
      this.$router.push(`/album/${id}`)
    },
    jumpToArtist (id) {
      this.$router.push(`/artist/${id}`)
    },
    switchCollect (id) {
      this.$store.dispatch('requestCollectSongs', [id])
      this.$store.dispatch('switchIsCollect', true)
    },
    addSongAtLast (song) {
      (async () => {
        await localStorage.setItem(
          'currentSongList',
          JSON.stringify(JSON.parse(localStorage.getItem('currentSongList')).concat(song))
        )
        await localStorage.setItem(
          'currentSongIndex',
          JSON.parse(localStorage.getItem('currentSongList')).length - 1
        )
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: true,
          playerList: song
        })
        await this.$store.dispatch('requestPlayerCurrentSongIndex', this.$store.getters.getPlayerList.length - 1)
        await this.$store.dispatch(
          'requestCurrentSong',
          [this.$store.getters.getPlayerList[this.$store.getters.getPlayerCurrentSongIndex].id]
        )
        document.getElementsByClassName('audio')[0].play()
        document.getElementsByClassName('lyric')[0].style.transform = 'translate(0, 90px)'
        this.$store.dispatch('switchIsPlayed', true)
      })()
    },
    addSong (song) {
      (async () => {
        await localStorage.setItem(
          'currentSongList',
          JSON.stringify(JSON.parse(localStorage.getItem('currentSongList')).concat(song))
        )
        await this.$store.dispatch('requestPlayerList', {
          isAddAtLast: true,
          playerList: song
        })
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list
  .list>ul
    width 100%
  .song-list
    width 100%
    color #eee
    &:nth-of-type(2n + 1)
      background linear-gradient(180deg, #414345 0px, #2e2e2f 30px, #232526 100px)
    &:nth-of-type(2n)
      background linear-gradient(180deg, #232526 0px, #2e2e2f 30px, #414345 100px)
  .serial-number
  .song-name
  .more-info-switch
    display inline-block
    font-size 16px
    height 30px
    line-height 30px
    vertical-align top
  .serial-number
  .more-info-switch
    width 30px
  .serial-number
    text-align center
  .more-info-switch
    font-weight bold
    text-align center
    margin-right 10px
    cursor pointer
    transition all .2s ease-in-out
  .more-info-switch-active
    transform rotate(180deg)
    transition all .2s ease-in-out
  .song-name
    padding 0 5px
    width calc(100% - 70px)
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    cursor pointer
  .song-alia
    font-size 12px
    color #ddd
  .more-info
    width 100%
    height 70px
    position relative
    animation more-info-show .3s ease-in-out
    @keyframes more-info-show
      0%
        opacity 0
      100%
        opacity 1
  .current-artist
  .current-album
    max-width calc(100% - 100px)
    height 20px
    font-size 12px
    line-height 20px
    position absolute
    left 15px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    cursor pointer
  .current-artist
    top 10px
  .current-album
    bottom 10px
  .current-add
    right 60px
    background url('../../assets/images/sprite.png') -41px -71px
  .current-collect
    right 20px
    background url('../../assets/images/sprite.png') -6px -103px
  .current-add
  .current-collect
    width 20px
    height 20px
    background-size 204px 162px
    position absolute
    bottom 25px
    cursor pointer
</style>
