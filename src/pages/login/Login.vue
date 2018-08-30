<template>
    <div class="login">
     <div class="background">
       <img src="../../assets/imgs/login.png">
     </div>
      <div class="content">
          <div class="title">
         <i class="iconfont light">&#xe608;</i>
         <span class="title-header"> min</span>
        </div>
          <div class="login-inputs">
            <input placeholder="账   号" v-model="id" type="text"/>
            <input placeholder="密   码" v-model="password" type="password"/>
            <button @click="check">登 录</button>
            <span v-show="isshow">账号或密码错误</span>
          </div>
          <div class="agreement">账号，密码都为:123</div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      users: [],
      id: '',
      password: '',
      isshow: false,
      timer: Object
    }
  },
  computed: {
    isok () {
      var isok = false
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === this.id && this.users[i].password === this.password) {
          isok = true
          return isok
        }
      }
      return isok
    }
  },
  methods: {
    getUsers (response) {
      if (response.data.ret) {
        this.users = response.data.data.users
      }
      // console.log(this.users)
    },
    check () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.isok) {
        this.$router.push('/home')
      } else {
        // alert(this.users)
        this.isshow = true
        this.timer = setTimeout(() => {
          this.isshow = false
        }, 2000)
      }
    },
    ...mapMutations(['setToken'])
  },
  mounted () {
    axios.get('https://h2190697689.github.io/minplayer/dist/static/login.json').then(this.getUsers)
  },
  destroyed () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .login{
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .background{
     position: fixed;
     width: 100%;
     height: 100%;
     z-index: -1;
      img{
         width:  100%;
         height:  100%;
       }
   }
  .content{
     width: 100%;
     height: 100%;
     .boxSize;
     padding: 20px 26px;
     overflow: hidden;
   }
  .title{
    position: relative;
    height: 33px;
    margin-top: 60px;
    color: azure;
    font-size: 26px;
    .light{
      animation: mylight 0.8s infinite alternate linear;
    }
    @keyframes mylight {
      0%{
        font-size: 32px;
        color: darkorange;
      }
      50% {
        font-size: 32px;
        color: #FF5EEC;
      }
      75%{
        font-size: 32px;
        color: dodgerblue;
      }
      100% {
        font-size: 32px;
        color: darkorange;
      }
    }
    .title-header{
      position: absolute;
      left: 36px;
      color: lightblue;
    }
  }

  .login-inputs{
    position: relative;
    margin-top: 30px;
       input{
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;
      font-size: 20px;
      font-family: "Adobe 黑体 Std R";
      border: none;
      border-bottom: 1px solid white;
      outline: none;
      color: white;
      background-color: transparent;
      text-indent: 12px;
    }
       button{
            margin-top: 0.6rem;
            width: 100%;
            padding: 0.2rem 0;
            font-size: 0.32rem;
            font-weight: 600;
            border: none;
            border-radius: 0.08rem;
            color: snow;
            background-color: dodgerblue;
            box-shadow: none;
    }
       span{
      position: absolute;
      top: 122px;
      left: 10px;
      font-size: 16px;
      color: red;

    }
  }
  .agreement{
    position: fixed;
    top: 30px;
    left: 30px;
    font-size: 18px;
    text-align: center;
    color: yellow;
    font-family: "Adobe 仿宋 Std R";
  }
</style>
