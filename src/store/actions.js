import * as types from './mutation-types'

const actions = {
  changeCurrentSong ({commit, state}, song) {
    let newSong = Object.create(song)
    Promise.all([newSong.getMusic(), newSong.getLyric()])
      .then((all) => {
        commit(types.SET_SONG_MUSIC, all[0])
        commit(types.SET_SONG_LYRIC, all[1])
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default actions
