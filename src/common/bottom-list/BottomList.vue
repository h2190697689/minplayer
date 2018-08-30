<template>
    <div @click="close" class="bottom-list">
      <div @click.stop class="bottom-wrapper">
        <div class="title">
          <p class="mode-list"  v-show="this.mode === 0">
            <span @click="emitMode" class="iconfont">&#xe602;</span>
            <span>顺序播放</span>
          </p>
          <p class="mode-list"  v-show="this.mode === 1">
            <span @click="emitMode" class="iconfont">&#xe60a;</span>
            <span>随机播放</span>
          </p>
          <p class="mode-list" v-show="this.mode === 2">
            <span @click="emitMode" class="iconfont">&#xe662;</span>
            <span>循环播放</span>
          </p>
          <span @click.stop.prevent="confirmClear" class="clear iconfont">&#xe604;</span>
        </div>
        <Confirm ref="confirm" :text="clearSong" @confirm="clearSongs(),stop()"></Confirm>
        <Scroll ref="scroll" v-show="this.songList.length" class="scroll">
          <div class="songs-wrapper">
            <div class="song-item" @click="selectSong(index)" v-for="(item,index) of this.songList" :key="index">
              <div class="index">{{index + 1}}</div>
              <div class="song">
                <p class="name">{{item.name}}</p>
                <p class="singer">{{item.singer}}</p>
              </div>
              <div v-show="!isLight(item)" @click.stop.prevent="addLove(item)" class="love iconfont">&#xe60c;</div>
              <div v-show="isLight(item)" @click.stop.prevent="addLove(item)" class="love light iconfont">&#xe685;</div>
              <div @click.stop="deleteSong(index)" class="delete">&Cross;</div>
            </div>
          </div>
        </Scroll>
        <div class="no-song" v-show="!this.songList.length">列表中暂无歌曲！</div>
        <div class="add-song">
          <span @click="toSearch(),close()" class="add-item">
            + 添加歌曲到当前列队
          </span>
        </div>
        <div class="close" @click="close">关闭</div>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Scroll from '../scroll/scroll'
import Confirm from '../confirm/confirm'
export default {
  name: 'bottom-list',
  components: {
    Scroll,
    Confirm
  },
  data () {
    return {
      clearSong: '确认清空歌单列表?'
    }
  },
  props: {
  },
  computed: {
    ...mapGetters(['mode', 'songList', 'loveList'])
  },
  methods: {
    emitMode () {
      this.$emit('emitMode')
    },
    close () {
      this.$emit('close')
    },
    refushScroll () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      }
      )
    },
    toSearch () {
      this.$router.push('/search')
    },
    selectSong (index) {
      this.setCurrentIndex(index)
    },
    confirmClear () {
      this.$refs.confirm.show()
    },
    clearSongs () {
      let n = []
      this.setSongList(n)
      setTimeout(() => {
        this.close()
      }, 1000)
    },
    deleteSong (index) {
      let sList = this.songList.slice()
      sList.splice(index, 1)
      this.setSongList(sList)
      // 刷新滚动条
      this.refushScroll()
    },
    stop () {
      this.$emit('stop')
    },
    addLove (item) {
      let cLoveList = this.loveList.slice()
      let index = -1
      let t = true
      for (let i in this.loveList) {
        if (item.name === this.loveList[i].name) {
          index = i
          t = false
        }
      }
      // 添加喜爱
      if (t === true) {
        cLoveList.unshift(item)
        t = true
        // 取消喜爱
      } else {
        cLoveList.splice(index, 1)
        t = false
      }
      this.setLoveList(cLoveList)
    },
    isLight (item) {
      for (let i in this.loveList) {
        if (item.name === this.loveList[i].name) {
          return true
        }
      }
      return false
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setSongList: 'SET_SONG_LIST',
      setLoveList: 'SET_LOVE_LIST'
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .bottom-list{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(7,17,27,0.7);
    .bottom-wrapper{
      width: 100vw;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 60vh;
      /*overflow: hidden;*/
      background-color: #061630;
    }
    .title{
      position: relative;
      .mode-list{
        height: 60px;
        box-sizing: border-box;
        padding-top: 20px;
        border-bottom: 1px solid darkgray;
        span:nth-of-type(1) {
          margin-left: 13px;
          font-size: 20px;
          color: dodgerblue;
        }
        span:nth-of-type(2) {
          margin-left: 10px;
          color: white;
        }
      }
      .clear{
        position: absolute;
        top: 20px;
        right: 10px;
        font-size: 20px;
        color: cornflowerblue;
      }
    }
    .song-item{
      display: flex;
        color: white;
        position: relative;
        border-bottom: 1px solid #333740;
        .index{
          vertical-align: top;
          margin-top: 20px;
          margin-left: 6px;
          font-size: 16px;
          color: white;
        }
        .song{
          flex: 1;
          margin-left: 10px;
          margin-right: 73px;
          box-sizing: border-box;
          padding-top: 10px;
          padding-bottom: 10px;
          overflow: hidden;
          .name{
            font-size: 16px;
            color: white;
            .ellipsis;
          }
          .singer{
            margin-top: 4px;
            margin-left: 2px;
            color: cornflowerblue;
            .ellipsis;
          }
        }
      .love{
        position: absolute;
        top: 19px;
        right: 40px;
        font-size: 18px;
      }
      .light {
        color: red;
      }
      .delete{
        position: absolute;
        top: 14px;
        right: 14px;
        font-size: 26px;
      }
    }
    .add-song{
      width: 100vw;
      position: absolute;
      bottom: 56px;
      text-align: center;
      .add-item{
        box-sizing: border-box;
        padding: 4px 12px;
        font-size: 16px;
        border: 1px solid white;
        .borRadius(12px);
        color: white;
      }
    }
    .close{
      width: 100vw;
      position: absolute;
      bottom: 16px;
      font-size: 18px;
      text-align: center;
      color: white;
    }
   }
  .songs-wrapper{
  }
  .scroll{
    position: absolute;
    left: 0;
    top: 60px;
    width: 100%;
    height: 34vh;
    box-sizing: border-box;
    border-bottom: 1px solid #333740;
    overflow: hidden;
  }
  .no-song{
    margin-top: 30%;
    color: white;
    font-size: 18px;
    text-align: center;
  }
</style>
