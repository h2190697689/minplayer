<template>
    <div v-if="this.songList.length" class="player">
      <transition name="show">
        <div class="lager" v-show="lagershow">
          <p class="iconfont back" @click="toggleshow">&#xe601;</p>
          <div class="des">
            <p class="song-name">{{currentSong.name}}</p>
            <p class="song-singer">{{currentSong.singer}}</p>
          </div>
          <div class="middle"   @touchstart.prevent="playerTouchStart"
               @touchmove.prevent="playerTouchMove"
               @touchend="playerTouchEnd" >
            <transition name="pic">
              <div v-show="left0rright" class="pic">
                <div class="img-wrapper">
                  <img :src="this.currentSong.image"/>
                </div>
                <i class="iconfont pic-listener" :class="{'light':songState}">&#xe60d;</i>
                <p class="playingLyric">{{playingLyric}}</p>
              </div>
            </transition>
            <transition name="lyric">
                <Scroll v-show="!left0rright" ref="lyricList" class="lyric-wrapper" :data="currentLyric.lines">
                  <div class="lyric">
                    <p ref="lyricLine" class="lyric-item" :class="{'light': currentLineNum=== index}" v-for="(item,index) of currentLyric.lines" :key="index">{{item.txt}}</p>
                  </div>
                </Scroll>
            </transition>
          </div>
          <div class="btns">
            <div class="left-btn" :class="{'light':left0rright}"></div>
            <div class="right-btn" :class="{'light':!left0rright}"></div>
          </div>
          <div class="progress-bar-wrapper">
            <span class="left-time">{{ format(currentTime)}}</span>
            <progress-bar :percent="percent" @changePercent="changePercent"></progress-bar>
            <span class="right-time">{{ format(currentSong.duration)}}</span>
          </div>
          <div class="control">
            <span @click="changeMode" v-show="this.mode === 0" class="iconfont">&#xe602;</span>
            <span @click="changeMode" v-show="this.mode === 1" class="iconfont">&#xe60a;</span>
            <span @click="changeMode" v-show="this.mode === 2" class="iconfont">&#xe662;</span>
            <span @click="last" class="iconfont">&#xe620;</span>
            <span @click="stop" v-show="this.songState" class="iconfont">&#xe619;</span>
            <span @click="start" v-show="!this.songState" class="iconfont">&#xe632;</span>
            <span @click="next" class="iconfont">&#xe9d4;</span>
            <span v-show="!isLight(currentSong)" class="iconfont control-love1" @click="addLove(currentSong)">&#xe60c;</span>
            <span v-show="isLight(currentSong)" class="iconfont control-love2" @click="addLove(currentSong)">&#xe685;</span>
          </div>
        </div>
      </transition>
      <transition name="smallshow">
        <div class="small" v-show="!lagershow">
          <img class="rotate" :class="{'pause':!this.songState}" @click.prevent="toggleshow" :src="this.currentSong.image"/>
          <div @click="toggleshow" class="dsc">
            <p class="song-name">{{this.currentSong.name}}</p>
            <p class="song-singer">{{this.currentSong.singer}}</p>
          </div>
          <div class="control">
            <span @click="last" class="iconfont">&#xe620;</span>
            <span @click="stop" v-show="this.songState" class="iconfont">&#xe62f;</span>
            <span @click="start" v-show="!this.songState" class="iconfont start">&#xe61c;</span>
            <span @click="next" class="iconfont">&#xe9d4;</span>
            <span @click="showBottom" class="iconfont">&#xe717;</span>
          </div>
          <bottom-list ref="bottomList" @emitMode="changeMode" @close="hidBottom" @stop="stop" v-show="bottomShow"></bottom-list>
        </div>
      </transition>
      <audio ref="audio"  :src="currentSong.url" @canplay="ready(currentSong)"  @timeupdate="updateTime" @ended="nextSong" ></audio>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import ProgressBar from '../../common/progress-bar/ProgressBar'
import Lyric from 'lyric-parser'
import Scroll from '../../common/scroll/scroll'
import BottomList from '../../common/bottom-list/BottomList'

var init = false
var orgX = 0
var orgY = 0
var difX = 0
var difY = 0
export default {
  name: 'Player',
  components: {
    ProgressBar,
    // ProgressCircle,
    Scroll,
    BottomList
  },
  data () {
    return {
      lagershow: false,
      currentTime: 0,
      currentLyric: '',
      playingLyric: '',
      currentLineNum: 0,
      left0rright: true,
      bottomShow: false,
      lyricTimes: 0
    }
  },
  computed: {
    percent () {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters(['currentSong', 'currentIndex', 'songList', 'songState', 'mode', 'loveList', 'listenHistory'])
  },
  methods: {
    toggleshow () {
      this.lagershow = !this.lagershow
      this.$nextTick(() => {
        if (this.lagershow && !this.left0rright) {
          this.$refs.lyricList.refresh()
        }
      })
    },
    // 上一首歌
    last () {
      // 只有一首歌时单曲循环
      if (this.songList.length === 1) {
        this.circlePlay()
      } else {
        if (this.currentIndex === 0) {
          this.setCurrentIndex(this.songList.length - 1)
        } else {
          this.setCurrentIndex(this.currentIndex - 1)
        }
      }
    },
    // 下一首歌
    next () {
      // 只有一首歌时单曲循环
      if (this.songList.length === 1) {
        this.circlePlay()
      } else {
        if (this.currentIndex === this.songList.length - 1) {
          this.setCurrentIndex(0)
        } else {
          this.setCurrentIndex(this.currentIndex + 1)
        }
      }
    },
    // 停止歌曲
    stop () {
      this.setSongState(false)
      this.currentLyric.togglePlay()
      // this.$refs.audio.pause()
    },
    // 开始歌曲
    start () {
      this.setSongState(true)
      this.currentLyric.togglePlay()
      // this.$refs.audio.play()
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      let second = interval % 60 | 0
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    changePercent (percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    changeMode () {
      this.setMode((this.mode + 1) % 3)
    },
    nextSong () {
      // 0为顺序播放，1为随机播放，2为循环播放
      if (this.mode === 0) {
        // 列表只有一首歌时相当于循环播放
        if (this.songList.length === 1) {
          this.circlePlay()
        } else {
          // 播放在最后一条
          if (this.currentIndex === this.songList.length - 1) {
            this.setCurrentIndex(0)
          } else {
            this.setCurrentIndex(this.currentIndex + 1)
          }
        }
      } else if (this.mode === 1) {
        if (this.songList.length === 1) {
          this.circlePlay()
        } else {
          let index = Math.floor(Math.random() * (this.songList.length))
          console.log(index)
          if (index === this.currentIndex) {
            this.circlePlay()
          } else {
            this.setCurrentIndex(index)
          }
        }
      } else {
        this.circlePlay()
      }
    },
    // 循环播放
    circlePlay () {
      this.$refs.audio.currentTime = 0
      // 歌词回到第一行
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
      // 因为会触发canplayer事件所以可以不需要手动触发播放
      this.$refs.audio.play()
    },
    getLyric () {
      this.currentLyric = new Lyric(this.currentSong.lyric, this.handleLyric)
      this.currentLyric.play()
    },
    handleLyric ({lineNum, txt}) {
      if (this.songState) {
        // console.log(lineNum)
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          // 到下首歌时跳回到首句歌词
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
      }
      this.playingLyric = txt
    },
    playerTouchStart (e) {
      init = true
      orgX = e.touches[0].pageX
      orgY = e.touches[0].pageY
    },
    playerTouchMove (e) {
      if (init) {
        difX = e.touches[0].pageX - orgX
        difY = e.touches[0].pageY - orgY
      }
    },
    playerTouchEnd () {
      let absX = Math.abs(difX)
      let absY = Math.abs(difY)
      if (difX < 0 && absX > absY) {
        this.left0rright = false
        this.$nextTick(() => {
          if (this.lagershow && !this.left0rright) {
            this.$refs.lyricList.refresh()
          }
        })
      } else if (difX > 0 && absX > absY) {
        this.left0rright = true
      }
      init = false
    },
    showBottom () {
      this.bottomShow = true
      this.$refs.bottomList.refushScroll()
    },
    hidBottom () {
      this.bottomShow = false
    },
    addLove (item) {
      let cLoveList = this.loveList.slice()
      let index = -1
      let t = true
      // 取消喜爱
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
    ready (song) {
      // console.log('fjdsi')
      this.$refs.audio.play()
      this.setSongState(true)
      // 歌词播放,只执行一次
      if (this.lyricTimes === 0) {
        this.$nextTick(() => {
          this.getLyric()
          this.lyricTimes = 1
        })
      }
      // 添加记录操作
      let sListenHistory = this.listenHistory.slice()
      // 清除重复歌词
      for (let i in sListenHistory) {
        if (sListenHistory[i].name === song.name) {
          sListenHistory.splice(i, 1)
        }
      }
      sListenHistory.unshift(song)
      this.setListenHistory(sListenHistory)
    },
    ...mapMutations({
      setSongList: 'SET_SONG_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setSongState: 'SET_SONG_STATE',
      setMode: 'SET_MODE',
      setLoveList: 'SET_LOVE_LIST',
      setListenHistory: 'SET_LISTEN_HISTORY',
      setCurrentSong: 'SET_CURRENT_SONG'
    }),
    ...mapActions(['changeCurrentSong'])
  },
  watch: {
    currentSong (currentSong) {
      // console.log(this.currentLyric.lines)
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.currentLyric = ''
        this.currentLineNum = 0
      }
      // 添加歌曲，歌词
      // let BcurrentSong = Object.create(currentSong)
      // // console.log(currentSong)
      // Promise.all([BcurrentSong.getMusic(), BcurrentSong.getLyric()])
      //   .then(() => { this.setCurrentSong(BcurrentSong) })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      this.changeCurrentSong(currentSong)
      // lyricTimes置0
      this.lyricTimes = 0
    },
    songState (songState) {
      this.$nextTick(() => {
        // console.log(this.$refs.audio)
        if (this.lyricTimes === 0 || !this.currentSong) {
          return
        }
        songState ? this.$refs.audio.play() : this.$refs.audio.pause()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .show-enter,.show-leave-to{
    opacity: 0;
      .pic{
        transform: scale(0.8);
      }
    .control{
      transform: translateY(20px);
    }
  }
  .show-enter-active,.show-leave-active{
    transition: all 0.6s linear;
    .pic{
      transition: all 0.6s linear;
    }
    .control{
      transition: all 0.6s linear;
    }
  }
  .smallshow-enter,.smallshow-leave-to{
    transform: translateY(30px);
  }
  .smallshow-enter-active,.smallshow-leave-active{
    transition: all 0.6s linear;
  }
  .pic-enter,.pic-leave-to{
    opacity: 0;
    transform: translateX(-100%);
  }
  .pic-enter-active,.pic-leave-active{
    transition: all 0.6s linear;
  }
  .lyric-enter,.lyric-leave-to{
    opacity: 0;
    transform: translateX(100%);
  }
  .lyric-enter-active,.lyric-leave-active{
    transition: all 0.6s linear;
  }
  .lager{
    position: fixed;
    left: 0;
    right: 0;
    z-index: 100;
    top: 0;
    bottom: 0;
    background-color: #232845;
    .back{
      position: fixed;
      left: 10px;
      top: 10px;
      font-size: 24px;
      color: white;
    }
    .des{
      width: 100%;
      padding-left: 15%;
      color: white;
      /*overflow: hidden;*/
      .song-name{
        width: 70vw;
        margin-top: 16px;
        text-align: center;
        font-size: 18px;
        .ellipsis;
      }
      .song-singer{
        width: 70vw;
        text-align: center;
        margin-top: 14px;
        font-size: 14px;
        color: #cacaca;
        .ellipsis;
      }
    }
    .middle{
      position: fixed;
      top: 80px;
      bottom: 136px;
      width: 100%;
      z-index: -1;
      overflow: hidden;
    }
    .pic{
      .img-wrapper{
        position:absolute;
        top:0;
        bottom: 60px;
        width: 100%;
        opacity: 0.1;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .pic-listener{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 30px;
        text-align: center;
        color: #cacaca;
        opacity: 0.3;
      }
      .light{
        animation: mylight 5s infinite alternate linear;
      }
      @keyframes mylight {
        0%{
          color: darkorange;
          transform: translate(-100px,0);
        }
        25% {
          color: yellowgreen;
          transform: translate(-50px,50px);
        }
        50% {
          color: #FF5EEC;
          transform: translate(0,0);
        }
        75%{
          color: dodgerblue;
          transform: translate(50px,50px);
        }
        100% {
          color: darkorange;
          transform: translate(100px,0);
        }
      }
      .playingLyric{
        width: 100vw;
        position: absolute;
        left: 0;
        bottom: 10px;
        text-align: center;
        font-size: 16px;
        color: yellow;
      }
    }
     .lyric-wrapper{
       position: absolute;
       top: 0;
       bottom: 0;
       width: 100vw;
       border-top: 1px solid #333333;
       border-bottom: 1px dotted #333333;
       overflow: hidden;
     }
    .lyric{
      width: 100vw;
      text-align: center;
      color: white;
      .boxSize;
      padding-top: 14px;
      padding-left: 10vw;
      padding-right: 10vw;
      .light{
        color: yellow;
      }
      .lyric-item{
        margin-bottom: 16px;
        }
      }
    .btns{
      position: fixed;
      bottom: 106px;
      left: 50%;
      transform: translateX(-50%);
      .left-btn, .right-btn{
        display: inline-block;
        width: 10px;
        height: 10px;
       .borRadius(5px);
        background-color: darkolivegreen;
        transition: width 0.3s linear;
      }
      .right-btn{
        margin-left: 6px;
      }
      .light{
        width: 20px;
      }
    }
    .progress-bar-wrapper{
      width: 100vw;
      position: fixed;
      left: 0;
      bottom:80px;
      text-align: center;
      color: white;
      .left-time{
        margin-right: 6px;
      }
      .right-time{
        margin-left: 6px;
      }
    }
    .control{
      position: fixed;
      z-index: 100;
      bottom: 30px;
      width: 100%;
      display: flex;
      span{
        font-size: 24px;
        flex: 1;
        text-align: center;
        color: #F5FF40;
      }
    }
  }
  .small{
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 60px;
    background-color: rgb(17,30,74);
    img{
      position: absolute;
      left: 6px;
      bottom: 8px;
      width: 60px;
      height: 60px;
      .borRadius(50%);
    }
    .dsc{
      flex: 1;
      height: 60px;
      margin-left: 78px;
      margin-right: 160px;
      overflow: hidden;
      .song-name{
        margin-top: 10px;
        color: white;
        .ellipsis;
      }
      .song-singer{
        margin-top: 10px;
        color: #eaeaea;
        .ellipsis;
      }
    }
    .control{
      position: absolute;
      right: 4px;
      display: flex;
      width: 150px;
      height: 60px;
      line-height: 60px;
      color: white;
      span{
        flex: 1;
        font-size: 20px;
        text-align: center;
        &:nth-of-type(2){
          font-size: 24px;
        }
        &:nth-of-type(5){
          font-size: 26px;
        }
      }
      .start{
        font-size: 26px;
        margin-top: 2px;
      }
    }
  }
  .control-love1{
  }
  .control-love2{
    color: red !important;
  }
  .pause{
    animation-play-state: paused !important;
  }
  .rotate{
    animation: myrotate 30s linear infinite;
  }
  @keyframes myrotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
