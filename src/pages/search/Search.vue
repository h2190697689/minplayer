<template>
    <div>
        <div class="back-ground">
          <img src="../../assets/imgs/home.jpg"/>
        </div>
        <div class="search-header">
          <Back></Back>
          <span>欢迎搜索</span>
        </div>
        <div class="search-box">
          <span class="iconfont find">&#xe608;</span>
          <div class="input-groups">
            <input @focus="dealFocus" @blur="dealBlur" ref="input" v-model="query" placeholder="搜索歌曲、歌手"/>
            <i class="iconfont search-icon" @click="_getSearch(),addHistory()" :class="{'icon-focus':this.isFocus}">&#xe665;</i>
          </div>
          <span @click="clear" class="iconfont delete">取消</span>
        </div>
      <div v-show="!query && !isFocus" class="hotkey">
        <p class="title">热门搜索</p>
        <p @click="fill(item.k, index)" :class="{'light': currentIndex === index}" v-for="(item,index) of relHotKey" :key="index" class="item">{{item.k}}</p>
      </div>
      <div v-show="isFocus && searchHistory.length && songs.length === 0" class="history">
          <div class="title">
            <span>搜索历史</span>
            <span class="iconfont" @click="clearHistory">&#xe604;</span>
        </div>
          <div @click="fill(item, -1)" v-for="(item,index) of this.searchHistory" :key="index" class="history-item">
          <span>{{item}}</span>
          <span @click.stop="removeHistory(index)">&Cross;</span>
        </div>
        </div>
      <Scroll ref="scroll" class="scroll-wrapper" :data="this.relSongs" :pullup="true" @scrollToEnd="this._searchMore">
        <div v-show="query" class="search-list">
          <div @click="toSonger()" v-if="this.singerDetail.singermid" class="singer">
            <img :src="this.pic">
            <div class="sing-wrapper">
              <p class="name">{{singerDetail.singername}}</p>
              <p class="num">单曲 ：{{singerDetail.songnum}}  专辑：{{singerDetail.albumnum}}</p>
            </div>
          </div>
          <div @click="toMusic(item)" v-for="(item, index) of this.relSongs" :key="index" class="song">
            <span class="iconfont icon">&#xe606;</span>
            <div class="song-wrapper">
              <p class="name">{{item.name}}</p>
              <p class="singer-name">{{item.singer}}</p>
            </div>
          </div>
          <Loading class="loading" v-show="hasMore"></Loading>
        </div>
      </Scroll>
      <div class="no-find" v-show="message === 'no results'">
        <span class="iconfont icon">&#xe608;</span>
        <p class="des">抱歉，暂无搜索结果！</p>
      </div>
    </div>
</template>

<script>
import {getHotKey, getSearch} from '../../assets/api/search'
import {getPar} from '../../assets/js/util'
import Song from '../../assets/js/song'
import Scroll from '../../common/scroll/scroll'
import Back from '../../common/back/Back'
import Loading from '../../common/loading/loading'
import {mapGetters, mapMutations} from 'vuex'
import {songMixin} from '../../assets/js/mixin'

export default {
  name: 'Search',
  mixins: [songMixin],
  components: {
    Scroll,
    Loading,
    Back
  },
  data () {
    return {
      isFocus: false,
      query: '',
      page: 1,
      perpage: 20,
      hotKey: [],
      currentIndex: '',
      singerDetail: {},
      songs: [],
      isClear: '确定清空历史记录？',
      message: ''
    }
  },
  mounted () {
    this._getHotKey()
  },
  computed: {
    relSongs () {
      let relSongs = []
      for (let i in this.songs) {
        relSongs.push(new Song(this.songs[i]))
      }
      return relSongs
    },
    pic () {
      return 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + this.singerDetail.singermid + '.jpg?max_age=2592000'
    },
    relHotKey () {
      return getPar(this.hotKey, 9)
    },
    hasMore () {
      return this.singerDetail.songnum > this.perpage * this.page
    },
    ...mapGetters(['searchHistory', 'songList'])
  },
  methods: {
    dealFocus () {
      this.isFocus = true
    },
    dealBlur () {
      this.isFocus = false
    },
    addHistory () {
      let sHistory = this.searchHistory.slice()
      // 添加操作
      if (this.query) {
        for (let i in sHistory) {
          if (sHistory[i] === this.query) {
            sHistory.splice(i, 1)
          }
        }
        sHistory.unshift(this.query)
        if (sHistory.length > 6) {
          sHistory.pop()
        }
      }
      this.setSearchHistory(sHistory)
      // console.log(sHistory)
    },
    _getHotKey () {
      getHotKey().then((res) => {
        if (res.code === 0) {
          this.hotKey = res.data.hotkey
          // console.log(this.hotKey)
        }
      })
    },
    _getSearch () {
      this.page = 1
      getSearch(this.query, this.page, this.perpage).then((res) => {
        if (res.code === 0) {
          this.singerDetail = res.data.zhida
          this.songs = res.data.song.list
          this.message = res.message
        }
      })
      console.log(this.songs)
    },
    _searchMore () {
      // console.log(this.hasMore)
      if (this.hasMore) {
        this.page = this.page + 1
        getSearch(this.query, this.page, this.perpage).then((res) => {
          if (res.code === 0) {
            this.songs = this.songs.concat(res.data.song.list)
            // console.log(this.relSongs)
          }
        })
      }
    },
    clear () {
      this.query = ''
      this.songs = []
    },
    fill (k, index) {
      this.query = k
      this.currentIndex = index
    },
    toSonger () {
      this.$router.push('/singer/' + this.singerDetail.singermid)
    },
    toMusic (song) {
      let sSongList = this.songList.slice()
      // 处理歌单中已有该歌曲情况
      for (let i in sSongList) {
        if (sSongList[i].name === song.name) {
          sSongList.splice(i, 1)
        }
      }
      sSongList.push(song)
      // 将歌单从新放入store中
      this.setSongList(sSongList)
      this.setCurrentIndex(sSongList.length - 1)
    },
    clearHistory () {
      let sHistory = this.searchHistory.slice()
      sHistory = []
      this.setSearchHistory(sHistory)
    },
    removeHistory (index) {
      let sHistory = this.searchHistory.slice()
      sHistory.splice(index, 1)
      this.setSearchHistory(sHistory)
    },
    ...mapMutations({
      setSongList: 'SET_SONG_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setSearchHistory: 'SET_SEARCH_HISTORY'
    })
  },
  watch: {
    query () {
      this.singerDetail = {}
      this.songs = []
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .search-header{
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
  .search-box{
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 66px;
    .find{
      margin-left: 8px;
      margin-right: 12px;
      margin-top: 4px;
      font-size: 32px;
      color: cornflowerblue;
    }
    .input-groups{
      position: relative;
      margin-right: 80px;
      flex: 1;
      input{
        width: 100%;
        height: 36px;
        .boxSize;
        padding-right: 40px;
        .borRadius(18px);
        border: 2px solid dodgerblue;
        font-size: 16px;
        text-indent: 10px;
        font-family: "Adobe 楷体 Std R";
        color: white;
        background-color: transparent;
      }
      .search-icon{
        position: absolute;
        top: 4px;
        right: 8px;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 20px;
        color: cornflowerblue;
      }
      .icon-focus{
        .borRadius(50%);
        background-color: rgba(8,86,122,0.6);
      }
    }
    .delete{
      position: absolute;
      top: 4px;
      right: 6px;
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background-color: rgba(8,86,122,0.6);
      font-size: 18px;
      color: #115CB8;
      .borRadius(6px)
    }
  }
  .hotkey{
    margin-top: 12px;
    .title{
      width: 100%;
      height: 30px;
      border-bottom: 1px  darkolivegreen dashed;
      text-align: center;
      line-height: 30px;
      color: #1E90FF;
      font-size: 18px;
    }
    .item{
      display: inline-block;
      margin-top: 10px;
      margin-left: 8px;
      margin-right: 8px;
      padding: 8px 16px;
      .borRadius(12px);
      border: 1px solid powderblue;
      font-size: 16px;
      color: lightblue;
  }
    .light{
      color: cornflowerblue;
    }
  }
  .scroll-wrapper{
    position: fixed;
    top: 120px;
    bottom: 0;
    width: 100%;
    z-index: -1;
    overflow: hidden;
  }
  .search-list{
    color: white;
    background-color: transparent;
    .loading{
      margin-top: 10px;
    }
    .singer{
      height: 55px;
      border-bottom: 1px dotted #cacaca;
      img{
        margin-left: 10px;
        margin-top: 6px;
        width: 42px;
        height: 42px;
        .borRadius(50%)
      }
      .sing-wrapper{
        display: inline-block;
        margin-top: 6px;
        margin-left: 10px;
        vertical-align: top;
        .name{
        }
        .num{
          margin-top: 10px;
        }
      }
    }
    .song{
      height: 55px;
      border-bottom: 1px dotted #cacaca;
      .icon{
        display: inline-block;
        margin-left: 14px;
        margin-top: 14px;
        font-size: 20px;
      }
      .song-wrapper{
        display: inline-block;
        margin-top: 6px;
        margin-left: 10px;
        max-width: 250px;
        overflow: hidden;
        vertical-align: top;
        .name{
          /*width: 250px;*/
          .ellipsis;
        }
        .singer-name{
          margin-top: 10px;
        }
      }
    }
  }
  .history{
    margin-top: 20px;
    color: white;
    .title{
      position: relative;
      height: 30px;
      font-size: 18px;
      line-height: 30px;
      border-bottom: 1px dotted cornflowerblue;
      span:nth-of-type(1) {
        margin-left: 14px;
      }
      span:nth-of-type(2) {
        position: absolute;
        right: 18px;
        top:0;
        font-size: 20px;
      }
    }
    .history-item{
      display: flex;
      position: relative;
      margin-top: 16px;
      font-size: 16px;
      span:nth-of-type(1) {
        flex: 1;
        margin-left: 14px;
        margin-right: 54px;
        .ellipsis;
      }
      span:nth-of-type(2) {
        position: absolute;
        right: 18px;
        top:-2px;
        font-size: 26px;
      }
    }
  }
  .no-find{
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .icon{
      font-size: 40px;
      color: #cacaca;
    }
    .des{
      margin-top: 10px;
      font-size: 18px;
      color: #cacaca;
      text-align: center;
    }
  }
</style>
