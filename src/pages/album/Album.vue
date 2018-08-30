<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/home.jpg"/>
      </div>
      <div class="album-header">
        <Back></Back>
        <span>专辑列表</span>
      </div>
      <Scroll ref="scroll" :data="albumList" class="album-wrapper">
        <div>
          <div @click="toDetail(item.album_mid)" v-for="item of albumList" :key="item.album_id" class="album">
            <img v-lazy="getRelPic(item.album_mid)"/>
            <p class="song-name">{{item.album_name}}</p>
            <p class="singer-name">{{filterSinger(item.singers)}}</p>
            <p class="time">{{item.public_time}}</p>
          </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Back from '../../common/back/Back'
import Scroll from '../../common/scroll/scroll'
import {getAlbum} from '../../assets/api/album'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'Album',
  mixins: [songMixin],
  components: {
    Back,
    Scroll
  },
  data () {
    return {
      albumList: []
    }
  },
  mounted () {
    this._getAlbum()
  },
  methods: {
    _getAlbum () {
      getAlbum().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.albumList = res.albumlib.data.list
        }
      })
    },
    getRelPic (abmid) {
      return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + abmid + '.jpg?max_age=2592000'
    },
    filterSinger (singer) {
      var a = []
      if (!singer) {
        return ''
      }
      singer.forEach((s) => {
        a.push(s.singer_name)
      })
      return a.join('/')
    },
    toDetail (id) {
      this.$router.push('/album/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .album-header{
    position: fixed;
    top: 0;
    width: 100%;
    height: @table-lh;
    z-index: 2;
    background-color: #041960;
    text-align: center;
    opacity: 0.8;
    span{
      font-size: 18px;
      color: #1D8FFE;
      line-height: @table-lh;
    }
  }
  .album-wrapper{
    position: fixed;
    top:@table-lh;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .album{
    display: inline-block;
    vertical-align: top;
    width: 40%;
    margin: 14px 5% 14px 5%;
    overflow: hidden;
    img{
      width: 100%;
      height: 160px;
    }
    .song-name,.singer-name,.time{
      margin-top: 6px;
      font-size: 14px;
      color: white;
      text-align: center;
      .ellipsis;
    }
    .song-name{
      margin-top: 10px;
      font-size: 16px;
    }
    .singer-name{
    }
    .time{
    }
  }
</style>
