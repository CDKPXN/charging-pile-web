<template>
    <div style="margin-top:30px;">
        <!-- 查询 -->
        <el-row class="search">
            <el-col :span="4" class="colStyle">
                <el-input placeholder="用户名称" v-model="name" class="inputStyle" @change="restore" clearable></el-input> 
            </el-col>
            <el-col :span="4" class="colStyle">
                <el-input placeholder="手机号码" v-model="phone" class="inputStyle" @change="RestorePhone" clearable></el-input> 
            </el-col>
            <el-col :span="4" class="colStyle">
                <el-input placeholder="集团名称" v-model="bname" class="inputStyle" @change="RestoreBname" clearable></el-input> 
            </el-col>
            <el-col :span="4" class="colStyle">
                <el-select placeholder="用户状态" v-model="status" class="inputStyle" @change="RestoreStatus" clearable>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="锁定" value="1"></el-option>
                    <el-option label="删除" value="2"></el-option>
                </el-select> 
            </el-col>
            <el-col :span="5">
                <el-button type="primary" class="query"  @click="query">查询</el-button>
                 <el-button class="add" type="primary" style="margin-left:10%" icon="document" @click="handleDownload" :loading="downloadLoading">导出报表</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" class="userListtable">
            <el-table-column prop="name" label="用户名称"  >
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>             
            <el-table-column prop="bname" label="隶属集团">
            </el-table-column>
            <el-table-column prop="discount" label="用户折扣">
            </el-table-column>
            <el-table-column prop="balance" label="用户余额(元)">
            </el-table-column>
            <el-table-column prop="hd_balance" label="活动余额(元)">
            </el-table-column>
            <el-table-column prop="vehicle_type" label="用户绑定车辆">
            </el-table-column>
            <el-table-column prop="ctime" label="创建日期" width="200px;">
            </el-table-column>
            <el-table-column label="用户状态" >
                <template slot-scope="scope">
                    <span v-if="scope.row.status==0">正常</span>
                    <span v-if="scope.row.status==1">锁定</span>
                    <span v-if="scope.row.status==2">删除</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="auth.isAdmin()" >
                <template slot-scope="scope">
                    <el-row :gutter="1">
                       <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="8"> <el-button size="mini"  type="primary"  @click="handleCharge(scope.$index, scope.row.id)">充值</el-button></el-col>
                      <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="8"><el-button size="mini"  type="primary"  @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button></el-col>
                      <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="8"><el-button size="mini"  type="primary"  @click="handleClick(scope.row,scope.$index)">退款</el-button></el-col>
                   
                   </el-row>
                   
                    
                    
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
         <!-- 编辑对话框 -->
        <el-dialog :title="titleMsg" :visible.sync="dialogFormVisible" width="450px" @close="close('form')">
           <el-form :model="form" style="margin-left:-8%" ref='form' :rules='rules'>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
                            <el-input v-model="form.username" class="addStyle" clearable auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                            <el-input v-model="form.phone" class="addStyle" clearable auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户状态" :label-width="formLabelWidth">
                            <el-select v-model="form.status" class="addStyle" auto-complete="off">
                                <el-option
                                    v-for="item in form.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="subaMend">确 认</el-button>
            </div>
        </el-dialog>
        <!-- 充值对话框 -->
        <el-dialog title="用户充值" :visible.sync="dialogFormCharge" width="450px" @close="close('form')">
           <el-form :model="form" style="margin-left:-8%" ref='form' :rules='rules'>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="充值金额" :label-width="formLabelWidth" prop="money">
                            <el-input v-model="form.money" class="addStyle" type="number" maxlength="6" placeholder="单位/元" clearable auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormCharge = false">取 消</el-button>
                <el-button type="primary" @click="subCharge">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import { api_modifyOwner } from '../../api/index.js'
    export default {
        name: 'userList',
        data () {
            var UserName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('用户名称不能为空'))
                }
            }
            var Money = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('请输入您要充值的金额'))
                }if(value == 0){
                    callback(new Error('充值金额必须大于0'))
                }
            }
            // var Phone = (rule,value,callback) => {
            //     let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
            //     if(value === ''){
            //         callback(new Error('手机号码不能为空'))
            //     }else if(!myreg.test(value)){
            //         callback(new Error('请输入正确的手机号码'))
            //     }
            // }
            return {
                name:'',
                phone:'',
                bname:'',
                status:'',
                titleMsg:'',
                tableData:[],
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
                    uid:'',
                    phone:'',
                    username:'',
                    status:'',
                    money:'',
                },
                dialogFormVisible:false,
                formLabelWidth: '120px',
                // 分页
                current_page: 1,
                page_size: 10,
                total:0,
                //表单验证
                rules:{
                    username:[
                        {validator:UserName,trigger:'blur'}
                    ],
                    // phone:[
                    //     {validator:Phone,trigger:'blur'}
                    // ],
                    money:[
                        {validator:Money,trigger:'blur'}
                    ]
                },
                dataList:[],
                downloadLoading:false,
                dialogFormCharge:false,
                count:0,
                uid:''
            }
        },
        watch:{
            form:{
                handler(newPhone,oldPhone){
                    console.log()
                },
                // immediate: true,
                deep: true,
            }
        },
        created(){
            let vm = this
            vm.query();
        },
        methods:{
            restore(){
                if(this.name == ''){
                    this.query()
                }
            },
            RestorePhone(){
                if(this.phone == ''){
                    this.query()
                }
            },
            RestoreBname(){
               if(this.bname == ''){
                    this.query()
                } 
            },
            RestoreStatus(){
                this.query()
            },
            query(){
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/api/bloc/user?page=1&size=1000',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.name,
                        bname:vm.bname,
                        phone:vm.phone,
                        status:vm.status
                    }
                }).then(res => {
                   if(res.data.code == 200){
                       vm.tableData = res.data.data.list.slice(0,vm.page_size == 0?'10':vm.page_size)
                    //    console.log(res.data.data.list)
                       vm.tableData.map(item =>{
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.bname == null){
                                item.bname = '--'
                            }
                            if(item.vehicle_type == null){
                                item.vehicle_type = '--'
                            }
                       })
                       vm.total = res.data.data.list.length
                   }
                })
            },
            // 打开充值金额对话框
            handleCharge(index,row){
                this.dialogFormCharge = true
                this.uid = row
                this.count = 0
            },
            //退款的回调
             handleClick(row,index) {
            
             let vm=this;
              vm.$ajax({
              method: "post",
              url:"/api/bloc/user/refund",
              headers: { token: sessionStorage.getItem("token") },
              data:{phone:row.phone,refund:row.balance*100}
              }).then(res => {
             
              if (res.data.code == 200) {
              //把视图表格上的数据变为0
              vm.tableData[index].balance=0;
              this.$message({
               message: '退款成功',
               type: 'success',
              });
            }else{
              this.$message.error('退款失败');
           }
          })
         },
            // 充值金额验证
            Verification () {
                let vm = this
                if(vm.form.money == ''){
                    vm.$message({
                        type:'warning',
                        message:"请完善参数"
                    })
                }else{
                    return true
                }
            },
            // 提交充值金额
            subCharge(){
                let vm = this
                vm.count++
                if(vm.Verification()){
                    if (vm.form.money == '' || vm.form.money == 0) {
                        this.count = 0
                        return false
                    }else if(vm.count > 1){
                        return false
                    }else{
                        let money_b = this.form.money * 100
                        vm.$ajax({
                            method:'post',
                            url:'/api/rechargeOrder/cardRecharge',
                            headers:{'token':sessionStorage.getItem('token')},
                            data:{
                                amount:money_b,
                                uid:this.uid
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
                
            },
            // 打开编辑用户信息对话框
            handleEdit(index,row){
                let vm = this
                let data = vm.tableData[index]
                console.log(data)
                vm.titleMsg='修改用户信息'
                vm.form.uid = data.id
                vm.form.username = data.name
                // vm.form.phone = data.phone
                vm.form.status = data.status
                vm.dialogFormVisible=true
            },
            //提交编辑信息
            subaMend(){
                let vm  = this
                // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/
                if(vm.form.username == ''){
                    return false
                }else{
                    vm.$ajax({
                        method:'put',
                        url:'/api/bloc/user',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            id:vm.form.uid,
                            status:vm.form.status,
                            phone:vm.form.phone,
                            name:vm.form.username,
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
                }
            },
            //删除用户信息
            handleDelete(index){
                this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 分页点击事件
            handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                 let vm = this
                 vm.page_size = val
                 vm.tableData = []
                 vm.$ajax({
                    method:'get',
                    url: '/api/bloc/user?page=1&size='+vm.page_size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.name,
                        bname:vm.bname,
                        phone:vm.phone,
                        status:vm.status
                    }
                 })
                 .then(res=>{
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list
                        vm.tableData.map(item =>{
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.bname == null){
                                item.bname = '--'
                            }
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
                    url:'/api/bloc/user?page='+val+'&size='+size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.name,
                        bname:vm.bname,
                        phone:vm.phone,
                        status:vm.status
                    }
                }).then(res => {
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list
                        vm.tableData.map(item =>{
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.bname == null){
                                item.bname = '--'
                            }
                            if(item.vehicle_type == null){
                                item.vehicle_type = '--'
                            }
                       })
                    }
                })
            },
            //导出数据
            handleDownload(){
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/api/bloc/user?page=1&size=1000',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.name,
                        bname:vm.bname,
                        phone:vm.phone,
                        status:vm.status
                    }
                }).then(res => {
                   if(res.data.code == 200){
                        vm.dataList = res.data.data.list
                        console.log('list',vm.dataList)
                        vm.dataList.map(item => {
                            item.balance = (parseFloat(item.balance) / 100).toFixed(2)
                            item.hd_balance = (parseFloat(item.hd_balance) / 100).toFixed(2)
                            if(item.bname == null){
                                item.bname = '--'
                            }
                            if(item.vehicle_type == null){
                                item.vehicle_type = '--'
                            }
                            if(item.status == 0){
                                item.status = '正常'
                            }else if(item.status == 1){
                                item.status = '删除'
                            }else{
                                item.status = '锁定'
                            }
                        })
                        vm.downloadLoading = true;
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('../../../vendor/Export2Excel.js');
                            const tHeader = ['用户名称', '手机号码', '隶属集团','用户折扣','用户余额(元)','活动余额(元)','用户绑定车辆','创建日期','用户状态'];
                            const filterVal = ['name', 'phone', 'bname','discount','balance','hd_balance','vehicle_type','ctime','status'];
                            let tongji={name:'统计',phone:'--',bname:'--',discount:'--',balance:0,hd_balance:0,vehicle_type:'--',ctime:'--',status:'--'};
                            for(let i=0;i<this.dataList.length;i++){
                                 tongji.balance+=Number(this.dataList[i].balance) 
                                 tongji.hd_balance+=Number(this.dataList[i].hd_balance) 
                            }
                            // tongji.balance=tongji.balance.toFixed(2)
                            // console.log("dddd",tongji)
                            this.dataList.push(tongji)
                            const list = this.dataList;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '用户列表');
                            this.downloadLoading = false;
                        })
                    }
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            close(formname){
                let vm = this
                vm.$refs[formname].resetFields()
            }
        }
    }
</script>
<style >
 .userListtable td{
    padding: 12px 0px !important;
}
.userListtable th{
    padding: 8px 0px !important;
}
</style>
