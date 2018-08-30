<template>
    <div @click="backHistory" class="back-wrapper">
      <span class="back iconfont">&#xe63a;</span>
    </div>
</template>

<script>
export default {
  name: 'Back',
  methods: {
    backHistory () {
      history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .back-wrapper{
    position: fixed;
    top:14px;
    left: 10px;
    width:30px;
    height: 30px;
    .boxSize;
    padding-left: 1px;
    z-index: 99;
    background-color: rgba(8,86,122,0.6);
    .borRadius(50%);
  }
  .back{
    font-size: 26px;
    color: dodgerblue;
    line-height: 30px;
  }
</style>
