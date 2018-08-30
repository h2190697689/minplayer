<template>
    <div>
      <div class="back-ground">
        <img src="../../assets/imgs/home.jpg"/>
      </div>
      <Table></Table>
      <Scroll ref="scroll" :data="newSongList" class="song-wrapper">
        <div>
            <div @click="addPlayer(index)" v-for="(item, index) of relSongList" class="song-item" :key="index">
              <img v-lazy="item.image"/>
              <div class="song">
                <div class="song-name">{{item.name}}</div>
                <div class="singer-name">{{item.singer}}</div>
              </div>
            </div>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Table from '../../common/table/Table'
import Scroll from '../../common/scroll/scroll'
import {getRecommendList} from '../../assets/api/recommend'
import {mapGetters, mapMutations} from 'vuex'
import Song from '../../assets/js/song'
export default {
  name: 'Recommend',
  components: {
    Table,
    Scroll
  },
  data () {
    return {
      newSongList: []
    }
  },
  computed: {
    relSongList () {
      return this.newSongList.map((item) => {
        return new Song(item)
      })
    },
    ...mapGetters(['songList'])
  },
  mounted () {
    this._getRecommendList()
    this.addBottom()
  },
  methods: {
    addBottom () {
      if (this.songList.length) {
        this.$refs.scroll.$el.style.marginBottom = '66px'
      }
    },
    _getRecommendList () {
      getRecommendList().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.newSongList = res.new_song.data.song_list
          // console.log(this.relSongList)
        }
      })
    },
    getSongImg (obj) {
      return 'http://y.gtimg.cn/music/photo_new/T002R90x90M000' + obj + '.jpg?max_age=2592000'
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
  },
  watch: {
    songList (list) {
      if (list.length) {
        this.$refs.scroll.$el.style.marginBottom = '66px'
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .song-wrapper{
    position: fixed;
    top:@table-lh;
    left: 0;
    bottom: 0;
    width: 100%;
    .song-item{
      display: flex;
      width: 100%;
      height: 90px;
      margin-bottom: 6px;
      border-bottom: 1px dotted cornflowerblue;
      img{
        width: 80px;
        height: 80px;
        margin-left: 10px;
        margin-top: 5px;
      }
      .song{
        margin-left: 16px;
        margin-right: 10px;
        flex: 1;
        overflow: hidden;
        font-family: "Adobe 楷体 Std R";
        .song-name{
          margin-top: 16px;
          font-size: 18px;
          color: #ffffff;
          .ellipsis;
        }
        .singer-name{
          margin-top: 10px;
          font-size: 16px;
          color: #A6A6A6;
          .ellipsis;
        }
      }
    }
  }

</style>
