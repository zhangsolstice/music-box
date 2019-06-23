export default {
  switchNav (state) {
    state.isNavActive = !state.isNavActive
    if (state.isNavActive) {
      state.isPlayerActive = false
    }
    if (state.isSearching) {
      state.isSearching = false
    }
  },
  switchPlayer (state) {
    state.isPlayerActive = !state.isPlayerActive
    if (state.isPlayerActive) {
      state.isNavActive = false
    }
    if (state.isSearching) {
      state.isSearching = false
    }
  },
  switchIsSearching (state) {
    state.isSearching = !state.isSearching
    if (state.isPlayerActive) {
      state.isPlayerActive = false
    }
    if (state.isNavActive) {
      state.isNavActive = false
    }
  },
  switchIsCollect (state, payload) {
    if (!payload.isActive) {
      state.isCollect = false
    } else {
      state.isCollect = !state.isCollect
    }
  },
  switchIsPlayed (state, payload) {
    if (!payload.isActive) {
      state.isPlayed = false
    } else {
      state.isPlayed = true
    }
  },
  updateCollectSongs (state, payload) {
    state.collectSongs = payload.collectSongs
  },
  changeLoginErrInfo (state) {
    state.loginErrInfo = '用户名不存在或密码错误'
  },
  updatePersonalPlaylists (state, payload) {
    state.personalPlaylists = payload.personalPlaylists
  },
  updatePersonalRadios (state, payload) {
    state.personalRadios = payload.personalRadios
  },
  updatePersonalNewSongs (state, payload) {
    state.personalNewSongs = payload.personalNewSongs
  },
  updatePlaylists (state, payload) {
    state.playlists = {
      type: payload.type,
      cat: payload.cat,
      updateTime: payload.updateTime,
      list: payload.list.length === 0 ? payload.list : state.playlists.list.concat(payload.list)
    }
  },
  updateCatRadios (state, payload) {
    state.catRadios = payload.catRadios
  },
  updatePopArtists (state, payload) {
    state.popArtists = payload.popArtists
  },
  updateCatArtists (state, payload) {
    state.catArtists = payload.catArtists
  },
  updateNewAlbums (state, payload) {
    state.newAlbums = payload.newAlbums
  },
  updateTopAlbums (state, payload) {
    if (payload.topAlbums.length === 55) {
      state.topAlbums = payload.topAlbums
    } else if (payload.topAlbums.length === 0) {
      return state.topAlbums
    } else {
      state.topAlbums = state.topAlbums.concat(payload.topAlbums)
    }
  },
  updateHots (state, payload) {
    state.hots = {
      userId: payload.userId,
      userNickname: payload.userNickname,
      userAvatarUrl: payload.userAvatarUrl,
      userBackgroundUrl: payload.userBackgroundUrl,
      userSignature: payload.userSignature,
      tracks: payload.tracks
    }
  },
  updatePlaylistDetails (state, payload) {
    state.playlistDetails = {
      id: payload.id,
      name: payload.name,
      coverImgUrl: payload.coverImgUrl,
      tags: payload.tags,
      createTime: payload.createTime,
      tracks: payload.tracks,
      userNickname: payload.userNickname,
      userAvatarUrl: payload.userAvatarUrl,
      userId: payload.userId
    }
  },
  updateRelatedPlaylists (state, payload) {
    state.relatedPlaylists = payload.relatedPlaylists
  },
  updateRadioDetails (state, payload) {
    state.radioDetails = {
      id: payload.id || state.radioDetails.id,
      name: payload.name || state.radioDetails.name,
      picUrl: payload.picUrl || state.radioDetails.picUrl,
      createTime: payload.createTime || state.radioDetails.createTime,
      categoryId: payload.categoryId || state.radioDetails.categoryId,
      category: payload.category || state.radioDetails.category,
      userAvatarUrl: payload.userAvatarUrl || state.radioDetails.userAvatarUrl,
      userId: payload.userId || state.radioDetails.userId,
      userNickname: payload.userNickname || state.radioDetails.userNickname,
      tracks: payload.tracks
    }
  },
  updateArtistDetails (state, payload) {
    state.artistDetails = payload.artistDetails
  },
  updateAlbumDetails (state, payload) {
    state.albumDetails = {
      id: payload.id,
      name: payload.name,
      alias: payload.alias,
      picUrl: payload.picUrl,
      company: payload.company,
      createTime: payload.createTime,
      artist: payload.artist,
      tracks: payload.tracks
    }
  },
  updateSongDetails (state, payload) {
    state.songDetails = payload.songDetails
  },
  updateArtist (state, payload) {
    state.artist = {
      id: payload.id || state.artist.id,
      name: payload.name || state.artist.name,
      userId: payload.userId || state.artist.userId,
      avatarUrl: payload.avatarUrl || state.artist.avatarUrl,
      backgroundUrl: payload.backgroundUrl || state.artist.backgroundUrl,
      desc: payload.desc || state.artist.desc,
      tracks: payload.tracks || state.artist.tracks,
      albums: payload.albums || state.artist.albums
    }
  },
  updateSearch (state, payload) {
    if (payload.new) {
      state.search = {
        keywords: payload.keywords,
        type: payload.type,
        result: payload.result
      }
    }
    if (!payload.new) {
      state.search = {
        keywords: payload.keywords,
        type: payload.type,
        result: state.search.result.concat(payload.result)
      }
    }
  },
  updateCreator (state, payload) {
    state.creator = {
      userId: payload.userId || state.creator.userId,
      nickname: payload.nickname || state.creator.nickname,
      avatarUrl: payload.avatarUrl || state.creator.avatarUrl,
      backgroundUrl: payload.backgroundUrl || state.creator.backgroundUrl,
      signature: payload.signature || state.creator.signature,
      allAuthTypes: payload.allAuthTypes || state.creator.allAuthTypes,
      ownPlaylists: payload.ownPlaylists || state.creator.ownPlaylists,
      collectPlaylists: payload.collectPlaylists || state.creator.collectPlaylists
    }
  },
  changeUserInfo (state, payload) {
    state.userInfo = {
      status: payload.status || state.userInfo.status,
      id: payload.id || state.userInfo.id,
      nickname: payload.nickname || state.userInfo.nickname,
      avatarUrl: payload.avatarUrl || state.userInfo.avatarUrl,
      recommendPlaylists: payload.recommendPlaylists || state.userInfo.recommendPlaylists,
      recommendSongs: payload.recommendSongs || state.userInfo.recommendSongs,
      ownPlaylists: payload.ownPlaylists || state.userInfo.ownPlaylists,
      collectPlaylists: payload.collectPlaylists || state.userInfo.collectPlaylists
    }
  },
  updateCurrentSong (state, payload) {
    state.currentSong = {
      id: payload.id,
      name: payload.name,
      publishTime: payload.publishTime,
      duration: payload.duration,
      audioUrl: payload.audioUrl,
      videoUrl: payload.videoUrl,
      lyric: {
        data: payload.lyric.data,
        userId: payload.lyric.userId,
        userNickname: payload.lyric.userNickname,
        upTime: payload.lyric.upTime
      },
      artists: payload.artists,
      album: {
        id: payload.album.id,
        name: payload.album.name,
        picUrl: payload.album.picUrl
      }
    }
  },
  updatePlayerList (state, payload) {
    state.playerList = payload.playerList
  },
  updatePlayerCurrentSongIndex (state, payload) {
    state.playerCurrentSongIndex = payload.playerCurrentSongIndex
  }
}
