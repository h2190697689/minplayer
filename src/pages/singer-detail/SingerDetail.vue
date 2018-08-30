<template>
    <transition name="slide">
          <div>
            <!--背景图片-->
            <div class="back-ground">
              <img src="../../assets/imgs/singer-detail.jpg"/>
            </div>
            <Back></Back>
            <div class="sing-header" v-show="singheadershow">{{name}}</div>
            <Scroll ref="scroll" class="scroll1" :data="songmap" :listenScroll='true ' :probeType='3' @scroll="handleScroll">
              <div>
                <div v-show="this.pic" class="header">
                  <img :src="this.pic"/>
                  <div class="singer-dsc">
                    <p class="singer-name">{{this.name}}</p>
                    <p class="singer-total">单曲数: {{this.total}}</p>
                  </div>
                </div>
                <div class="song-wrapper">
                  <div class="song-item" v-for="(item,index) of this.songmap" @click="storeSongMap(index)" :key="index">
                    <p class="song-name">{{item.name}}</p>
                    <p class="song-album">{{name}} - {{item.album}}</p>
                  </div>
                </div>
              </div>
            </Scroll>
          </div>
    </transition>
</template>

<script>
import {getSingerDetail} from '../../assets/api/singer'
import Song from '../../assets/js/song'
import Scroll from '../../common/scroll/scroll'
import Back from '../../common/back/Back'
import {mapGetters, mapMutations} from 'vuex'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'SingerDetail',
  mixins: [songMixin],
  components: {
    Scroll,
    Back
  },
  data () {
    return {
      songs: {},
      name: '',
      total: 0,
      pic: '',
      musicplace: '',
      singheadershow: false
    }
  },
  mounted () {
    this._getSingerDetail()
  },
  computed: {
    songmap () {
      var songmap = []
      if (this.songs) {
        for (let i in this.songs) {
          if (this.songs[i].musicData.songid && this.songs[i].musicData.albummid) {
            var song = new Song(this.songs[i].musicData)
            // song.getMusic()
            // song.getLyric()
            songmap.push(song)
          }
        }
      }
      return songmap
    },
    ...mapGetters(['songState'])
  },
  methods: {
    // 抓取个歌手歌单
    _getSingerDetail () {
      var id = this.$route.params.id
      getSingerDetail(id).then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.songs = res.data.list
          this.name = res.data.singer_name
          this.total = res.data.total
          this.pic = 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + res.data.singer_mid + '.jpg?max_age=2592000'
        }
      })
    },
    handleScroll (pos) {
      // console.log(pos)
      if (-pos.y > 150) {
        this.singheadershow = true
      } else {
        this.singheadershow = false
      }
    },
    storeSongMap (index) {
      this.setCurrentIndex(index)
      this.setSongList(this.songmap)
      this.setSongState(!this.songState)
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
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s
  }
  .background{
    img {
      width: 100%;
      height: 4.4rem;
    }
  }
  .sing-header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 53px;
    line-height: 53px;
    text-align: center;
    font-size: 18px;
    color: lightskyblue;
    z-index: 60;
    background-color: #333740;
  }
  .header{
    position: relative;
    img{
      width: 100%;
      height: 200px;
    }
    .singer-dsc{
      position:absolute;
      left: 16px;
      bottom: 16px;
      color: white;
      .singer-name{
        font-size: 0.36rem;
      }
      .singer-total{
        margin-top: 0.2rem;
        font-size: 0.24rem;
      }
    }
  }
  .scroll1{
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 10
  }
  .song-wrapper{
    color: white;
    .song-item {
      width: 100%;
      box-sizing: border-box;
      height: 60px;
      .boxSize;
      padding: 12px 20px;
      border-bottom: 1px #464741 dashed;
      overflow: hidden;
      .song-name{
        .ellipsis;
      }
      .song-album{
        margin-top: 10px;
        margin-left: 4px;
        font-size: 11px;
        color: lavender;
        .ellipsis;
      }
    }
  }
</style>
