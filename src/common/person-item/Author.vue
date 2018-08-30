<template>
  <div v-show="isShow" class="sauthor">
    <div class="back-ground">
      <img src="../../assets/imgs/personage.jpg"/>
    </div>
    <person-header :page="3" @close="close"></person-header>
    <div class="des">
      <img src="../../assets/imgs/person.jpg"/>
      <div class="name-wrapper">
        <p class="name">姓名：何嘉敏</p>
        <p class="qq">qq：2190697689</p>
        <p class="email">email:2190697689@qq.com</p>
      </div>
    </div>
    <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作者简介：音乐播放器的数据调用QQ音乐接口，虽说还是简陋但是大致功能已经实现，
      还有一些细节需要完善，借用阮一峰大神的一句话——你拿在手上的，就是我这一个月，所有的诚意和坚持。
      JavaScript这门语言会有远大的未来，但愿面前的你，也都是如此！</div>
  </div>
</template>

<script>
import PersonHeader from './PersonHeader'
export default {
  name: 'Author',
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
   .sauthor{
     height: 100vh;
     position:fixed;
     top:0;
     left: 0;
     right:0;
     bottom: 0;
     box-sizing: border-box;
     z-index: 99
   }
   .des{
     margin-top: 16px;
     display: flex;
     img{
       width: 130px;
       height: 130px;
       margin-left: 12px;
     }
     .name-wrapper{
       flex: 1;
       color: white;
       font-size: 16px;
       margin-left: 20px;
       box-sizing: border-box;
       padding-right: 16px;
       .name{
         margin-top: 10px;
       }
       .qq{
         margin-top: 26px;
       }
       .email{
         margin-top: 26px;
         word-break: break-word;
       }
     }
   }
  .text{
    margin-top: 30px;
    box-sizing: border-box;
    padding: 10px 12px;
    line-height: 24px;
    font-size: 16px;
    color: white;
  }
</style>
