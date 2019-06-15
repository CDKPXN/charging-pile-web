<template>
    <div>
        <el-row class="search" style="margin-top:0;width:98.2%">
            <el-col :span="4">
                <span style="font-size:18px;">{{siteName}}集团</span>
            </el-col>
        </el-row>
        <el-row class="search" style="width:98.2%;position:relative">
            <el-col :span="4" class="colStyle">
                <el-input placeholder="用户名称" v-model="username" clearable @change="resetname" class="inputStyle"></el-input> 
            </el-col>
            <el-col :span="4" class="colStyle">
                <el-input placeholder="手机号码" v-model="phone" clearable @change="resetphone" class="inputStyle"></el-input> 
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="query" @click="query">查询</el-button>
            </el-col>
            <el-col :span="5" class="col_pos">
                <!-- <el-button type="primary" class="add btn_right" @click="handleCost()">消费记录</el-button> -->
                <el-button type="primary" class="add btn_right" @click="handleCard()">注册用户</el-button>
                <el-button type="primary" class="add btn_right" @click="handleAdd()">绑定已有用户</el-button>
                <el-button type="infor" class="add btn_right" @click="Goback">返回</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="用户姓名">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column prop="balance" label="用户余额(元)">
            </el-table-column>
            <el-table-column prop="hd_balance" label="活动余额(元)">
            </el-table-column>
            <el-table-column prop="vehicle_type" label="用户绑定车辆">
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status==0">正常</span>
                    <span v-if="scope.row.status==1">锁定</span>
                    <span v-if="scope.row.status==2">删除</span>
                </template>
            </el-table-column>
            <el-table-column prop="ctime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"  type="primary"  @click="handleCharge(scope.$index, scope.row.id)">充值</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">解绑</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <!-- 已存在的用户绑定 和 编辑集团信息对话框 -->
        <el-dialog :title="titleMsg" :visible.sync="dialogFormVisible"  width="450px" @close="close('form')">
            <el-form :model="form" style="margin-left:-8%" ref="form" :rules="rules">
                <el-form-item label="用户名称" v-show="isShow"  :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" class="addStyle" clearable auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="phoneMsg" v-show="!isCard" v-if="!isShow" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" clearable maxlength="11" class="addStyle" @input="check"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="phoneMsg" v-show="isCard" v-if="!isShow" :label-width="formLabelWidth" prop="card">
                    <el-input v-model="form.card" type="number" clearable  class="addStyle" @input="check"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="绑定方式" v-show="isBind" :label-width="formLabelWidth">
                    <template>
                        <el-radio v-model="radio" label="1" border @change="changeRadio">手机号码</el-radio>
                        <el-radio v-model="radio" label="2" border @change="changeRadio">卡片号码</el-radio>
                    </template>
                </el-form-item>
               
                <el-form-item label="用户状态" v-show="isShow" :label-width="formLabelWidth">
                    <el-select v-model="form.status" class="addStyle" auto-complete="off">
                        <el-option
                            v-for="item in form.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer"  class="dialog-footer" style="padding-bottom:10px">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGroup('form')">确 认</el-button>
            </div>
        </el-dialog>
        <!-- 充值对话框 -->
        <el-dialog title="用户充值" status-icon :visible.sync="dialogFormCharge" width="450px" @close="closeCharge('ruleForm2')">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="充值金额" prop="money">
                    <el-input v-model.number="ruleForm2.money"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormCharge = false">取 消</el-button>
                <el-button type="primary" @click="subCharge('ruleForm2')">确 认</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'EvaluateList',
        data () {
            var addPhone = (rule,value,callback) => {
                let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                if(value === ''){
                    callback(new Error('手机号码不能为空'))
                }else if(!myreg.test(value)){
                    callback(new Error('请输入正确的手机号码'))
                }
            }
            var Money = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('请输入您要充值的金额'))
                }if(value == 0){
                    callback(new Error('充值金额必须大于0'))
                }
            }
            var addName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('用户名称不能为空'))
                }
            }
            var Card = (rule,value,callback) => {
                if(value.length > 11 || value.length < 11 ||value.length == ''){
                    callback(new Error('请输入长度为11位的卡片号码'))
                }
            }
            var Money = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入充值金额'));
                }
                if (!Number(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value <= 0) {
                    callback(new Error('输入的金额必须大于0'));
                    } else {
                    callback();
                    }
                }
            };
            return {
                siteName:'',
                uid:'', //用户id
                bid:'', // 集团id
                username:'',
                phone:'',
                titleMsg:'',
                phoneMsg:'',
                isShow:false,
                isCard:false,
                isBind:false,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form: {
                    options:[{
                        value: 0,
                        label: '正常'
                        }, {
                        value: 1,
                        label: '锁定'
                        }, {
                        value: 2,
                        label: '删除'
                    }],
                    chargeUid:'',
                    name: '',
                    phone:'',
                    status:'',
                    cost:'',
                    card:''
                },
                ruleForm2:{
                    money:'',
                },
                tableData:[],
                current_page: 1,
                page_size: 10,
                total:0,
                rules:{
                    phone:[
                        {validator:addPhone,trigger:'blur'}
                    ],
                    name:[
                        {validator:addName,trigger:'blur'}
                    ],
                    card:[
                        {validator:Card,trigger:'blur'}
                    ]
                },
                rules2:{
                    money: [
                        { validator: Money, trigger: 'blur' }
                    ]
                },
                dialogFormCharge:false,
                count:0,
                uid:'',
                dialog:0,
                radio: '1'
            }
        },
        watch:{
            page_size (val) {
                this.clg(val)
            }
        },
        created () {
            this.siteName = this.$route.query.siteName
            this.bid = this.$route.query.id
            this.query()
        },
        methods:{
            // 清空输入框数据后重置查询
            resetname(){
                if(this.username == ''){
                    this.query()
                }
            },
            resetphone(){
                if(this.phone == ''){
                    this.query()
                }
            },
            // 查询数据
            query () {  
                let vm = this
                let id = this.$route.query.id
                vm.tableData = []
                vm.$ajax({
                    method:'get',
                    url:'/api/bloc/user?page=1&size=1000&bid='+id,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.username,
                        phone:vm.phone
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                        vm.total = res.data.data.list.length
                        vm.tableData.map(item => {
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.vehicle_type == null){
                                item.vehicle_type = '--'
                            }
                        })
                    }
                })
            },
            //自动查询用户的电话号码/卡片号码是否存在,如果存在就返回用户的id
            check(){
                let vm = this
                if(vm.radio == '1'){
                    if(vm.form.phone.length == 11){
                        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                        if(myreg.test(vm.form.phone)){  
                            vm.$ajax({
                                method:'get',
                                url:'/api/bloc/user?phone='+vm.form.phone,
                                headers:{'token':sessionStorage.getItem('token')},
                            }).then(res => {
                                if(res.data.data.list.length == 1){
                                    vm.uid = res.data.data.list[0].id
                                }
                            })
                        }else{
                            vm.uid = ''
                        }
                    }
                }else{
                    if(vm.form.card.length == 11){
                        vm.$ajax({
                            method:'get',
                            url:'/api/bloc/user?phone='+vm.form.card,
                            headers:{'token':sessionStorage.getItem('token')},
                        }).then(res => {
                            if(res.data.data.list.length == 1){
                                vm.uid = res.data.data.list[0].id
                            }
                        })
                    }else{
                        vm.uid = ''
                    }
                }
            },
            // 编辑集团用户对话框
            handleEdit(row,$event){  
                console.log($event)
                this.titleMsg="修改集团用户信息"
                this.phoneMsg = '手机号码'
                this.dialogFormVisible=true  
                this.form.uid = $event.id
                this.form.name=$event.name
                // this.form.phone=$event.phone
                this.form.status=$event.status
                this.isCard = false
                this.isShow = true
                this.isBind = false
                this.dialog = 1
            }, 
            // 打开绑定集团用户对话框
            handleAdd () {     
                this.dialogFormVisible= true  
                this.titleMsg= "绑定集团用户"
                this.phoneMsg = '手机号码'
                this.form.phone= ''
                this.form.card = ''
                this.static_modal= 'add'
                this.isCard = false
                this.isShow = false
                this.isBind = true
                this.dialog = 0
                this.radio = '1'
            },
            // 通过卡片进行绑定用户
            handleCard(){
                this.dialogFormVisible=true  
                this.titleMsg= "卡片绑定集团用户"
                this.phoneMsg = '卡片号码'
                this.form.phone=''
                this.form.card = ''
                this.static_modal='add'
                this.isShow = false
                this.isCard = true
                this.isBind = false
                this.dialog = 2
            },
            // 打开充值金额对话框
            handleCharge(index,row){
                this.dialogFormCharge = true
                this.chargeUid = row
                this.count = 0
            },
            // 提交充值金额
            subCharge(formName){
                let vm = this
                vm.count ++
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(vm.count != 1){
                            return false
                        }else{
                            let money_b = this.ruleForm2.money * 100
                            vm.$ajax({
                                method:'post',
                                url:'/api/rechargeOrder/cardRecharge',
                                headers:{'token':sessionStorage.getItem('token')},
                                data:{
                                    amount:money_b,
                                    uid:this.chargeUid
                                }
                            }).then(res => {
                                if(res.data.code == 200){
                                    this.$message({
                                        type: 'success',
                                        message: '充值成功'
                                    })
                                    this.query()
                                    this.dialogFormCharge = false
                                }else{
                                    this.$message({
                                        type: 'success',
                                        message: '充值失败,请重新充值'
                                    })
                                    this.dialogFormCharge = false
                                }
                            })
                        }
                    } 
                    else {
                        return false;
                    }
                });
                
            },
            // 验证数据
            Verification () {  
                let vm = this
                if(vm.radio == '1'){
                    let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                    if(myreg.test(vm.form.phone) == false){
                        return false
                    }else{
                        return true
                    }
                }else{
                    if(vm.form.card=='' || vm.form.card.length != 11){
                        vm.$message({
                            type:'warning',
                            message:"请完善参数"
                        })
                    }else{
                        return true
                    }
                }
                
            },
            // 发送绑定集团用户的数据
            addGroup (formName) {   
                let vm = this
                if(vm.dialog == 0){
                    if(vm.Verification()){
                        if(vm.uid == ''){
                            vm.$message({
                                type:'warning',
                                message:"当前用户不存在,请重新输入!"
                            })
                        }else{
                            vm.$ajax({
                                method:'put',
                                url:'/api/bloc/user',
                                headers:{'token':sessionStorage.getItem('token')},
                                data:{
                                    bid:vm.bid,
                                    id:vm.uid
                                }
                            })
                            .then(res=>{
                                if(res.data.code==200){
                                    vm.$message({
                                        type:'success',
                                        message:"绑定成功"
                                    })
                                    vm.dialogFormVisible=false;
                                    vm.query()
                                }else{
                                    vm.$message({
                                        type:'warning',
                                        message:res.data.message
                                    })
                                }
                            })
                        }
                    }
                }
                else if(vm.dialog == 1){
                    // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                    if(vm.form.name != ''){
                        vm.$ajax({
                            method:'put',
                            url:'/api/bloc/user',
                            headers:{'token':sessionStorage.getItem('token')},
                            data:{
                                id:vm.form.uid,
                                status:vm.form.status,
                                // phone:vm.form.phone,
                                name:vm.form.name,
                            }
                        }).then(res=>{
                            if(res.data.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                })
                                this.query()
                                vm.dialogFormVisible=false
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.message
                                })     
                            }
                        })
                    }else{
                        return false
                    }
                }
                else{
                    if(vm.form.card == '' || vm.form.card.length > 11 || vm.form.card.length < 11){
                        return false
                    }
                    else{
                        if(vm.form.card.length == 11){
                            let six_phone = vm.form.card.substr(5,11)  //卡片用户的密码,密码为卡片号码的后六位
                            vm.$ajax({
                                method:'POST',
                                url:'/api/bloc/user',
                                headers:{'token':sessionStorage.getItem('token')},
                                data:{
                                    phone:vm.form.card,
                                    password:six_phone,
                                    bid:vm.bid,
                                }
                            })
                            .then(res=>{
                                if(res.data.code==200){
                                    vm.$message({
                                        type:'success',
                                        message:"绑定成功"
                                    })
                                    vm.dialogFormVisible=false;
                                    vm.query()
                                }else{
                                    vm.$message({
                                        type:'warning',
                                        message:res.data.message
                                    })
                                }
                            })
                        }
                    }
                    // this.$refs[formName].validate((valid) => {
                    //     if (valid) {
                    //         let six_phone = vm.form.card.substr(5,11)  //卡片用户的密码,密码为卡片号码的后六位
                    //         vm.$ajax({
                    //             method:'POST',
                    //             url:'/api/bloc/user',
                    //             headers:{'token':sessionStorage.getItem('token')},
                    //             data:{
                    //                 phone:vm.form.card,
                    //                 password:six_phone,
                    //                 bid:vm.bid,
                    //             }
                    //         })
                    //         .then(res=>{
                    //             if(res.data.code==200){
                    //                 vm.$message({
                    //                     type:'success',
                    //                     message:"绑定成功"
                    //                 })
                    //                 vm.dialogFormVisible=false;
                    //                 vm.query()
                    //             }else{
                    //                 vm.$message({
                    //                     type:'warning',
                    //                     message:res.data.message
                    //                 })
                    //             }
                    //         })
                    //     }else {
                    //         return false;
                    //     }
                    // });
                }
            },
            // 解绑集团用户信息
            handleDelete(index,row){ 
                this.$confirm('确定解绑该用户?', '确认信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                     this.$ajax({
                         method:'put',
                         url:'/api/bloc/user',
                         headers:{'token':sessionStorage.getItem('token')},
                         data:{
                            bid:0,
                            id:row.id
                         }
                     }).then(res => {
                         if(res.data.code == 200){
                             this.query()
                         }
                     })
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '解绑成功!'
                    });
                }).catch(() => {
                });
            },
            // 查看用户消费记录
            handleCost(){
               this.$router.push({path:'/costList'})
            },
            // 更改绑定已存在用户的方式  1:手机号码绑定  2:卡片号码绑定
            changeRadio(){
                if(this.radio == '2'){
                    this.isCard = true
                    this.phoneMsg = '卡片号码'
                    this.close('form')
                }else{
                    this.isCard = false
                    this.phoneMsg = '手机号码'
                    this.close('form')
                }
            },
            // 分页点击事件
            handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                let vm = this
                vm.page_size = val
                let id = this.$route.query.id
                vm.tableData = []
                vm.$ajax({
                    method:'get',
                    url:'/api/bloc/user?page=1&size='+vm.page_size+'&bid='+id,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.username,
                        phone:vm.phone
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list
                        vm.tableData.map(item => {
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.vehicle_type == null){
                                item.vehicle_type = '--'
                            }
                        })
                    }
                })
            },
            handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
                let vm = this
                let size = vm.page_size==0?'10':vm.page_size
                vm.tableData = []
                vm.$ajax({
                    method:'get',
                    url:'/api/bloc/user?page='+val+'&size='+size+'&bid='+id,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.username,
                        phone:vm.phone
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list
                        vm.tableData.map(item => {
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.vehicle_type == null){
                                item.vehicle_type = '--'
                            }
                        })
                    }
                })
            },
            // 清除表单验证
            close(formname){
                this.$refs[formname].resetFields()
            },
            closeCharge(formname){
                this.$refs[formname].resetFields()
            },
            //返回集团列表
            Goback(){
                let vm = this
                vm.$router.push({path:'./evaluate'})
            },
        },
    }
</script>
<style lang="scss">
    .col_pos{
        position: absolute;
        right: -10px
    }
    .btn_right{
        margin-right: 20px;
    }
</style>