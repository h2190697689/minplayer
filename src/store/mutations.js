import * as types from './mutation-types'
// import storage from 'good-storage'
const mutations = {
  [types.SET_TABLE_INDEX] (state, index) {
    state.tableIndex = index
  },
  [types.SET_SONG_STATE] (state, nowState) {
    state.songState = nowState
  },
  [types.SET_SONG_LIST] (state, nowSongList) {
    state.songList = nowSongList
  },
  [types.SET_CURRENT_INDEX] (state, nowCurrentIndex) {
    state.currentIndex = nowCurrentIndex
  },
  [types.SET_MODE] (state, nowMode) {
    state.mode = nowMode
  },
  [types.SET_LOVE_LIST] (state, nowLoveList) {
    state.loveList = nowLoveList
  },
  [types.SET_SEARCH_HISTORY] (state, nowSearchHistory) {
    state.searchHistory = nowSearchHistory
  },
  [types.SET_LISTEN_HISTORY] (state, nowListenHistory) {
    state.listenHistory = nowListenHistory
  },
  [types.SET_CURRENT_SONG] (state, nowCurrentSong) {
    state.songList[state.currentIndex] = nowCurrentSong
  },
  [types.SET_SONG_MUSIC] (state, nowMusic) {
    state.songList[state.currentIndex].url = nowMusic
  },
  [types.SET_SONG_LYRIC] (state, nowLyric) {
    state.songList[state.currentIndex].lyric = nowLyric
  }
}

export default mutations
