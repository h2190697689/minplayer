<template>
  <div>
    <!--背景-->
    <div class="back-ground">
      <img src="../../assets/imgs/home.jpg"/>
    </div>
    <div class="singer-header">
      <Back></Back>
      <span>歌手详情</span>
    </div>
    <!--加载-->
    <div v-show="!this.singerlist.length" class="loading-wrapper">
      <Loading></Loading>
    </div>
    <!--侧边字母栏-->
    <div class="singer-bar">
      <div v-for="(item,index) of singerbar" :key="index" class="bar-item" :class="{'light':currentIndex===index}" @click="handleLetterClick(index)">
        {{item}}
      </div>
    </div>
    <!--歌手内容-->
      <Scroll ref="scroll" :data="singerlist" class="singer-content" :listenScroll="true" :probeType="3"  @scroll="handleScroll">
        <div class="pad">
          <div class="singer">
            <div :ref="index" v-for="(item,index) of this.relsingermap" :key="index" class="wrapper">
              <div class="area">{{item.title}}</div>
              <div v-for="inneritem of item.items" :key="inneritem.singer_id" @click="showdetail(inneritem.singer_mid)" class="item-list">
                <img v-lazy="inneritem.singer_pic">
                <p class="name">{{inneritem.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Scroll from '../../common/scroll/scroll'
import {getSingerList} from '../../assets/api/singer'
import Singer from '../../assets/js/singer'
import Loading from '../../common/loading/loading'
import Table from '../../common/table/Table'
import Back from '../../common/back/Back'
import {songMixin} from '../../assets/js/mixin'
export default {
  name: 'Singer',
  mixins: [songMixin],
  components: {
    Scroll,
    Loading,
    Table,
    Back
  },
  created () {
    this._getSingerList()
  },
  data () {
    return {
      currentIndex: 0,
      singerlist: [],
      scrollY: -1
    }
  },
  computed: {
    singermap () {
      let map = {}
      for (let i in this.singerlist) {
        let key = this.singerlist[i].Findex
        if (key.match(/[a-zA-Z]/)) {
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer(this.singerlist[i]))
        }
      }
      return map
    },
    relsingermap () {
      let ret = []
      for (let key in this.singermap) {
        ret.push(this.singermap[key])
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return ret
    },
    singerbar () {
      var list = []
      for (let item of this.relsingermap) {
        // var l = i.substr(0, 1)
        list.push(item.title)
      }
      return list
    },
    heightlist () {
      var tolheight = 0
      var heightlist = [0]
      for (let i in this.singerbar) {
        const element = this.$refs[i][0]
        tolheight += element.clientHeight
        heightlist.push(tolheight)
      }
      return heightlist
    }
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === 0) {
          this.singerlist = res.data.list
          // console.log(res)
          // console.log(this.relsingermap)
        }
      })
    },
    handleLetterClick (index) {
      this.currentIndex = index
      const element = this.$refs[index][0]
      this.$refs.scroll.scrollToElement(element)
      // console.log(this.$refs[index])
      // console.log(this.$refs.scroll)
      // console.log(this.heightlist)
    },
    handleScroll (pos) {
      this.scrollY = pos.y
    },
    showdetail (id) {
      this.$router.push('/singer/' + id)
    }
  },
  watch: {
    scrollY (newY) {
      for (let i = 0; i < this.heightlist.length - 1; i++) {
        let h1 = this.heightlist[i]
        let h2 = this.heightlist[i + 1]
        let y = -newY + 100
        // console.log(-newY + 580, this.heightlist[(i + 1)])
        if (y >= h1 && y < h2) {
          // console.log(this.currentIndex)
          this.currentIndex = i
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .singer-header{
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
  .singer-content{
    position: fixed;
    top: @table-lh;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .singer{
    color: white;
    }
  .wrapper{
    padding-bottom: 10px;
    .area{
        width: 100%;
        height: 30px;
       text-indent: 10px;
       font-size: 16px;
       line-height: 30px;
      background-color: rgba(7,17,27,0.7);
    }
    .item-list{
      margin-top: 10px;
       img{
         width: 70px;
         height: 75px;
         margin-left: 6px;
         vertical-align: center;
         .borRadius(50%)
       }
      .name{
        display: inline-block;
        margin-top: 10px;
        margin-left: 20px;
      }
    }
  }
  .singer-bar{
    position: fixed;
    top: 50vh;
    right: 10px;
    z-index: 20;
    transform: translateY(-46%);
    .bar-item{
      padding: 4px;
      color: white;
      text-align: center;
      font-size: 14px;
    }
    .light{
      background-color: #25a4bb;
     .borRadius(6px)
    }
  }
  .loading-wrapper{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
