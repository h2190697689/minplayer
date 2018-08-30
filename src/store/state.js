const state = {
  // 头路由的指向
  tableIndex: 2,
  // 播放状态
  songState: false,
  // 歌曲列表
  songList: [],
  // 当前歌曲的下标
  currentIndex: -1,
  // 播放模式
  mode: 0, // 0为顺序播放播放,1为随机播放,2为循环播放
  // 喜爱列表
  loveList: [],
  // 搜索列表
  searchHistory: [],
  // 听歌记录
  listenHistory: []
}

export default state
