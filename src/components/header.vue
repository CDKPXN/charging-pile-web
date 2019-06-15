<template>
    <div>
        <el-row >
          
            <span class="clearfix">充电桩运营管理平台</span>
            <!-- <span @click="downloadAPP()">下载APP</span> -->
            <el-button  @click.native='downloadAPP1()' type="primary">下载android</el-button>
            <el-button @click.native='downloadAPP2()' type="primary">下载ios版</el-button>
            <!-- 告警 -->
            <el-dropdown  id="block" style="position:absolute;right:150px;line-height:60px;">
                <span class="el-dropdown-link">
                    <el-badge  is-dot :value="result" :max="99" class="item">
                        <i class="fa fa-bell" @click="giveAnAlarm" style="font-size:18px;"></i>
                    </el-badge>
                </span>
                <el-dropdown-menu  slot="dropdown">                     
                    <el-dropdown-item>
                        <span @click="giveAnAlarm" v-if="result==0">暂无未读告警信息</span>&nbsp;
                        <span @click="giveAnAlarm" v-if="result!=0">有 {{result}} 条告警信息未读</span>&nbsp;
                    </el-dropdown-item>  
                </el-dropdown-menu>
            </el-dropdown>
            <!-- 个人中心 -->
            <el-dropdown trigger="click" style="position:absolute;right:50px;">
                <span class="el-dropdown-link admin">
                    <span style="font-size:18px">{{userName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu style="margin-left:-1%" slot="dropdown">                     
                    <el-dropdown-item><i class="fa fa-cog" aria-hidden="true" style="font-size:14px"></i>&nbsp;&nbsp;<span @click="dialogFormVisible=true">修改密码</span>&nbsp;</el-dropdown-item>  
                    <el-dropdown-item><i class="fa fa-sign-out fa-lg" style="font-size:14px"></i>&nbsp;&nbsp;<span @click="gotoLogin">退出登录</span>&nbsp;</el-dropdown-item>  
                </el-dropdown-menu>
            </el-dropdown>
        </el-row>
        <!-- 密码修改对话框 -->
        <el-dialog title="密码修改" width="450px" :visible.sync="dialogFormVisible" @close="close('form')">
            <el-form :model="form" style="margin-left:-8%" ref="form" :rules="rules">
                <el-row class="marRule">
                <el-col :span="12">
                    <el-form-item label="当前密码" :label-width="formLabelWidth" prop="oldPwd">
                        <el-input v-model="form.oldPwd" :type="registration_data.nowtype" maxlength="16" placeholder="请输入当前密码" class="addStyle" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <i class="fa fa-eye" aria-hidden="true" v-if="isOldPwd" @click="changeStyle(1)"></i>
                    <i class="fa fa-eye-slash" aria-hidden="true" v-if="!isOldPwd" @click="changeStyle(1)"></i>
                </el-col>
                </el-row>
                <el-row class="marRule">
                <el-col :span="12">
                    <el-form-item label="新的密码" :label-width="formLabelWidth" prop="newPwd">
                        <el-input v-model="form.newPwd" :type="registration_data.newtype" placeholder="请输入新密码" maxlength="16" class="addStyle" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <i class="fa fa-eye" aria-hidden="true" v-if="isNewPwd" @click="changeStyle(2)"></i>
                    <i class="fa fa-eye-slash" aria-hidden="true" v-if="!isNewPwd" @click="changeStyle(2)"></i>
                </el-col>
                </el-row>
                <el-row class="marRule">
                    <el-col :span="12">
                        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPwd">
                            <el-input v-model="form.checkPwd" :type="registration_data.pwdType" placeholder="再次输入新密码" maxlength="16" class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <i class="fa fa-eye" aria-hidden="true" v-if="isCheckPwd" @click="changeStyle(3)"></i>
                        <i class="fa fa-eye-slash" aria-hidden="true" v-if="!isCheckPwd" @click="changeStyle(3)"></i>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="padding-right:20%;padding-bottom:10px">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="changePwd">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'MyHeader',
    data(){
        //当前密码验证
        var checkOldPwd = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('请输入密码'));
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
        return{
            result:0,
            dialogFormVisible:false,
            formLabelWidth:'120px',
            userName:'',
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
            //眼睛切换显示
            isOldPwd:true,
            isNewPwd:true,
            isCheckPwd:true,
            //密码显示/隐藏
            registration_data:{
                pwdType:'password',
                newtype:'password',
                nowtype:'password'
            },
        }
    },
    methods:{
        // 跳转告警信息列表页面
        giveAnAlarm(){
            this.$router.push('/giveAnAlarm')
        },
        // 退出登录
        gotoLogin () { 
                 localStorage.removeItem('checked')
            localStorage.removeItem('user')
            localStorage.removeItem('password')
               this.$router.push('/login')
        },
        //修改密码
        changePwd(){   
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
        //清除表单验证
        close(formName){
            this.$refs[formName].resetFields()
            this.isOldPwd = true,
            this.isNewPwd = true,
            this.isCheckPwd = true
        },
        // 密码显示/隐藏
        changeStyle(shownum){
            let vm = this
            if(shownum == 1){
                vm.isOldPwd = !vm.isOldPwd
                vm.registration_data.nowtype = vm.registration_data.nowtype==='password'?'text':'password';
            }else if(shownum == 2){
                vm.isNewPwd = !vm.isNewPwd
                vm.registration_data.newtype = vm.registration_data.newtype==='password'?'text':'password';
            }else{
                vm.isCheckPwd = !vm.isCheckPwd
                vm.registration_data.pwdType = vm.registration_data.pwdType==='password'?'text':'password';
            }
        },
        //下载APP
        downloadAPP1(){
            window.location.href='https://android.myapp.com/myapp/detail.htm?apkName=com.kpxn.rongEchong&ADTAG=mobile'  
        },
        downloadAPP2(){
            window.location.href='https://itunes.apple.com/cn/app/蓉e充/id1455196385?mt=8'
        }
    },
    created(){
        let vm = this
        vm.userName = sessionStorage.getItem('user')
        vm.$ajax({
            method:'get',
            url:'api/fault/list?page=1&size=1000',
            headers:{'token':sessionStorage.getItem('token')},
        }).then(res=>{
            for(var i=0;i<res.data.data.list.length;i++){
                if(res.data.data.list[i].status==0){
                this.result++
                }
            }
        })
    }
}
</script>
<style lang="scss" scoped>
    .admin{
        cursor: pointer;
    }
    .fa-eye,.fa-eye-slash{
        position: absolute;
        right: 15%;
        top:24%;
        cursor: pointer;
    }
    .marRule{
        margin-top:5px
    }
</style>