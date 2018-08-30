<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/top-detail.jpg"/>
      </div>
      <Back></Back>
      <div v-if="allList.topinfo && allList.topinfo.pic" ref="header" class="header">
        <img v-lazy="allList.topinfo.pic" />
        <div class="detail">
          <p class="title">{{allList.topinfo.ListName}}</p>
          <p class="times">播放数量：{{num}}</p>
          <p class="update">{{allList.update_time}} 更新</p>
        </div>
      </div>
      <transition name="fix">
        <div v-if="fixShow" class="fix-header">{{allList.topinfo.ListName}}</div>
      </transition>
      <Scroll ref="scroll" class="detail-wrapper" :listenScroll="true" :probeType="3" @scroll="toDoScroll" :data="relSongList">
        <div class="song-wrapper">
          <div @click="addPlayer(index)" class="song" v-for="(item, index) of relSongList" :key="index">
            <div class="song-num" :class="{'light':index === 0 || index === 1 || index === 2}">{{index + 1}}</div>
            <div class="song-detail">
              <p class="song-name">{{item.name}}</p>
              <p class="singer-name">{{item.singer}}</p>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
</template>
<script>
import Back from '../../common/back/Back'
import Scroll from '../../common/scroll/scroll'
import {getTopMusic} from '../../assets/api/top'
import {mapMutations} from 'vuex'
import Song from '../../assets/js/song'
import {handlePlayAmoumt} from '../../assets/js/util'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'TopDetail',
  mixins: [songMixin],
  components: {
    Back,
    Scroll
  },
  data () {
    return {
      songs: [],
      allList: {},
      fixShow: false
    }
  },
  computed: {
    relSongList () {
      return this.songs.map((item) => {
        return new Song(item.data)
      })
    },
    num () {
      return handlePlayAmoumt(this.allList.topinfo.listennum)
    }
  },
  created () {
    this._getTopMusic()
  },
  methods: {
    _getTopMusic () {
      let id = this.$route.params.id
      getTopMusic(id).then((res) => {
        // console.log(res)
        if (res.code === 0) {
          this.allList = res
          this.songs = res.songlist
          // console.log(this.allList)
          // console.log(this.relSongList)
        }
      })
    },
    toDoScroll (pos) {
      // console.log(pos.y)
      if (pos.y < 0) {
        this.$refs.header.style.transform = 'translateY(' + pos.y + 'px)'
      }
      if (pos.y < -60) {
        this.fixShow = true
      } else {
        this.fixShow = false
      }
    },
    addPlayer (index) {
      this.setSongList(this.relSongList)
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setSongList: 'SET_SONG_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setSongState: 'SET_SONG_STATE'
    })
  }
}
</script>

<style lang="less" scoped>
 @import "../../assets/less/base";
 .fix-enter,.fix-leave-to{
   transform: translateY(-60px);
   opacity: 0;
 }
 .fix-enter-active,.fix-leave-active{
   transition: all 0.9s linear;
 }
  .header{
    display: flex;
    width: 100vw;
    height: 160px;
    background-color: rgba(0,12,28,0.5);
    img{
      width: 128px;
      height: 128px;
      margin-top: 18px;
      margin-left: 10px;
    }
    .detail{
      flex: 1;
      margin-top: 42px;
      margin-left: 12px;
      overflow: hidden;
      color: white;
      .title{
        font-size: 22px;
        .ellipsis;
      }
      .times{
        margin-top: 10px;
        .ellipsis;
      }
      .update{
        margin-top: 10px;
        .ellipsis;
      }
    }
  }
  .fix-header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
    background-color: rgb(24,47,90);
    color: white;
    z-index: 10;
  }
  .detail-wrapper{
    position: fixed;
    top: 160px;
    bottom: 0;
    width: 100%;
  }
  .song-wrapper{
    margin-top: 10px;
    .song{
      display: flex;
      .boxSize;
      padding: 10px;
      height: 60px;
      color: white;
      .song-num{
        margin-left: 10px;
        display: inline-block;
        line-height: 40px;
      }
      .light{
        color: #FF5627;
        font-size: 16px;
      }
      .song-detail{
        flex: 1;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        margin-left: 12px;
        .song-name{
          font-size: 16px;
          .ellipsis;
        }
        .singer-name{
          margin-top: 6px;
          font-size: 14px;
          color: #A5A5A5;
          .ellipsis;
        }
      }
    }
  }
</style>
