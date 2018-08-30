<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/home.jpg"/>
      </div>
      <div class="top-header">
        <Back></Back>
        <span>排行榜</span>
      </div>
      <Scroll ref="scroll" :data="topList" class="top-wrapper">
        <div>
          <div @click="toDetail(item.id)" v-for="item of topList" :key="item.id" class="top-item">
            <img v-lazy="item.picUrl"/>
            <div class="top">
              <div class="title">{{item.topTitle }}</div>
              <p class="top-song" v-for="(inneritem, innerindex) of item.songList" :key="innerindex">
                {{innerindex + 1}}&nbsp;{{inneritem.songname}} - {{inneritem.singername}}
              </p>
              <span class="iconfont go">&#xe613;</span>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Back from '../../common/back/Back'
import Scroll from '../../common/scroll/scroll'
import {getTopList} from '../../assets/api/top'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'Top',
  mixins: [songMixin],
  data () {
    return {
      topList: []
    }
  },
  components: {
    Back,
    Scroll
  },
  mounted () {
    this._getTopList()
  },
  methods: {
    _getTopList () {
      getTopList().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.topList = res.data.topList
        }
      })
    },
    toDetail (id) {
      this.$router.push('/top/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .top-header{
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
  .top-wrapper{
    position: fixed;
    top:@table-lh;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .top-item{
    position: relative;
    display: flex;
    .boxSize;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    padding-right: 16px;
    img{
      width: 100px;
      height: 100px;
    }
    .top{
      flex: 1;
      display: inline-block;
      vertical-align: top;
      margin-left: 16px;
      overflow: hidden;
      color: white;
      .title{
        margin-top: 4px;
        .ellipsis;
        font-size: 18px;
        margin-bottom: 12px;
      }
      .top-song{
         margin-top: 4px;
        .ellipsis;
      }
    }
    .go{
      position: absolute;
      top:40px;
      right: 0;
    }
  }
</style>
