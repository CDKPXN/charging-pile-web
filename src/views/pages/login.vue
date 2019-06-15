<template>
  <!-- 登录界面 -->
  <div id="login" :style="{height:height+'px'}">
    <el-card class="box-card loginCard" shadow="always" style="width:300px;">
      <div slot="header" class="userLogin">
        <span>欢迎使用充电桩运营管理平台</span>
      </div>
      <el-form ref="form" label-width="80px" size="mini">
        <el-input v-model="user" placeholder="用户名" style="font-size:14px;width:260px;margin:10px 0"></el-input>
        <br>
        <br>
        <el-input v-model="passWord" placeholder="密码" style="width:260px;"></el-input>
      </el-form>
      <br>
      <el-button
        type="primary"
        style="width:260px;font-size:14px"
        v-show="showBtn"
        @click="submit"
      >登录</el-button>
      <el-button
        type="primary"
        style="width:260px;margin-left:0px"
        :loading="true"
        v-show="!showBtn"
      >登录中</el-button>
      <br>
      <el-checkbox v-model="checked" style="color:#409EFF;margin-right:40%">自动登录</el-checkbox>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
// import { api_login } from "../api/index.js";
import url from "../../config/url.js";
export default {
  data() {
    return {
      passWord: "",
      user: "",
      height: "",
      showBtn: true,
      checked: false
    };
  },
  created() {
    let vm = this;
    if (localStorage.getItem("checked") == "true") {
      this.checked = true;
      vm.user = localStorage.getItem("user");
      vm.passWord = localStorage.getItem("password");
      vm.submit();
    }
  },
  methods: {
    Verification() {
      let vm = this;
      if (vm.user == "") {
        this.$notify.error({
          title: "错误",
          message: "请输入用户名和密码!"
        });
      } else if (vm.passWord == "") {
        this.$notify.error({
          title: "错误",
          message: "请输入用户名和密码!"
        });
      } else {
        return true;
      }
    },
    submit() {
      let vm = this;
      if (vm.Verification()) {
        vm.showBtn = false;
        let params = {
          username: vm.user,
          password: vm.passWord
        };
        this.$ajax({
          method: "post",
          url: "/api/auth",
          data:  params        
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              if (vm.checked) {
                // 下次登录自动登录
                localStorage.setItem("checked", true);
              } else {
                localStorage.removeItem("checked");
              }
              localStorage.setItem("user", vm.user);
              localStorage.setItem("password", vm.passWord);
              sessionStorage.setItem("token", res.data.data);
              url.token = res.data.data;
              let i = 1;
              var timer = setInterval(() => {
                i = i + 1;
                if (i == 3) {
                  vm.showBtn = true;
                  sessionStorage.setItem("user", vm.user);
                  vm.$message({
                    type: "success",
                    message: "成功登录!"
                  });
                  vm.jump("/echartsCom");
                  clearInterval(timer);
                  // location.reload()
                }
              }, 1000);
            } else {
              vm.showBtn = true;
              this.$notify.error({
                title: "错误",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>

#login {
  background-image: url("../../assets/img/background.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
  -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
}
/* @media screen and (min-width: 1200px) {
  #login {
    height: 762px;
  }
}
@media screen and (min-width: 1800px) {
  #login {
    height: 942px;
  }
} */
.box-card {
  width: 24%;
}
.loginCard {
  position: absolute;
  left: 40%;
  top: 30%;
  color: #409eff;
  font-size: 18px;
}
.loginCard .userLogin {
  text-align: center;
  width: 260px;
}
</style>
<style>
html,body,#app,#login {
  width: 100%;
  height: 100%;
}
</style>

