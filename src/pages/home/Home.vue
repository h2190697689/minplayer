<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/home.jpg"/>
      </div>
      <Table></Table>
      <Scroll ref="scroll" :data="relSongList" class="content">
        <div>
          <!--轮播图-->
          <div class="swiper-wrapper">
            <swiper :options="swiperOption" >
              <swiper-slide v-for="item of sliders" :key="item.id">
                <img :src="item.picUrl">
              </swiper-slide>
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            <Loading v-show="!sliders.length" class="swiper-loading"></Loading>
          </div>
          <!--选项路由-->
          <div class="home-routers">
            <span @click="toTop"><i class="iconfont">&#xe769;</i>排行</span>
            <span @click="toSinger"><i class="iconfont">&#xe869;</i>歌手</span>
            <span @click="toPlayList"><i class="iconfont">&#xe65f;</i>歌单</span>
            <span @click="toAlbum"><i class="iconfont">&#xe675;</i>专辑</span>
          </div>
          <div class="song-wrapper">
            <div @click="addPlayer(index)" v-for="(item, index) of relSongList" :key="index" class="song">
              <img v-lazy="item.image">
              <p class="song-name">{{item.name}}</p>
              <p class="singer-name">{{item.singer}}</p>
            </div>
            <Loading v-show="!relSongList.length" class="song-loading"></Loading>
          </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Table from '../../common/table/Table'
import Song from '../../assets/js/song'
import Scroll from '../../common/scroll/scroll'
import Loading from '../../common/loading/loading'
import {getHomeList, getHomeDetail} from '../../assets/api/home'
import {mapMutations} from 'vuex'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'Home',
  mixins: [songMixin],
  components: {
    Table,
    Scroll,
    Loading
  },
  data () {
    return {
      sliders: [],
      swiperOption: {
        autoplay: 3000,
        loop: true
        // loopedSlides: 3,
        // loopAdditionalSlides: 3,
        // slidesPerView: 'auto',
        // centeredSlides: true
      },
      songs: []
    }
  },
  computed: {
    relSongList () {
      return this.songs.map((item) => {
        return new Song(item.data)
      })
    }
  },
  mounted () {
    this._getHomeDetail()
    this._getHomeList()
  },
  methods: {
    _getHomeList () {
      getHomeList().then((res) => {
        if (res.code === 0) {
          // console.log(res.data.slider)
          this.sliders = res.data.slider
        }
      })
    },
    _getHomeDetail () {
      // 展示数量
      let num = 30
      getHomeDetail(num).then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.songs = res.songlist
          // console.log(this.relSongList)
        }
      })
    },
    toTop () {
      this.$router.push('/top')
    },
    toSinger () {
      this.$router.push('/singer')
    },
    toPlayList () {
      this.$router.push('/playList')
    },
    toAlbum () {
      this.$router.push('/album')
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
  @swiperHeight:26vh;
  .content{
    position: fixed;
    top: @table-lh;
    bottom: 0;
    width: 100%;
    .swiper-wrapper{
      position: relative;
      width: 100%;
      height: @swiperHeight;
      .swiper-slide{
        img{
          width: 100%;
          height: @swiperHeight;
          transition: all 0.6s linear;
        }
        /*&.swiper-slide-active{*/
          /*img{*/
            /*margin-top: 0;*/
            /*width: 100%;*/
            /*height: 100%;*/
          /*}*/
        /*}*/
      }
      .swiper-loading{
        position: absolute;
        top:50%;
        transform: rotateY(-50%);
      }
    }
    .home-routers{
      display: flex;
      width: 100%;
      .boxSize;
      padding:10px 0 10px 10px;
      span{
        flex: 1;
        margin-right: 12px;
        background-color: rgba(8,86,122,0.6);
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        color: white;
        .borRadius(6px);
        i{
          font-size: 24px;
          margin-right: 4px;
        }
        i:nth-of-type(1){
          vertical-align: top;
        }
      }
    }
    .song-wrapper{
      margin: 4px 16px 0 16px;
      .song{
        display: inline-block;
        vertical-align: top;
        .boxSize;
        overflow: hidden;
        width: 30%;
        margin: 16px 1.5% 30px 1.5%;
        img{
          width: 100%;
          height: 130px;
        }
        .song-name{
          margin-top: 6px;
          font-size: 14px;
          color: white;
          text-align: center;
          .ellipsis;
        }
        .singer-name{
          margin-top: 6px;
          font-size: 14px;
          color: white;
          text-align: center;
          .ellipsis;
        }
      }
      .song-loading{
        position: fixed;
        top:70vh;
        z-index: 16;
      }
    }
  }
</style>
