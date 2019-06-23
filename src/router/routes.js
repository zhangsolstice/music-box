export default [
  {
    path: '/',
    redirect: {
      name: 'recommend'
    }
  },
  {
    path: '/recommend',
    component: () => import('components/content-components-wrapper/recommend/recommend.vue'),
    name: 'recommend'
  },
  {
    path: '/playlists/:type/:cat',
    component: () => import('components/content-components-wrapper/playlists/playlists.vue'),
    name: 'playlists',
    props: true
  },
  {
    path: '/radios/:type',
    component: () => import('components/content-components-wrapper/radios/radios.vue'),
    name: 'radios',
    props: true
  },
  {
    path: '/artists/:cat/:order',
    component: () => import('components/content-components-wrapper/artists/artists.vue'),
    name: 'artists',
    props: true
  },
  {
    path: '/albums',
    component: () => import('components/content-components-wrapper/albums/albums.vue'),
    name: 'albums'
  },
  {
    path: '/hots/:hotId',
    component: () => import('components/content-components-wrapper/hots/hots.vue'),
    name: 'hots',
    props: true
  },
  {
    path: '/recommendsongs',
    component: () => import('components/content-components-wrapper/recommend-songs/recommend-songs.vue'),
    name: 'recommendsongs'
  },
  {
    path: '/playlist/:playlistId',
    component: () => import('components/content-components-wrapper/playlist/playlist.vue'),
    name: 'playlist',
    props: true
  },
  {
    path: '/radio/:radioId',
    component: () => import('components/content-components-wrapper/radio/radio.vue'),
    name: 'radio',
    props: true
  },
  {
    path: '/artist/:artistId',
    component: () => import('components/content-components-wrapper/artist/artist.vue'),
    name: 'artist',
    props: true
  },
  {
    path: '/album/:albumId',
    component: () => import('components/content-components-wrapper/album/album.vue'),
    name: 'album',
    props: true
  },
  {
    path: '/search/:keywords/:type',
    component: () => import('components/content-components-wrapper/search/search.vue'),
    name: 'search',
    props: true
  },
  {
    path: '/creator/:creatorId',
    component: () => import('components/content-components-wrapper/creator/creator.vue'),
    name: 'creator',
    props: true
  },
  {
    path: '/user/:userId',
    component: () => import('components/content-components-wrapper/user/user.vue'),
    name: 'user',
    prop: true
  },
  {
    path: '*',
    component: () => import('views/404.vue'),
    name: '404'
  }
]
