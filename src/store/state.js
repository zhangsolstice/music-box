export default () => {
  return {
    isNavActive: false,
    isPlayerActive: false,
    isSearching: false,
    isCollect: false,
    isPlayed: false,
    collectSongs: [],
    loginErrInfo: '',
    personalPlaylists: [],
    personalRadios: [],
    personalNewSongs: [],
    playlists: {
      type: '',
      cat: '',
      updateTime: '',
      list: []
    },
    catRadios: [],
    popArtists: [],
    catArtists: [],
    newAlbums: [],
    topAlbums: [],
    hots: {
      userId: '',
      userNickname: '',
      userAvatarUrl: '',
      userBackgroundUrl: '',
      userSignature: '',
      tracks: []
    },
    playlistDetails: {
      id: '',
      name: '',
      coverImgUrl: '',
      tags: [],
      createTime: '',
      tracks: [],
      userNickname: '',
      userAvatarUrl: '',
      userId: ''
    },
    relatedPlaylists: [],
    radioDetails: {
      id: '',
      name: '',
      picUrl: '',
      createTime: '',
      categoryId: '',
      category: '',
      userAvatarUrl: '',
      userId: '',
      userNickname: '',
      tracks: []
    },
    artistDetails: '',
    albumDetails: {
      id: '',
      name: '',
      alias: [],
      picUrl: '',
      company: '',
      createTime: '',
      artist: {},
      tracks: []
    },
    songDetails: {
      id: '',
      name: '',
      alia: [],
      artist: [],
      album: {
        id: '',
        name: ''
      },
      audioUrl: '',
      mvUrl: ''
    },
    artist: {
      id: '',
      name: '',
      userId: '',
      avatarUrl: '',
      backgroundUrl: '',
      desc: '',
      tracks: [],
      albums: []
    },
    search: {
      keywords: '',
      type: '',
      result: []
    },
    creator: {
      userId: '',
      nickname: '',
      avatarUrl: '',
      backgroundUrl: '',
      signature: '',
      allAuthTypes: [],
      ownPlaylists: [],
      collectPlaylists: []
    },
    userInfo: {
      status: false,
      id: 0,
      nickname: '',
      avatarUrl: '',
      recommendPlaylists: {
        id: '',
        name: '',
        copywriter: '',
        picUrl: '',
        playcount: ''
      },
      recommendSongs: [],
      ownPlaylists: [],
      collectPlaylists: []
    },
    currentSong: {
      id: '',
      name: '',
      publishTime: '',
      duration: '',
      audioUrl: '',
      videoUrl: '',
      lyric: {
        data: '',
        userId: '',
        userNickname: '',
        upTime: ''
      },
      artists: [],
      album: {
        id: '',
        name: '',
        picUrl: ''
      }
    },
    playerList: [],
    playerCurrentSongIndex: 0
  }
}
