<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/home.jpg"/>
      </div>
      <div class="play-list-header">
        <Back></Back>
        <span>热门歌单</span>
      </div>
      <Scroll ref="scroll" :data="relList" class="list-wrapper">
        <div>
          <Scroll class="x-wrapper" :scrollX="true" :data="relList" v-for="(item, index) of relList" :key="index">
            <div class="x-list">
              <div @click="toDetail(inneritem.dissid)" v-for="(inneritem) of item" :key="inneritem.dissid" class="play-wrapper">
                <img v-lazy="inneritem.imgurl"/>
                <p class="des">{{inneritem.dissname }}</p>
                <p class="singer">{{inneritem.creator.name}}</p>
                <p class="num">播放量：{{dealNum(inneritem.listennum)}}</p>
              </div>
            </div>
          </Scroll>
        </div>
      </Scroll>
    </div>
</template>

<script>
import {getPlayList} from '../../assets/api/playList'
import Back from '../../common/back/Back'
import Scroll from '../../common/scroll/scroll'
import {handlePlayAmoumt} from '../../assets/js/util'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'PlayList',
  mixins: [songMixin],
  components: {
    Back,
    Scroll
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    relList () {
      let relList = []
      this.list.forEach((item, index) => {
        let i = Math.floor(index / 6)
        if (!relList[i]) {
          relList[i] = []
        }
        relList[i].push(item)
      })
      return relList
    }
  },
  mounted () {
    this._getPlayList()
  },
  methods: {
    _getPlayList () {
      getPlayList().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.list = res.data.list
        }
      })
    },
    dealNum (num) {
      return handlePlayAmoumt(num)
    },
    toDetail (id) {
      this.$router.push('/playList/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .play-list-header {
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
  .list-wrapper{
    position: fixed;
    top:@table-lh;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .play-wrapper{
    display: inline-block;
    vertical-align: top;
    width: 120px;
    margin-left: 14px;
    color: white;
    .boxSize;
    padding-bottom: 30px;
    img{
      width: 120px;
      height: 140px;
    }
    .des{
      margin-top: 4px;
      line-height: 20px;
      .ellipsisMore(2);
    }
    .singer{
      margin-top: 6px;
      .ellipsis;
    }
    .num{
      margin-top: 6px;
      .ellipsis;
    }
  }
  .x-wrapper{
    width: 100%;
    margin-top: 20px;
    .x-list{
      width: 820px;
    }
  }
</style>
