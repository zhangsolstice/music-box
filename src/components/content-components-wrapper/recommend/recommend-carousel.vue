<template lang="pug">
  div(
    :class='["carousel"]'
  )
    div(
      :class='["carousel-previous"]'
      @click='switchPrevious'
    ) {{ '<' }}
    div(
      :class='["carousel-next"]'
      @click='switchNext'
    ) {{ '>' }}
    div(
      :class='["carousel-content"]'
      v-for='(item, index) of 3'
      :key='index'
    )
      div(
        :class='["carousel-content-album"]'
      )
        div(
          :class='["carousel-content-album-split"]'
          v-for='(item, albumSplitIndex) of 5'
          :key='albumSplitIndex'
          @click='jumpToAlbum(index)'
        )
      div(
        :class='["carousel-content-artist"]'
      )
        div(
          :class='["carousel-content-artist-split"]'
          v-for='(item, artistSplitIndex) of 5'
          :key='artistSplitIndex'
          @click='jumpToArtist(index)'
        )
</template>

<script>

export default {
  data () {
    return {
      album: [
        '37000751',
        '2745274',
        '34874877'
      ],
      artist: [
        '228489',
        '32392',
        '939104'
      ]
    }
  },
  mounted () {
    const content = document.getElementsByClassName('carousel-content');
    [...content].map((v, k, a) => {
      v.style.opacity = 0
      a[0].style.opacity = 1
    })
  },
  methods: {
    switchPrevious () {
      const content = [...document.getElementsByClassName('carousel-content')]
      let currentIndex = 0
      if (+content[0].style.opacity === 1) {
        content[0].style.opacity = 0
        content[0].style.zIndex = -1
        content[content.length - 1].style.opacity = 1
        content[content.length - 1].style.zIndex = 1
        return ''
      }
      content.filter((v, k) => {
        if (+v.style.opacity === 1) {
          currentIndex = k
        }
      })
      content[currentIndex].style.opacity = 0
      content[currentIndex].style.zIndex = -1
      content[currentIndex - 1].style.opacity = 1
      content[currentIndex - 1].style.zIndex = 1
    },
    switchNext () {
      const content = [...document.getElementsByClassName('carousel-content')]
      let currentIndex = 0
      if (+content[content.length - 1].style.opacity === 1) {
        content[content.length - 1].style.opacity = 0
        content[content.length - 1].style.zIndex = -1
        content[0].style.opacity = 1
        content[0].style.zIndex = 1
        return ''
      }
      content.filter((v, k) => {
        if (+v.style.opacity === 1) {
          currentIndex = k
        }
      })
      content[currentIndex].style.opacity = 0
      content[currentIndex].style.zIndex = -1
      content[currentIndex + 1].style.opacity = 1
      content[currentIndex + 1].style.zIndex = 1
    },
    jumpToAlbum (index) {
      this.$router.push({ name: 'album', params: { albumId: this.album[index] } })
    },
    jumpToArtist (index) {
      this.$router.push({ name: 'artist', params: { artistId: this.artist[index] } })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .carousel
    width 100%
    height 40vw
    max-height 400px
    position relative
  .carousel-previous
  .carousel-next
    width 40px
    height 40px
    font-size 40px
    font-weight bold
    color #eee
    line-height 40px
    text-align center
    background-color transparent
    text-shadow 1px 0 0 #eee,
                0 1px 0 #eee
    position absolute
    top 50%
    z-index 2
    transform translate(0, -50%)
    cursor pointer
  .carousel-previous
    left 0
  .carousel-next
    right 0
  .carousel-content
    width 100%
    height 100%
    position absolute
    transition all 1s ease-in-out
    &:nth-of-type(3)
      z-index 1
  .carousel-content-album
  .carousel-content-artist
    width 50%
    height 100%
    position absolute
    cursor pointer
  .carousel-content-album
    left 0
  .carousel-content-artist
    right 0
  .carousel-content-album-split
  .carousel-content-artist-split
    width 100%
    height 100%
    box-shadow 1px 0 0 0 #333
    background-size cover
    background-position center
    background-repeat no-repeat
    transform-origin center center
    transform rotate(0)
    position absolute
    top 0
    left 0
    transition all 1s ease-in-out
  .carousel-content
    &:nth-of-type(3) .carousel-content-album-split
      background-image url("../../../assets/images/shirobon-album.jpg")
    &:nth-of-type(3) .carousel-content-artist-split
      background-image url("../../../assets/images/shirobon-artist.jpg")
    &:nth-of-type(4) .carousel-content-album-split
      background-image url("../../../assets/images/dubmood-album.jpg")
    &:nth-of-type(4) .carousel-content-artist-split
      background-image url("../../../assets/images/dubmood-artist.gif")
    &:nth-of-type(5) .carousel-content-album-split
      background-image url("../../../assets/images/DDRKirby-album.jpg")
    &:nth-of-type(5) .carousel-content-artist-split
      background-image url("../../../assets/images/DDRKirby-artist.jpg")
</style>
