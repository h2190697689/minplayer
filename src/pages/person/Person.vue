<template>
   <div class="person">
     <div class="back-ground">
       <img src="../../assets/imgs/personage.jpg"/>
     </div>
     <div class="header">
       <router-link to="/recommend">
         <i class="back-main iconfont">&#xe633;</i>
       </router-link>
       <span class="iconfont">&#xe603; 个人中心</span>
     </div>
     <div class="play-history">
       <span class="iconfont">&#xe67b;&nbsp;历史记录</span>
       <span class="to iconfont" @click="showHistory" >&#xe613;</span>
     </div>
     <div class="love">
       <span class="iconfont">&#xe607;&nbsp;我的收藏</span>
       <span class="to iconfont" @click="showLove">&#xe613;</span>
     </div>
     <div class="versions">
       <span class="iconfont">&#xe989;&nbsp;版本介绍</span>
       <span class="num">version 1.0</span>
     </div>
     <div class="author">
       <span class="iconfont">&#xe631;&nbsp;作者信息</span>
       <span class="to iconfont" @click="showAuthor">&#xe613;</span>
     </div>
     <div class="website">
       <span class="iconfont">&#xe750;&nbsp;分享网站</span>
       <span class="to iconfont" @click="showWebsite">&#xe613;</span>
     </div>
     <play-history ref="playHistory"></play-history>
     <Love ref="love"></Love>
     <Author ref="author"></Author>
     <Website ref="website"></Website>
   </div>
</template>

<script>
import PlayHistory from '../../common/person-item/PlayHistory'
import Love from '../../common/person-item/Love'
import Author from '../../common/person-item/Author'
import Website from '../../common/person-item/Website'
export default {
  name: 'Person',
  components: {Website, Author, Love, PlayHistory},
  methods: {
    showHistory () {
      this.$refs.playHistory.show()
    },
    showLove () {
      this.$refs.love.show()
    },
    showAuthor () {
      this.$refs.author.show()
    },
    showWebsite () {
      this.$refs.website.show()
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .header{
    position: relative;
    height: 64px;
    box-sizing: border-box;
    padding-top: 18px;
    border-bottom: 1px dotted dimgrey;
    color: white;
    text-align: center;
    .back-main{
      position: absolute;
      left: 14px;
      top: 16px;
      font-size: 24px;
      color: white;
    }
    span{
      font-size:22px ;
    }
  }
  .play-history,.love,.versions,.author,.website{
    position: relative;
    height: 60px;
    box-sizing: border-box;
    padding-top: 19px;
    color: white;
    border-bottom: 1px dotted dimgrey;
    span:nth-of-type(1) {
      margin-left: 14px;
      font-size: 18px;
    }
    .to {
      position: absolute;
      top: 20px;
      right: 14px;
    }
  }
  .play-history{
  }
  .love{
  }
  .versions{
    .num{
      position: absolute;
      top: 20px;
      right: 14px;
      font-size: 16px;
    }
  }
  .author{
  }
  .website{
  }
</style>
