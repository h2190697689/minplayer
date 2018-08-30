<template>
  <div class="table">
        <span>
          <img src="../../assets/imgs/tou.jpg"/>
        </span>
    <span :class="{'light':tableIndex === 1}" @click="toRecommend">推荐</span>
    <span :class="{'light':tableIndex === 2}" @click="toHome">乐库</span>
    <span :class="{'light':tableIndex === 3}" @click="toPerson">个人</span>
    <span @click="toSearch" class="iconfont">&#xe665;</span>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'Table',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['tableIndex'])
  },
  methods: {
    toRecommend () {
      this.setTableIndex(1)
      this.$router.push('/recommend')
    },
    toHome () {
      this.setTableIndex(2)
      this.$router.push('/home')
    },
    toPerson () {
      this.setTableIndex(3)
      this.$router.push('/person')
    },
    toSearch () {
      this.$router.push('/search')
    },
    ...mapMutations({
      setTableIndex: 'SET_TABLE_INDEX'
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .table{
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    width:100% ;
    height: @table-lh;
    background-color: #152151;
    border-bottom: 1px dotted #25a4bb;
    z-index: 100;
  span{
    flex: 1;
    color: white;
    font-size: 18px;
    line-height: @table-lh;
    text-align: center;
  img{
    width: 40px;
    height: 40px;
  .borRadius(50%);
  }
  }
  span:nth-of-type(5){
    font-size: 24px;
  }
    .light{
     color: dodgerblue;
      font-size: 22px;
    }
  }
</style>
