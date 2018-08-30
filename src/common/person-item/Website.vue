<template>
  <div v-show="isShow" class="sWebsite">
    <div class="back-ground">
      <img src="../../assets/imgs/personage.jpg"/>
    </div>
    <person-header :page="4" @close="close"></person-header>
    <div class="text">Github网址：https://github.com/h2190697689</div>
    <div class="look">预览网址：https://github.com/h2190697689</div>
  </div>
</template>

<script>
import PersonHeader from './PersonHeader'
export default {
  name: 'Website',
  components: {
    PersonHeader
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .sWebsite{
    height: 100vh;
    position:fixed;
    top:0;
    left: 0;
    right:0;
    bottom: 0;
    box-sizing: border-box;
    z-index: 99
  }
  .text{
    margin-top: 20px;
    box-sizing: border-box;
    padding: 10px 14px;
    color: white;
    font-size: 16px;
  }
  .look{
    box-sizing: border-box;
    padding: 10px 14px;
    color: white;
    font-size: 16px;
  }
</style>
