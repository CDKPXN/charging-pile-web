<template>
<!-- 
  el 组件 代码说明
  左侧菜单导航栏
    样式：
      collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）	boolean	—	false
      background-color	菜单的背景色（仅支持 hex 格式）	string	—	#ffffff
      text-color	菜单的文字颜色（仅支持 hex 格式）	string	—	#303133
      active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）	string	—	#409EFF
      default-active	当前激活菜单的 index	string	—	—
      default-openeds	当前打开的sub-menu的 key 数组	Array	—	—
      unique-opened	是否只保持一个子菜单的展开	boolean	—	false
      menu-trigger	子菜单打开的触发方式(只在 mode 为 horizontal 时有效)	string	—	hover
      router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean	—	false
    事件：
      open	展开指定的 sub-menu	index: 需要打开的 sub-menu 的 index
      close	收起指定的 sub-menu	index: 需要收起的 sub-menu 的 index
      select	菜单激活回调	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
      open	sub-menu 展开的回调	index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path
      close	sub-menu 收起的回调	index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path

      index	唯一标志	string	—	—
      route	Vue Router 路径对象	Object	—	—
      disabled	是否禁用	boolean	—	false
 -->
  <!-- <el-container id="layout"> -->
  <div id="layout" style="margin-top:-10px;margin-left:-10px">
    <el-row>
      <el-col :span="3">
        <el-menu default-active="/echartsCom" class="el-menu-vertical-demo"
          @open="handleOpen" 
          :collapse="false"
          :unique-opened="true"
          background-color="#2f4050"
          text-color="#a6a9ad"
          active-text-color="#fff" 
          :router="true"
          style="height:100%;
          margin-bottom:-10px;
          z-index:1000;
          position:fixed"
          > 
          <div class="userImg">
            <img src="../../../static/img/2.jpg" alt="" style="border-radius:50%;width:50px;height:50px;">
          </div>
          <el-menu-item index="/echartsCom">
            <i class="fa fa-home fa-lg" style="width:26px"></i>&nbsp; 
            <span slot="title" class="sidebarTitle">总览</span>
          </el-menu-item>
          <el-menu-item index="/incomeDetail">
              <i class="fa fa-cc-visa fa-lg" style="width:26px"></i>&nbsp; 
              <span slot="title">财务</span>
          </el-menu-item>

          <el-submenu v-for="(tmp,index) in navBar" :key="index"  :index="tmp.index">
            <template slot="title">
                  <i :class="tmp.icon" style="width:26px"></i>&nbsp; 
                <span slot="title">{{tmp.name}}</span>
            </template>
            <el-menu-item-group v-for="(item,index) in tmp.children" :key="index">
              <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/electricPile">
              <i class="fa fa-bar-chart fa-lg"></i> &nbsp; 
              <span slot="title">统计</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-row >
            <el-card class="box-card" style="width:103%;height:60px;border:0;margin-left:190px;background-color:#5cafe6">
              <!-- <div slot="" class="clearfix"> -->
                <span class="clearfix">充电桩运营管理平台</span>
                <el-row class="goOut">
                  <!-- 告警 -->
                  <el-col :span="12">    
                      <el-dropdown  id="block" style="margin:5% 0 0 20%;width:90px;">
                        <span class="el-dropdown-link">
                          <el-badge  is-dot :value="result" :max="99" class="item">
                            <i class="fa fa-bell" @click="giveAnAlarm" style="font-size:18px;"></i>
                          </el-badge>
                        </span>
                        <el-dropdown-menu style="margin-left:-1.8%" slot="dropdown">                     
                          <el-dropdown-item>
                            <span @click="giveAnAlarm">有 {{result}} 条报警信息未读</span>&nbsp;
                          </el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                  <!-- 个人中心 -->
                     <el-col :span="12">    
                      <el-dropdown trigger="click" style="margin-left:-10%;width:88px">
                        <span class="el-dropdown-link">
                          <span style="font-size:18px">admin</span><i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu style="margin-left:-1%" slot="dropdown">                     
                          <el-dropdown-item><i class="fa fa-cog" aria-hidden="true" style="font-size:14px"></i>&nbsp;&nbsp;<span @click="dialogFormVisible=true">修改密码</span>&nbsp;</el-dropdown-item>  
                          <el-dropdown-item><i class="fa fa-sign-out fa-lg" style="font-size:14px"></i>&nbsp;&nbsp;<span @click="gotoLogin">退出登录</span>&nbsp;</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              <!-- </div> -->
            </el-card>
        </el-row>
        <el-row>
          <el-col :span="24">
            <transition name="el-fade-in">
              <router-view v-show="show" class="transition-box" id="body" style="position:absolute;left:210px;width:100%;"></router-view>
            </transition>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog title="密码修改" width="450px" :visible.sync="dialogFormVisible" @close="close('form')">
      <el-form :model="form" style="margin-left:-8%" ref="form" :rules="rules">
        <el-row class="marRule">
          <el-col :span="12">
            <el-form-item label="当前密码" :label-width="formLabelWidth" prop="oldPwd">
                <el-input v-model="form.oldPwd" :type="registration_data.nowtype" maxlength="16" placeholder="请输入当前密码" class="addStyle" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
           <el-col>
            <i class="el-icon-view" @click="changeStyle(1)"></i>
          </el-col>
        </el-row>
        <el-row class="marRule">
          <el-col :span="12">
            <el-form-item label="新的密码" :label-width="formLabelWidth" prop="newPwd">
                <el-input v-model="form.newPwd" :type="registration_data.newtype" placeholder="请输入6-16位的数字或字母的新密码" maxlength="16" class="addStyle" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <i class="el-icon-view" @click="changeStyle(2)"></i>
          </el-col>
        </el-row>
        <el-row class="marRule">
          <el-col :span="12">
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPwd">
                <el-input v-model="form.checkPwd" :type="registration_data.pwdType" placeholder="再次输入新密码" maxlength="16" class="addStyle" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <i class="el-icon-view" @click="changeStyle(3)"></i>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-right:20%;padding-bottom:10px">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changePwd">确认</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- </el-container> -->
</template>

<script>
import sidebar from './nav.js'
import axios from 'axios'
import url from '../../config/url.js'
  export default {
    data() {
      //当前密码验证
      var checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else {
          callback();
        }
      };
      //新密码
      var validatePass = (rule, value, callback) => {
        let a =/^([0-9]|[a-zA-Z]){6,16}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!a.test(value)){
          callback(new Error('请输入6-16位的数字或字母'))
        }
        else {
          if (this.form.checkPwd !== '') {
            this.$refs.form.validateField('checkPwd');
          }
          callback();
        }
      };
      //密码确认
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        result:0,  //告警条数
        value1: true,
        value2: true,
        isCollapse: true,
        show:true,
        navBar:[],
        dialogFormVisible:false,
        formLabelWidth:'120px',
        form:{
          oldPwd:'',
          newPwd:'',
          checkPwd:'',
        },
        //表单验证
        rules: {
          newPwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPwd: [
            { validator: checkOldPwd, trigger: 'blur' }
          ]
        },
        //密码显示/隐藏
        registration_data:{
          pwdType:'password',
          newtype:'password',
          nowtype:'password'
        },
      }
    },
    created(){
      let vm = this
        // vm.$ajax({
        //   method:'get',
        //   url:'api/fault/list?page=1&size=1000',
        //   headers:{'token':vm.$token},
        //   data:{},
        // }).then(res=>{
        //   for(var i=0;i<res.data.data.list.length;i++){
        //     if(res.data.data.list[i].status==0){
        //       this.result++
        //     }
        //   }
        // })
      this.navBar=sidebar.nav
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      gotoLogin () {  // 退出登录

        
        localStorage.removeItem('checked')
        localStorage.removeItem('user')
        localStorage.removeItem('password')
        console.log("fdafdafadfa2222",localStorage.getItem('checked'))
        this.$router.push('/login')
        location.reload()
      },
      giveAnAlarm(){
        this.$router.push('/giveAnAlarm')
      },
      //修改密码
      changePwd(){   //获取输入框中的原密码，与数据库中的密码进行匹对，如果原密码正确，就发起修改密码的请求！
        // let oldPassword=this.form.oldPwd
        // let newPassword=this.form.newPwd
        // axios({
        //   method:'put',
        //   url:url.localSrc+"/api/user/me",
        //   headers:{'token':url.token},
        //   data:{
        //     "oldPassword":oldPassword,
        //     "newPassword":newPassword
        //   }
        // }).then(res=>{
        //   console.log(res)
        //   this.$message({
        //     type:'success',
        //     message:'修改成功'
        //   })
        // }).then(()=>{
        //    this.dialogFormVisible=false
        // })
         this.$message({
            type:'success',
            message:'修改成功'
          })
        this.dialogFormVisible=false
      },
      close(formName){
        this.$refs[formName].resetFields()
      },
      //密码显示/隐藏
      changeStyle(shownum){
          let vm = this
          if(shownum == 1){
            vm.registration_data.nowtype = vm.registration_data.nowtype==='password'?'text':'password';
          }else if(shownum == 2){
            vm.registration_data.newtype = vm.registration_data.newtype==='password'?'text':'password';
          }else{
            vm.registration_data.pwdType = vm.registration_data.pwdType==='password'?'text':'password';
          }
      },
    }
  };
</script>

<style>
.sidebarTitle{
  margin-right: 10px
}
.el-icon-view{
  position: absolute;
  right: 15%;
  top:24%;
  cursor: pointer;
}
.marRule{
  margin-top:5px
}
</style>