<template>
    <div ref="progressbar" class="progress-bar" @click="progressClick">
        <div ref="progressinner" class="progress-inner"></div>
        <div ref="progressbtn" class="progress-btn"
             @touchstart.prevent="progressTouchStart"
             @touchmove.prevent="progressTouchMove"
             @touchend="progressTouchEnd">
          <p class="progress-inbtn"></p>
        </div>
    </div>
</template>

<script>
var init = false
var width = 0
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    progressTouchStart (e) {
      init = true
    },
    progressTouchMove (e) {
      if (init) {
        // console.log(e.touches[0].pageX)
        let k = e.touches[0].pageX - this.$refs.progressbar.getBoundingClientRect().left
        if (k > 0 && k < (this.$refs.progressbar.clientWidth)) {
          width = k
          this.$refs.progressinner.style.width = width + 'px'
          this.$refs.progressbtn.style.left = (width - 8) + 'px'
        }
      }
    },
    progressTouchEnd () {
      let percent = width / this.$refs.progressbar.clientWidth
      this.$emit('changePercent', percent)
      init = false
    },
    progressClick (e) {
      let k = e.pageX - this.$refs.progressbar.getBoundingClientRect().left
      if (k > 0 && k < (this.$refs.progressbar.clientWidth)) {
        width = k
        this.$refs.progressinner.style.width = width + 'px'
        this.$refs.progressbtn.style.left = (width - 8) + 'px'
        let percent = width / this.$refs.progressbar.clientWidth
        this.$emit('changePercent', percent)
      }
    }
  },
  watch: {
    percent () {
      if (!init) {
        this.$refs.progressinner.style.width = this.$refs.progressbar.clientWidth * this.percent + 'px'
        this.$refs.progressbtn.style.left = (this.$refs.progressbar.clientWidth * this.percent - 8) + 'px'
      // console.log(this.$refs.progressbar.getBoundingClientRect().x)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
   .progress-bar{
     position: relative;
     display: inline-block;
     width: 72%;
     height: 8px;
     .borRadius(4px);
     background-color: gray;
     .progress-inner{
       width: 0;
       height: 100%;
       .borRadius(4px);
       background-color:yellow ;
     }
     .progress-btn{
       position: absolute;
       left: 0;
       bottom: -4px;
       width: 16px;
       height: 16px;
       .borRadius(8px);
       box-sizing: border-box;
       padding: 4px;
       background-color: white;
       .progress-inbtn{
         width: 8px;
         height: 8px;
         .borRadius(4px);
         background-color: yellow;
       }
     }
   }
</style>
