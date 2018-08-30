<template>
  <div v-show="isShow" class="slove">
    <div class="back-ground">
      <img src="../../assets/imgs/personage.jpg"/>
    </div>
    <person-header :page="2" @close="close"></person-header>
    <Scroll class="scroll" ref="scroll" :data="loveList">
      <div class="songs">
        <div @click="toPlay(index)" class="song-item" v-for="(item,index) of this.loveList" :key="index">
          <p class="name">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
          <p class="delete" @click.stop="deleteLove(item)" >&Cross;</p>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import PersonHeader from './PersonHeader'
import Scroll from '../scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'Love',
  components: {
    PersonHeader,
    Scroll
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['loveList', 'loveList'])
  },
  methods: {
    show () {
      this.isShow = true
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    close () {
      this.isShow = false
    },
    toPlay (index) {
      this.setSongList(this.loveList)
      this.setCurrentIndex(index)
    },
    deleteLove (item) {
      let sLoveList = this.loveList.slice()
      for (let i in sLoveList) {
        if (sLoveList[i].name === item.name) {
          sLoveList.splice(i, 1)
        }
      }
      this.setLoveList(sLoveList)
    },
    ...mapMutations({
      setSongList: 'SET_SONG_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setLoveList: 'SET_LOVE_LIST'
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .slove{
    height: 100vh;
    position:fixed;
    top:0;
    left: 0;
    right:0;
    bottom: 0;
    box-sizing: border-box;
    z-index: 99;
  }
  .songs{
    .song-item{
      position: relative;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px dotted dimgrey;
      color: white;
      .name{
        margin-left: 12px;
        font-size: 18px;
      }
      .singer{
        margin-top: 4px;
        margin-left: 15px;
        font-size: 16px;
      }
      .delete{
        position: absolute;
        top: 10px;
        right:14px;
        color: white;
        font-size: 30px;
      }
    }
  }
  .scroll{
    position: fixed;
    top: 66px;
    bottom: 66px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
