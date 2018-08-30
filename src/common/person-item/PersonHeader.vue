<template>
  <div class="header">
    <i @click="close" class="back iconfont">&#xe633;</i>
    <span v-show="this.page === 1" class="iconfont">&#xe67b;&nbsp;历史记录</span>
    <span v-show="this.page === 2" class="iconfont">&#xe607;&nbsp;我的收藏</span>
    <span v-show="this.page === 3" class="iconfont">&#xe631;&nbsp;作者信息</span>
    <span v-show="this.page === 4" class="iconfont">&#xe750;&nbsp;分享网站</span>
  </div>
</template>

<script>
export default {
  name: 'person-header',
  props: {
    page: {
      type: Number
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
  *{
    margin: 0;
    padding: 0;
  }
   .header{
     position: relative;
     width: 100%;
     height: 68px;
     border-bottom:  1px dotted dimgrey ;
     color: white;
     text-align: center;
     box-sizing: border-box;
     overflow: hidden;
     .back{
       position: absolute;
       bottom:28px;
       left: 14px;
       font-size: 22px;
     }
     span{
       font-size:22px;
       line-height: 68px;
     }
   }
</style>
