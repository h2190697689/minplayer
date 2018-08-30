const getters = {
  // 设置上面主路由的选项
  tableIndex (state) {
    return state.tableIndex
  },
  // 获取当前歌曲的播放状态
  songState (state) {
    return state.songState
  },
  // 获取歌曲列表
  songList (state) {
    return state.songList
  },
  currentIndex (state) {
    return state.currentIndex
  },
  // 获取当前歌曲
  currentSong (state) {
    return state.songList[state.currentIndex]
  },
  // 获取播放模式
  mode (state) {
    return state.mode
  },
  // 获取最爱歌曲
  loveList (state) {
    return state.loveList
  },
  // 获取搜索记录
  searchHistory (state) {
    return state.searchHistory
  },
  // 获取听歌记录
  listenHistory (state) {
    return state.listenHistory
  }
}
export default getters
