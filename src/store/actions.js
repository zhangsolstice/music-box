import * as common from 'lib/common'
import * as login from 'api/login'
import * as personal from 'api/personal'
import * as playlists from 'api/playlists'
import * as radios from 'api/radios'
import * as newsongs from 'api/newsongs'
import * as artists from 'api/artists'
import * as albums from 'api/albums'
import * as hot from 'api/hot'
import * as detail from 'api/detail'
import * as artist from 'api/artist'
import * as search from 'api/search'
import * as creator from 'api/creator'
import * as songs from 'api/songs'

export default {
  switchNav ({ commit }) {
    commit('switchNav')
  },
  switchPlayer ({ commit }) {
    commit('switchPlayer')
  },
  switchIsSearching ({ commit }) {
    commit('switchIsSearching')
  },
  switchIsCollect ({ commit }, param) {
    commit('switchIsCollect', {
      isActive: param
    })
  },
  switchIsPlayed ({ commit }, param) {
    commit('switchIsPlayed', {
      isActive: param
    })
  },
  requestCollectSongs ({ commit }, songs) {
    commit('updateCollectSongs', {
      collectSongs: songs
    })
  },
  requestAddSongsToPlaylist ({ commit }, params) {
    return playlists.addSongsToPlaylist(params.pid, params.tracks)
  },
  checkLoginStatus ({ commit }) {
    return login.logStatus().then(res => {
      if (+res.data.code === 200) {
        commit('changeUserInfo', {
          status: true,
          id: res.data.profile.userId,
          nickname: res.data.profile.nickname,
          avatarUrl: res.data.profile.avatarUrl
        })
      }
    }).catch(err => {
      console.log(err)
      commit('changeUserInfo', {
        status: false,
        id: 0,
        nickname: '',
        avatarUrl: '',
        recommendPlaylists: '',
        recommendSongs: ''
      })
    })
  },
  updateLoginStatus ({ commit }, loginParams) {
    return login.login(
      loginParams.phone,
      loginParams.password,
      loginParams.countryCode
    ).then(res => {
      if (+res.data.code === 200) {
        commit('changeUserInfo', {
          status: true,
          id: res.data.profile.userId,
          nickname: res.data.profile.nickname,
          avatarUrl: res.data.profile.avatarUrl
        })
      }
    }).catch(err => {
      console.log(err)
      commit('changeUserInfo', {
        status: false,
        id: 0,
        nickname: '',
        avatarUrl: '',
        recommendPlaylists: '',
        recommendSongs: ''
      })
      commit('changeLoginErrInfo')
    })
  },
  logout ({ commit }) {
    return login.logout().then(res => {
      commit('changeUserInfo', {
        status: false,
        id: 0,
        nickname: '',
        avatarUrl: '',
        recommendPlaylists: '',
        recommendSongs: ''
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestRecommend ({ commit }) {
    return Promise.all([
      personal.recommendPlaylists(),
      personal.recommendSongs()
    ]).then(res => {
      return new Promise((resolve, reject) => {
        if (res[0] && res[0].status === 200) {
          commit('changeUserInfo', {
            recommendPlaylists: res[0].data.recommend.map(v => {
              v = {
                id: v.id,
                name: v.name,
                copywriter: v.copywriter,
                picUrl: v.picUrl,
                playcount: common.transformCount(v.playcount)
              }
              return v
            })
          })
        }
        if (res[1] && res[1].status === 200) {
          commit('changeUserInfo', {
            recommendSongs: res[1].data.recommend.map(v => {
              v = {
                id: v.id,
                name: v.name,
                alia: v.alia,
                duration: common.formatDuration(v.duration),
                artist: v.artists.map(vv => {
                  vv = {
                    id: vv.id,
                    name: vv.name
                  }
                  return vv
                }),
                album: {
                  id: v.album.id,
                  name: v.album.name
                }
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
      commit('changeUserInfo', {
        recommendPlaylists: '',
        recommendSongs: ''
      })
    })
  },
  requestPersonalPlaylists ({ commit }) {
    return playlists.personalPlaylists().then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updatePersonalPlaylists', {
            personalPlaylists: res.data.result.map(v => {
              v = {
                id: v.id,
                name: v.name,
                picUrl: v.picUrl,
                playCount: common.transformCount(v.playCount)
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestPersonalRadios ({ commit }) {
    return radios.personalRadios().then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updatePersonalRadios', {
            personalRadios: res.data.result.map(v => {
              v = {
                id: v.program.radio.id,
                name: v.program.radio.name,
                picUrl: v.program.radio.picUrl,
                subCount: common.transformCount(v.program.radio.subCount)
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestPersonalNewSongs ({ commit }) {
    return newsongs.personalNewSongs().then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updatePersonalNewSongs', {
            personalNewSongs: res.data.result.map(v => {
              v = {
                id: v.song.id,
                name: v.song.name,
                alia: v.song.alias,
                duration: common.formatDuration(v.song.duration),
                artist: v.song.artists.map(vv => {
                  vv = {
                    id: vv.id,
                    name: vv.name
                  }
                  return vv
                }),
                album: {
                  id: v.song.album.id,
                  name: v.song.album.name,
                  picUrl: v.song.album.blurPicUrl
                }
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestPlaylists ({ getters, commit }, params) {
    if (getters.getPlaylists.cat === params.cat && getters.getPlaylists.type === params.type && params.limit === 55) {
      return
    }
    if (getters.getPlaylists.cat !== params.cat || getters.getPlaylists.type !== params.type) {
      commit('updatePlaylists', {
        type: '',
        cat: '',
        updateTime: 0,
        list: []
      })
    }
    if (params.type === 'highquality') {
      return playlists.highQualityPlaylists(params.cat, params.limit, params.before).then(res => {
        return new Promise((resolve, reject) => {
          if (res && res.status === 200 && (!params.before || params.before === getters.getPlaylists.updateTime) && (res.data.playlists.length <= 55 || res.data.more)) {
            commit('updatePlaylists', {
              type: 'highquality',
              cat: params.cat,
              updateTime: res.data.playlists[res.data.playlists.length - 1].updateTime,
              list: res.data.playlists.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  coverImgUrl: v.coverImgUrl,
                  playCount: common.transformCount(v.playCount),
                  createTime: common.timestampToDate(v.createTime),
                  creatorNickname: v.creator.nickname,
                  creatorId: v.creator.userId
                }
                return v
              })
            })
          }
          resolve()
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      return playlists.hotAndNewPlaylists(params.type, params.cat, params.limit, params.offset).then(res => {
        return new Promise((resolve, reject) => {
          if (res && res.status === 200 && res.data.more) {
            commit('updatePlaylists', {
              type: params.type,
              cat: params.cat,
              list: res.data.playlists.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  coverImgUrl: v.coverImgUrl,
                  playCount: common.transformCount(v.playCount),
                  createTime: common.timestampToDate(v.createTime),
                  creatorNickname: v.creator.nickname,
                  creatorId: v.creator.userId
                }
                return v
              })
            })
          }
          resolve()
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  requestCatRadios ({ commit }, type) {
    return radios.typeRadios(type).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateCatRadios', {
            catRadios: res.data.djRadios.map(v => {
              v = {
                id: v.id,
                name: v.name,
                picUrl: v.picUrl,
                createTime: common.timestampToDate(v.createTime),
                rcmdtext: v.rcmdtext,
                userId: v.dj.userId,
                userNickname: v.dj.nickname
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestPopArtists ({ commit }, params) {
    return artists.popArtists(params.limit, params.offset).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updatePopArtists', {
            popArtists: res.data.artists.map(v => {
              v = {
                id: v.id,
                name: v.name,
                img1v1Url: v.img1v1Url
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestCatArtists ({ commit }, params) {
    return artists.catArtists(params.cat, params.initial, params.limit, params.offset).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200 && res.data.more) {
          commit('updateCatArtists', {
            catArtists: res.data.artists.map(v => {
              v = {
                id: v.id,
                name: v.name,
                img1v1Url: v.img1v1Url
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestNewAlbums ({ commit }) {
    return albums.newAlbums().then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateNewAlbums', {
            newAlbums: res.data.albums.map(v => {
              v = {
                id: v.id,
                name: v.name,
                picUrl: v.picUrl
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestTopAlbums ({ commit }, params) {
    return albums.topAlbums(params.limit, params.offset).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateTopAlbums', {
            topAlbums: res.data.albums.map(v => {
              v = {
                id: v.id,
                name: v.name,
                picUrl: v.picUrl,
                company: v.company,
                artists: v.artists.map(vv => {
                  vv = {
                    id: vv.id,
                    name: vv.name
                  }
                  return vv
                })
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestHots ({ commit }, idx) {
    return hot.hots(idx).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateHots', {
            userId: res.data.playlist.creator.userId,
            userNickname: res.data.playlist.creator.nickname,
            userAvatarUrl: res.data.playlist.creator.avatarUrl,
            userBackgroundUrl: res.data.playlist.creator.backgroundUrl,
            userSignature: res.data.playlist.creator.signature,
            tracks: res.data.playlist.tracks.map(v => {
              v = {
                id: v.id,
                name: v.name,
                artist: v.ar.map(vv => {
                  vv = {
                    id: vv.id,
                    name: vv.name
                  }
                  return vv
                }),
                album: {
                  id: v.al.id,
                  name: v.al.name
                }
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestPlaylistDetails ({ commit }, id) {
    return detail.playlistDetail(id).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updatePlaylistDetails', {
            id: res.data.playlist.id,
            name: res.data.playlist.name,
            coverImgUrl: res.data.playlist.coverImgUrl,
            tags: res.data.playlist.tags,
            createTime: common.timestampToDate(res.data.playlist.createTime),
            tracks: res.data.playlist.tracks.map(v => {
              v = {
                id: v.id,
                name: v.name,
                alia: v.alia,
                duration: common.formatDuration(v.dt),
                artist: v.ar.map(vv => {
                  vv = {
                    id: vv.id,
                    name: vv.name
                  }
                  return vv
                }),
                album: {
                  id: v.al.id,
                  name: v.al.name,
                  picUrl: v.al.picUrl
                }
              }
              return v
            }),
            userNickname: res.data.playlist.creator.nickname,
            userAvatarUrl: res.data.playlist.creator.avatarUrl,
            userId: res.data.playlist.userId
          })
        }
        resolve(res.data.playlist.id)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestRelatedPlaylists ({ commit }, id) {
    return playlists.relatedPlaylists(id).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateRelatedPlaylists', {
            relatedPlaylists: res.data.playlists
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestRadioDetailsInfo ({ dispatch, commit }, params) {
    return detail.radioDetailInfo(params.rid).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateRadioDetails', {
            id: res.data.djRadio.id,
            name: res.data.djRadio.name,
            picUrl: res.data.djRadio.picUrl,
            createTime: common.timestampToDate(res.data.djRadio.createTime),
            categoryId: res.data.djRadio.categoryId,
            category: res.data.djRadio.category,
            userAvatarUrl: res.data.djRadio.dj.avatarUrl,
            userId: res.data.djRadio.dj.userId,
            userNickname: res.data.djRadio.dj.nickname,
            tracks: []
          })
        }
        resolve(params)
      })
    }).then(params => {
      return new Promise((resolve, reject) => {
        dispatch('requestRadioDetailsDj', params)
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestRadioDetailsDj ({ commit }, params) {
    return detail.radioDetailDj(params.rid, params.limit, params.offset).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateRadioDetails', {
            tracks: res.data.programs.map(v => {
              v = {
                id: v.mainSong.id,
                name: v.mainSong.name,
                alia: v.mainSong.alias,
                duration: common.formatDuration(v.mainSong.duration),
                artist: [{
                  id: v.dj.userId,
                  name: v.dj.nickname
                }],
                album: {
                  id: v.radio.id,
                  name: v.radio.name,
                  picUrl: v.radio.picUrl
                }
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestAlbumDetails ({ commit }, id) {
    return detail.albumDetail(id).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateAlbumDetails', {
            id: res.data.album.id,
            name: res.data.album.name,
            alias: res.data.album.alias,
            picUrl: res.data.album.picUrl,
            company: res.data.album.company,
            createTime: common.timestampToDate(res.data.album.publishTime),
            artist: {
              id: res.data.album.artist.id,
              name: res.data.album.artist.name,
              picUrl: res.data.album.artist.picUrl
            },
            tracks: res.data.songs.map(v => {
              v = {
                id: v.id,
                name: v.name,
                alia: v.alia,
                duration: common.formatDuration(v.dt),
                artist: v.ar.map(v => {
                  v = {
                    id: v.id,
                    name: v.name
                  }
                  return v
                }),
                album: {
                  id: v.al.id,
                  name: v.al.name,
                  picUrl: v.al.picUrl
                }
              }
              return v
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestArtistInfoAndSongs ({ dispatch, commit }, params) {
    return artist.artistInfoAndSongs(params.id).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateArtist', {
            id: res.data.artist.id,
            name: res.data.artist.name,
            userId: res.data.artist.accountId,
            avatarUrl: res.data.artist.img1v1Url,
            backgroundUrl: res.data.artist.picUrl,
            desc: res.data.artist.briefDesc,
            tracks: res.data.hotSongs.map(v => {
              v = {
                id: v.id,
                name: v.name,
                artist: v.ar.map(vv => {
                  vv = {
                    id: vv.id,
                    name: vv.name
                  }
                  return vv
                }),
                album: {
                  id: v.al.id,
                  name: v.al.name
                }
              }
              return v
            }),
            albums: []
          })
        }
        resolve(params)
      })
    }).then(params => {
      dispatch('requestArtistAlbums', params)
    }).catch(err => {
      console.log(err)
    })
  },
  requestArtistAlbums ({ commit }, params) {
    return artist.artistAlbums(params.id, params.limit, params.offset).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateArtist', {
            albums: res.data.hotAlbums.map(v => {
              v = {
                id: v.id,
                name: v.name,
                picUrl: v.picUrl
              }
              return v
            })
          })
          resolve()
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestSearch ({ getters, commit }, params) {
    if (params.keywords === getters.getSearch.keywords && +params.type === +getters.getSearch.type && params.limit === 55) {
      return
    }
    return search.search(params.keywords, params.type, params.limit, params.offset).then(res => {
      if (getters.getSearch.keywords !== params.keywords || +getters.getSearch.type !== +params.type) {
        commit('updateSearch', {
          new: true,
          keywords: params.keywords,
          type: params.type,
          result: []
        })
      }
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          if (+params.type === 1 && res.data.result.songs) {
            commit('updateSearch', {
              new: false,
              keywords: params.keywords,
              type: params.type,
              result: res.data.result.songs.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  artist: v.artists.map(vv => {
                    vv = {
                      id: vv.id,
                      name: vv.name
                    }
                    return vv
                  }),
                  album: {
                    id: v.album.id,
                    name: v.album.name
                  }
                }
                return v
              })
            })
          }
          if (+params.type === 10 && res.data.result.albums) {
            commit('updateSearch', {
              new: false,
              keywords: params.keywords,
              type: params.type,
              result: res.data.result.albums.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  picUrl: v.picUrl,
                  company: v.company,
                  artists: v.artists.map(vv => {
                    vv = {
                      id: vv.id,
                      name: vv.name
                    }
                    return vv
                  })
                }
                return v
              })
            })
          }
          if (+params.type === 100 && res.data.result.artists) {
            commit('updateSearch', {
              new: false,
              keywords: params.keywords,
              type: params.type,
              result: res.data.result.artists.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  img1v1Url: v.img1v1Url
                }
                return v
              })
            })
          }
          if (+params.type === 1000 && res.data.result.playlists) {
            commit('updateSearch', {
              new: false,
              keywords: params.keywords,
              type: params.type,
              result: res.data.result.playlists.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  coverImgUrl: v.coverImgUrl,
                  playCount: common.transformCount(v.playCount),
                  creator: {
                    id: v.creator.userId,
                    name: v.creator.nickname
                  }
                }
                return v
              })
            })
          }
          if (+params.type === 1009 && res.data.result.djRadios) {
            commit('updateSearch', {
              new: false,
              keywords: params.keywords,
              type: params.type,
              result: res.data.result.djRadios.map(v => {
                v = {
                  id: v.id,
                  name: v.name,
                  picUrl: v.picUrl,
                  creator: {
                    id: v.dj.userId,
                    name: v.dj.nickname
                  }
                }
                return v
              })
            })
          }
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestCreator ({ dispatch, commit }, params) {
    return creator.creatorInfo(params.uid).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('updateCreator', {
            userId: res.data.profile.userId,
            nickname: res.data.profile.nickname,
            avatarUrl: res.data.profile.avatarUrl,
            backgroundUrl: res.data.profile.backgroundUrl,
            signature: res.data.profile.signature,
            allAuthTypes: res.data.profile.allAuthTypes
              ? res.data.profile.allAuthTypes.map(v => {
                v = v.desc
                return v
              })
              : [],
            ownPlaylists: [],
            collectPlaylists: []
          })
        }
        resolve(params)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestCreatorPlaylists ({ getters, commit }, params) {
    return creator.creatorPlaylists(params.uid, params.limit, params.offset).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          if (+getters.getUserInfo.id === +params.uid) {
            commit('changeUserInfo', {
              ownPlaylists: res.data.playlist.map(v => {
                if (+params.uid === +v.creator.userId) {
                  v = {
                    id: v.id,
                    name: v.name,
                    playCount: common.transformCount(v.playCount),
                    coverImgUrl: v.coverImgUrl
                  }
                  return v
                }
              }).filter(v => {
                if (v) {
                  return v
                }
              }),
              collectPlaylists: res.data.playlist.map(v => {
                if (+params.uid === +v.creator.userId) {
                  v = {
                    id: v.id,
                    name: v.name,
                    playCount: common.transformCount(v.playCount),
                    coverImgUrl: v.coverImgUrl
                  }
                  return v
                }
              }).filter(v => {
                if (v) {
                  return v
                }
              })
            })
            return
          }
          commit('updateCreator', {
            ownPlaylists: res.data.playlist.map(v => {
              if (+params.uid === +v.creator.userId) {
                v = {
                  id: v.id,
                  name: v.name,
                  playCount: common.transformCount(v.playCount),
                  coverImgUrl: v.coverImgUrl
                }
                return v
              }
            }).filter(v => {
              if (v) {
                return v
              }
            }),
            collectPlaylists: res.data.playlist.map(v => {
              if (+params.uid === +v.creator.userId) {
                v = {
                  id: v.id,
                  name: v.name,
                  playCount: common.transformCount(v.playCount),
                  coverImgUrl: v.coverImgUrl
                }
                return v
              }
            }).filter(v => {
              if (v) {
                return v
              }
            })
          })
        }
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestNewPlaylist ({ getters, commit }, name) {
    return playlists.createNewPlaylist(name).then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.status === 200) {
          commit('changeUserInfo', {
            ownPlaylists: getters.getUserInfo.ownPlaylists.concat({
              id: res.data.playlist.id,
              name: res.data.playlist.name,
              coverImgUrl: res.data.playlist.coverImgUrl
            })
          })
        }
        resolve(res.data.playlist.id)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestCurrentSong ({ commit }, ids) {
    return Promise.all([
      songs.songDetails(ids),
      songs.audio(ids),
      songs.lyric(ids)
    ]).then(res => {
      return new Promise((resolve, reject) => {
        let beforeUpdate
        if (res && res[0].status === 200 && res[1].status === 200 && res[2].status === 200) {
          beforeUpdate = {
            id: res[0].data.songs[0].id,
            name: res[0].data.songs[0].name,
            publishTime: common.timestampToDate(res[0].data.songs[0].publishTime),
            duration: common.formatDuration(res[0].data.songs[0].duration),
            artists: res[0].data.songs[0].ar.map(v => {
              v = {
                id: v.id,
                name: v.name
              }
              return v
            }),
            album: {
              id: res[0].data.songs[0].al.id,
              name: res[0].data.songs[0].al.name,
              picUrl: res[0].data.songs[0].al.picUrl
            },
            audioUrl: res[1].data.data[0].url,
            lyric: {
              data: res[2].data.lrc ? res[2].data.lrc.lyric : '抱歉，此歌曲暂无歌词',
              userId: res[2].data.lyricUser ? res[2].data.lyricUser.userid : '',
              userNickname: res[2].data.lyricUser ? res[2].data.lyricUser.nickname : '',
              upTime: res[2].data.lyricUser ? res[2].data.lyricUser.uptime : ''
            }
          }
        }
        if (!res[0].data.songs[0].mv) {
          commit('updateCurrentSong', Object.assign(beforeUpdate, { video: null }))
        }
        resolve([res[0].data.songs[0].mv, beforeUpdate])
      })
    }).then(data => {
      return songs.video(data[0]).then(res => {
        if (res && res.status === 200) {
          commit('updateCurrentSong', Object.assign(data[1], { videoUrl: res.data.data.url }))
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  requestPlayerList ({ getters, commit }, params) {
    if (params.isAddAtLast) {
      commit('updatePlayerList', {
        playerList: getters.getPlayerList.concat(params.playerList)
      })
    } else {
      commit('updatePlayerList', {
        playerList: params.playerList
      })
    }
  },
  requestPlayerCurrentSongIndex ({ commit }, playerCurrentSongIndex) {
    commit('updatePlayerCurrentSongIndex', {
      playerCurrentSongIndex: playerCurrentSongIndex
    })
  }
}
