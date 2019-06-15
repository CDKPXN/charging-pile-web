<template>
    <div class="main">
        <el-card class="box-card">
            <div style="margin-left:20px;">
                <el-row style="width:95.15%">
                    <el-col :span="6" class="colStyle">
                        <el-input v-model="userName" placeholder="业主名称" class="inputStyle"  @change="restoreName"  clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="6"  class="colStyle">
                        <el-input v-model="phone" type="number" maxlength="11" @change="restorePhone"  class="inputStyle"  placeholder="手机号" clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" class="query" @click="query">查询</el-button>
                    </el-col>
                    <el-button type="primary" class="add" @click="openAddOwner" style="position:absolute;right:0">新增业主</el-button>
                </el-row>
            </div>
            <i class="fa fa-spinner fa-pulse loading" v-if="loading"></i>
            <owner-list :tableData="data" v-on:childrenQuery="query"></owner-list>
            <!-- 分页 -->
            <div class="paTotal">
                <span>共&nbsp;{{total}}&nbsp;结果</span>
            </div>
            <div class="block" style="margin-left:10%;padding-bottom:20px;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="current_page"
                    :page-sizes="[10,20,50]"
                    :page-size="10"
                    layout="sizes, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!-- 新增业主 -->
        <el-dialog title="新增业主" :visible.sync="dialogFormVisible" @close="close('form')" width="450px">
            <el-form :model="form" style="margin-left:-8%" ref="form" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="业主名称" :label-width="formLabelWidth" prop="ownername">
                            <el-input v-model="form.ownername" class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
                            <el-input v-model="form.username" auto-complete="off" autofocus=""  class="addStyle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设置密码" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="form.password" :type="registration_data.pwdType" maxlength="16" class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                            <i class="el-icon-view" @click="changeStyle"></i>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                            <el-input v-model="form.phone" class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer footer-dialog" style="padding-right:20%;padding-bottom:10px">
                <el-button type="infor" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="addProprietor">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import { api_ownerList , api_addOwner , api_groupSiteList } from "../api/index.js"
    import  OwnerList  from './components/ownerList.vue'
    
    export default {
        components:{
            OwnerList,
        },
        data(){
            var addUserName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('负责人名称不能为空'))
                }
            }
            var addOwnerName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('业主名称不能为空'))
                }
            }
            var addPassWord = (rule,value,callback) => {
                let pwd =/^([0-9]|[a-zA-Z]){6,16}$/
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if(!pwd.test(value)){
                    callback(new Error('请输入6-16位的数字或字母'))
                } else {
                    callback();
                }
            }
            var addPhone = (rule,value,callback) => {
                let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                if(value === ''){
                    callback(new Error('电话号码不能为空'))
                }else if (!myreg.test(value)){
                    callback(new Error('请输入正确的手机号码'))
                }else{
                    callback()
                }
            }
            return{
                form:{
                    options:[],
                    region:'',
                    ownername: '',
                    password: '',
                    username: '',
                    phone: ''
                },
                data:[],
                userName: '',
                phone: '',
                dialogFormVisible:false,
                formLabelWidth: '120px',
                total:0,
                current_page:1,
                page_size:0,
                loading:true,
                registration_data:{
                    pwdType:"password",
                },
                rules:{
                    username:[
                        {validator:addUserName,trigger:'blur'}
                    ],
                    ownername:[
                        {validator:addOwnerName,trigger:'blur'}
                    ],
                    password:[
                        {validator:addPassWord,trigger:'blur'}
                    ],
                    phone:[
                        {validator:addPhone,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            //密码显示/隐藏
            changeStyle(){
                let vm = this
                vm.registration_data.pwdType = vm.registration_data.pwdType==='password'?'text':'password';
            },
            //还原数据
            restoreName(){
                if(this.userName==''){
                    this.query()
                }
            },
            restorePhone(){
                if(this.phone==''){
                    this.query()
                }
            },
            //查询业主返回数据
            query(){
                let vm = this
                vm.loading = true
                vm.data = []
                vm.$ajax({
                    method:'get',
                    url:'/api/admin/list?page=1&size=1000',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.userName,
                        phone:vm.phone
                    }
                }).then(res=>{
                    if(res.data.code===200){
                        vm.clg(res.data.data.list)
                        vm.data = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)  
                        vm.total = res.data.data.list.length
                        vm.loading = false
                    }
                })
            },
            //添加业主用户
            openAddOwner(){
                let vm=this
                vm.dialogFormVisible = true
            },
            addProprietor(){
                let vm = this
                let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                let pwd =/^([0-9]|[a-zA-Z]){6,16}$/
                if(vm.form.ownername == '' || vm.form.username == '' || vm.form.phone == '' || vm.form.password == ''){
                    vm.$message({
                        type:'warning',
                        message: '请输入完整的信息!'
                    });
                }else{
                    //发起添加用户请求
                    if(!pwd.test(vm.form.password)){
                        // vm.$message.error('请输入6-16位的数字或字母');
                    }else if(!myreg.test(vm.form.phone)){
                        // vm.$message.error('请输入正确的手机号码');
                    }else{
                        let params = {
                                                        username:vm.form.username,
                            phone:vm.form.phone,
                            name:vm.form.ownername,
                            password:vm.form.password,
                        }
                        let url = "/api/admin"
                        
                        vm.$ajax({
                            url:url,
                            method:"post",
                            data:params,
                            headers:{'token':sessionStorage.getItem('token')},
                        })
                        .then(res=>{
                            
                            if(res.data.code==200){
                                vm.$message({
                                    type:'success',
                                    message: '添加成功!'
                                })
                                vm.dialogFormVisible=false;
                                vm.query()
                            }else{
                                vm.$message({
                                    type:'warning',
                                    message: res.data.message+'！'
                                })
                            }
                        })
                    }
                }  
            },
             // 分页点击事件
            handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                 let vm = this
                 vm.loading = true
                 vm.page_size = val
                 vm.tableData = []
                 vm.$ajax({
                    method:'get',
                    url:'/api/admin/list?page=1&size='+vm.page_size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.userName,
                        phone:vm.phone
                    }
                 })
                 .then(res=>{      
                    if(res.data.code==200){
                        vm.data = res.data.data.list
                        vm.loading = false
                    }
                })
            },
            handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
                let vm = this
                vm.loading = true
                 let size = vm.page_size==0?'10':vm.page_size
                 vm.tableData = []
                 vm.$ajax({
                    method:'get',
                    url:'/api/admin/list?page='+val+'&size='+size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.userName,
                        phone:vm.phone
                    }
                 }).then(res=>{
                    if(res.data.code==200){
                        vm.data = res.data.data.list
                        vm.loading = false
                    }
                })
            },
            close(forname){
                let vm = this
                vm.$refs[forname].resetFields()
            }
        },
        created(){
            this.query()
        }
    }
</script>
<style scoped>
    .el-icon-view{
        position: absolute;
        right: 15%;
        top:24%;
        cursor: pointer;
    }
</style>