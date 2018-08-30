<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/top-detail.jpg"/>
      </div>
      <Back></Back>
      <div v-if="allList.mid" ref="header" class="header">
        <img v-lazy="getRelPic(allList.mid)" />
        <div class="detail">
          <p class="title">{{allList.name}}</p>
          <p class="singer">{{allList.singername}}</p>
          <p class="times">歌曲总数：{{allList.total}}</p>
          <p class="update">{{allList.aDate}} 更新</p>
        </div>
      </div>
      <transition name="fix">
        <div v-show="fixShow" class="fix-header">{{allList.name}}</div>
      </transition>
      <Scroll ref="scroll" class="detail-wrapper" :listenScroll="true" :probeType="3" @scroll="toDoScroll" :data="relSongList">
        <div class="song-wrapper">
          <div @click="addPlayer(index)" class="song" v-for="(item, index) of relSongList" :key="index">
            <div class="song-num">{{index + 1}}</div>
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
import {getAlbumDetail} from '../../assets/api/album'
import {mapMutations} from 'vuex'
import Song from '../../assets/js/song'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'AlbumDetail',
  mixins: [songMixin],
  components: {
    Back,
    Scroll
  },
  data () {
    return {
      fixShow: false,
      songs: [],
      allList: {}
    }
  },
  computed: {
    relSongList () {
      return this.songs.map((item) => {
        return new Song(item)
      })
    }
  },
  mounted () {
    this._getAlbumDetail()
  },
  methods: {
    _getAlbumDetail () {
      let id = this.$route.params.id
      getAlbumDetail(id).then((res) => {
        if (res.code === 0) {
          this.songs = res.data.list
          this.allList = res.data
          // console.log(res)
          // console.log(this.relSongList)
        }
      })
    },
    getRelPic (mid) {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg?max_age=2592000`
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
    /*background-color: rgb(24,47,90);*/
    background-color: rgba(0,12,28,0.5);
    img{
      width: 128px;
      height: 128px;
      margin-top: 18px;
      margin-left: 10px;
    }
    .detail{
      flex: 1;
      margin-top: 32px;
      margin-left: 12px;
      overflow: hidden;
      color: white;
      font-family: "Adobe 仿宋 Std R";
      .title{
        font-size: 22px;
        .ellipsis;
      }
      .singer{
        margin-top: 10px;
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
