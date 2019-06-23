<template lang="pug">
  nav(
    :class='["nav-items"]'
  )
    div(
      :class='["nav-item", getNavIsActive ? "nav-item-active" : ""]'
      v-for='(item, index) of navItems'
      :key='index'
    )
      router-link(
        :to='item.route'
        @click.native='switchNav'
      ) {{ item.name }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      navItems: [
        { name: '推荐', route: { name: 'recommend' } },
        { name: '歌单', route: { name: 'playlists', params: { type: 'hot', cat: '全部' } } },
        { name: '电台', route: { name: 'radios', params: { type: 3001 } } },
        { name: '艺人', route: { name: 'artists', params: { cat: 0, order: 'all' } } },
        { name: '专辑', route: { name: 'albums' } },
        { name: '排行', route: { name: 'hots', params: { hotId: 1 } } }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getNavIsActive'
    ])
  },
  methods: {
    ...mapActions([
      'switchNav'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .nav-items
    font-size 16px
    font-weight bold
    color #eee
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  .nav-item
    margin 5px 0
    padding 10px 0
    opacity 0
    transform translate(0, 10px)
    cursor pointer
    animation nav-item-cool .5s ease-in-out
    animation-fill-mode forwards
  @keyframes nav-item-cool
    0%
      opacity 1
    100%
      opacity 0
  .nav-item-active
    animation nav-item-hot .5s ease-in-out
    animation-fill-mode forwards
  .nav-item-active:nth-of-type(1)
    animation-delay .4s
  .nav-item-active:nth-of-type(2)
    animation-delay .5s
  .nav-item-active:nth-of-type(3)
    animation-delay .6s
  .nav-item-active:nth-of-type(4)
    animation-delay .7s
  .nav-item-active:nth-of-type(5)
    animation-delay .8s
  .nav-item-active:nth-of-type(6)
    animation-delay .9s
  @keyframes nav-item-hot
    0%
      opacity 0
      transform translate(0, 10px)
    80%
      opacity 1
      transform translate(0, 0)
    100%
      opacity 1
      transform translate(0, 0)
      text-shadow 0 0 2px #333
</style>
