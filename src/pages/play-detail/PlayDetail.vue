<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/top-detail.jpg"/>
      </div>
      <Back></Back>
      <div v-show="fixShow" class="fix-header"></div>
      <p class="des">{{cdList.dissname}}</p>
      <div ref="header" v-if="cdList.headurl" class="header">
        <img v-lazy="cdList.headurl"/>
        <p class="song-num">歌曲数：{{cdList.songnum}}</p>
        <p class="visit-num">播放数量：{{dealNum(cdList.visitnum)}}</p>
      </div>
      <Scroll ref="scroll" :data="relSongList" :listenScroll="true" :probeType="3" @scroll="dealScroll" class="song-wrapper">
        <div style="padding-bottom: 30px">
          <div class="song">
            <span class="song-name header-song">歌曲</span>
            <span class="song-singer">歌手</span>
            <span class="song-album">专辑</span>
          </div>
          <div @click="addPlayer(index)" v-for="(item, index) of relSongList" :key="index" class="song">
            <span class="song-name">{{index + 1}}&nbsp;&nbsp;{{item.name}}</span>
            <span class="song-singer">{{item.singer}}</span>
            <span class="song-album">{{item.album}}</span>
          </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Back from '../../common/back/Back'
import Scroll from '../../common/scroll/scroll'
import {getPlayDetail} from '../../assets/api/playList'
import Song from '../../assets/js/song'
import {handlePlayAmoumt} from '../../assets/js/util'
import {mapMutations} from 'vuex'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'PlayDetail',
  mixins: [songMixin],
  components: {
    Back,
    Scroll
  },
  data () {
    return {
      songs: [],
      cdList: [],
      fixShow: false
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
    this._getPlayDetail()
  },
  methods: {
    _getPlayDetail () {
      let id = this.$route.params.id
      getPlayDetail(id).then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.songs = res.cdlist[0].songlist
          this.cdList = res.cdlist[0]
        }
      })
    },
    dealNum (num) {
      return handlePlayAmoumt(num)
    },
    dealScroll (pos) {
      if (pos.y < 0) {
        this.$refs.header.style.transform = 'translateY(' + pos.y + 'px)'
      }
      if (pos.y < -120) {
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
  .des{
    position:fixed;
    top:20px;
    left: 15vw;
    width: 70vw;
    text-align: center;
    font-size: 22px;
    color: cornflowerblue;
    z-index: 10;
    .ellipsis;
  }
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 200px;
    background-color: rgba(0,12,28,0.6);
    img{
      width:180px ;
      height: 120px;
      margin-top: 60px;
      margin-left: 20px;
    }
    .song-num{
      position: absolute;
      bottom: 50px;
      right: 10px;
      text-align: center;
      font-size: 16px;
      color: white;
    }
    .visit-num{
      position: absolute;
      bottom: 20px;
      right: 10px;
      text-align: center;
      font-size: 16px;
      color: white;
    }
  }
  .song-wrapper{
    position: fixed;
    top:200px;
    width: 100%;
    bottom: 0;
    z-index: -2;
    /*overflow: hidden;*/
  }
  .song{
    width: 100%;
    height: 23px;
    color: white;
    margin-top: 18px;
    font-size: 18px;
    .song-name,.song-singer,.song-album{
      display: inline-block;
      .ellipsis;
      .boxSize;
      padding-right: 6px;
    }
    .song-name{
      width: 50%;
      padding-left: 10px;
    }
    .header-song{
      padding-left: 18px;
    }
    .song-singer{
      width: 20%;
    }
    .song-album{
      width: 20%;
    }
  }
  .fix-header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: rgb(24,47,90);
    z-index: 10;
  }
</style>
