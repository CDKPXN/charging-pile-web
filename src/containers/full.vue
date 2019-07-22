<template>
<!-- 根组件下的默认子组件 -->
  <el-container class="wrap">
    <el-aside width="200px">
      <el-menu-aside :def-active="defUrl"></el-menu-aside>
    </el-aside>
    <el-container class="body_wrap">
        <el-header>
          <my-header></my-header>
        </el-header>
        <el-main style="background-color:#EBEBEB">
            <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ElMenuAside from '../components/Aside.vue'
import MyHeader from '../components/header.vue'
import DefActive from '../config/aside.js'
export default {
  name: 'full',
  components:{
    ElMenuAside,
    MyHeader
  },
  data () {
    return {
      defUrl:'',
    }
  },
  methods:{
    //判断用户长时未操作（15分钟），就自动退出
    goLogin(){
      let vm = this
      var maxTime = 900; // seconds
      var time = maxTime;
      $('body').on('keydown mousemove mousedown', function(e) {
          time = maxTime; // reset
      });
      var intervalId = setInterval(function() {
          time--;
          if (time <= 0) {
              vm.ShowInvalidLoginMessage();
              clearInterval(intervalId);
          }
      }, 1000)
    },
    ShowInvalidLoginMessage () {
        sessionStorage.removeItem('token')
        this.$alert('您已经长时间没操作了，即将退出系统', '消息提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('./login')
          }
        });
    },
  },
  created(){
    this.goLogin()
    let UrlArr = window.location.href.split('/')
    let defUrlArr = UrlArr.pop().split('?')
    this.defUrl = '/'+defUrlArr.shift()
    this.defUrl = DefActive.defActive(this.defUrl)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrap {
    min-height: 100vh;
    .el-header {
      position: relative;
      background-color: #5cafe6;
      line-height: 60px;
    }
    .body-wrap {
      position: relative;
      overflow: hidden;
      .el-aside {
        z-index: 999;
        min-width: 200px;
        max-width: 200px;
        height: calc(100vh - 100px);
        background-color: rgb(84, 92, 100);
        color: #333;
      }
      .el-main {
        z-index: 1;
        color: #333;
        text-align: center;
        .main {
          background-color: #fff;
          padding: 10px;
          border-radius: 10px;
          min-height: calc(100vh - 200px)
        }
      }
    }
  }
</style>