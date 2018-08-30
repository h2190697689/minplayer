<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <span @click="cancel" class="cancel-btn">{{cancelBtnText}}</span>
            <span @click="confirm" class="confirm-btn">{{confirmBtnText}}</span>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .confirm{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    z-index: 999;
    background-color:rgba(3,20,82,0.5) ;
    .confirm-content{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 230px;
      height: 100px;
      font-family: "Adobe 仿宋 Std R";
      background-color:rgb(50,53,62);
      .borRadius(8px);
      .text{
        width: 100%;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
      }
      .operate{
        display: flex;
        width: 100%;
        height: 50px;
        overflow: hidden;
        border-top: 1px dotted #cacaca;
        .cancel-btn,.confirm-btn{
          flex: 1;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
        }
        .cancel-btn{
          border-right: 1px dotted #cacaca;
        }
      }
    }
  }
</style>
