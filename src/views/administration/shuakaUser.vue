<template>
    <div>
        <el-card class="box-card">
         <div> 
         <el-row class="search" style="width:98.2%">
            <el-col :span="4" class="colStyle">
                <el-input placeholder="手机号" v-model="lookcardNumber" class="inputStyle" @change="restore" clearable></el-input> 
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="query" @click="lookfor">查询</el-button>
            </el-col>
            <el-col :span="2" style="right:0;position:absolute;">
                <el-button type="primary" class="add" @click="handleAdd()">增加</el-button>
            </el-col>
        </el-row> 
         </div>

        <div style="margin-left:20px;">  
        <el-row>
        <el-col :span="24">
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" class="userListtable">
            <el-table-column prop="phone" label="手机号码"  >
            </el-table-column>
            <el-table-column prop="name" label="所属">
            </el-table-column>             
            <el-table-column prop="balance" label="用户余额(元)">
            </el-table-column>
            <el-table-column prop="ctime" label="创建日期" >
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
                    <el-row :gutter="10"  class="buttton-row">
                       <el-col :xs="4" :sm="8" :md="8" :lg="8" :xl="8"> <el-button size="mini"  type="primary"    style="font-size:0.2rem;" @click="handleCharge(scope.$index, scope.row)">充值</el-button></el-col>
                      <el-col :xs="4" :sm="8" :md="8" :lg="8" :xl="8"><el-button size="mini"  type="primary"  style="font-size:0.2rem;" @click="handleEdit(scope.$index, scope.row)">编辑</el-button></el-col>
                      <el-col :xs="4" :sm="8" :md="8" :lg="8" :xl="8"><el-button size="mini"  type="primary"   style="font-size:0.2rem;" @click="handlelook(scope.$index, scope.row)">查看</el-button></el-col>         
                   </el-row>                 
                </template>
            </el-table-column>
        </el-table>
        </el-col>
        </el-row>
          </div>
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
                :page-size="page_size"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
       </el-card> 
          <!-- 编辑对话框 -->
        <el-dialog :title="titleMsg" :visible.sync="dialogFormVisible" width="450px" >
           <el-form  style="margin-left:-8%" ref='form' :rules='rules'>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" :label-width="formLabelWidth" >
                            <el-input v-model="editcardNumber" class="addStyle" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户状态" :label-width="formLabelWidth">
                            <el-select v-model="status" class="addStyle" auto-complete="off">
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
           <!-- 新增对话框 -->
        <el-dialog :title="titleMsg" :visible.sync="dialogaddVisible" width="450px" >
           <el-form  style="margin-left:-8%" ref='form' :rules='rules'>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" :label-width="formLabelWidth" >
                            <el-input v-model="cardNumber" class="addStyle" clearable></el-input>
                        </el-form-item>
                         <el-form-item label="所属" :label-width="formLabelWidth" >
                            <el-input v-model="companyname" class="addStyle" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMend">确 认</el-button>
            </div>
        </el-dialog>
        <!-- 充值对话框 -->
        <el-dialog title="用户充值" :visible.sync="dialogFormCharge" width="450px" >
           <el-form  style="margin-left:-8%" ref='form' :rules='rules'>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="充值金额" :label-width="formLabelWidth" prop="money">
                            <el-input v-model="money" class="addStyle" type="number" maxlength="6" placeholder="单位/元" clearable auto-complete="off"></el-input>
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
  let reg=/^\d{11}$/;
  var UserName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('卡号不能为空'))
                }
            }
  var Money = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('请输入您要充值的金额'))
                }if(value == 0){
                    callback(new Error('充值金额必须大于0'))
                }
           }
export default {
  data(){
    
    return{
     tableData:[],
     total:0,
     current_page:1,
     page_size:10,
     titleMsg:'',
     cardNumber:'',
     companyname:'',
     lookcardNumber:'',
     editcardNumber:'',
     status:'',
     money:'',
     uid:'',
     count:0,
     dialogFormVisible:false,
     dialogFormCharge:false,
     dialogaddVisible:false,
      formLabelWidth: '120px',
      form: {
            options:[{
                        value: 0,
                        label: '正常'
                        }, 
                        {
                        value: 2,
                        label: '删除'
                    }],
            },
      //表单验证
                rules:{
                    cardNumber:[
                        {validator:UserName,trigger:'blur'}
                    ],
                    money:[
                        {validator:Money,trigger:'blur'}
                    ]
                },       
    }
  },
  methods:{
    handleAdd(){ //增加按钮
        this.dialogaddVisible=true  
        this.titleMsg="新增信息"
    },
     lookfor(){  //查询按钮
       let vm=this;
        vm.$ajax({
                        method:'get',
                        url:'/api/card/user/'+vm.lookcardNumber,
                        headers:{'token':sessionStorage.getItem('token')},
                       
                    }).then(res=>{
                       if(res.data.code==200){
                         this.tableData=res.data.data;
                       }

                    })
     },
     //还原数据
            restore(){
                if(this.cardNumber==''){
                    this.query()
                }
            },
    //编辑按钮
    handleEdit(index,row){
      this.titleMsg='用户编辑'
       this.dialogFormVisible=true;
       this.editcardNumber=row.phone;
       this.status=row.status;
       this.uid=row.id;
    },
    //充值按钮
    handleCharge(index,row){
       this.titleMsg='用户充值'
       this.dialogFormCharge=true;
       this.uid=row.id;
    },
    //查看按钮
    handlelook(index,row){
       let id = row.id
       this.$router.push({path:'./shuakaChildren',query:{id:id}})
    },
    addMend(){ //增加的确定按钮
      if(reg.test(this.cardNumber)){
          
       let vm=this;
       vm.$ajax({
                method:'post',
                url:'/api/card',
                headers:{'token':sessionStorage.getItem('token')},
                data:{
                    phone:vm.cardNumber,
                    name:vm.companyname,
                     }
                  }).then(res=>{
                    if(res.data.code==200){
                    this.dialogaddVisible=false;
                          this.$message({
                        type: 'success',
                        message: '增加成功'
                     })
                     this.query();                  
                     this.cardNumber='';//清空
                     this.companyname='';
                    }else{
                        this.$message({
                                type: 'warning',
                                message: res.data.message
                            })     
                    }
                    
                  })
      }else{
          this.$message({
             type: 'warning',
             message: '卡号必须是11位'
               })
      }
    },
    subaMend(){ //编辑确定按钮\
      if(reg.test(this.editcardNumber)){
           let vm=this;
          vm.$ajax({
                        method:'put',
                        url:'/api/bloc/user',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            id:vm.uid,
                            status:vm.status,
                            phone:vm.editcardNumber,
                        }
                    }).then(res=>{
                        if(res.data.code==200){
                            vm.dialogFormVisible=false
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                             this.query();                        
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.data.message
                            })     
                        }
                    }) 
      }else{
        this.$message({
             type: 'warning',
             message: '卡号必须是11位'
               })
      } 
       
    },
     // 充值金额验证
            Verification () {
                let vm = this
                if(vm.money == ''){
                    vm.$message({
                        type:'warning',
                        message:"请完善参数"
                    })
                }else{
                    return true
                }
            },
    subCharge(){  //充值确定按钮
       let vm = this
      vm.count++
        if(vm.Verification()){
            if (vm.money == '' || vm.money == 0) {
                        this.count = 0
                        return false
            }else if(vm.count > 1){
                        return false
           }else{
                        vm.$ajax({
                            method:'post',
                            url:'/api/rechargeOrder/cardRecharge',
                            headers:{'token':sessionStorage.getItem('token')},
                            data:{
                                amount:this.money,
                                uid:this.uid
                            }
                        }).then(res => {
                            if(res.data.code == 200){
                                this.dialogFormCharge = false
                                this.$message({
                                    type: 'success',
                                    message: '充值成功'
                                }) 
                                this.query()                            
                                
                            }else{
                                this.dialogFormCharge = false
                                this.$message({
                                    type: 'success',
                                    message: '充值失败,请重新充值'
                                })
                               
                            }
                        })
                    }
                }
    },
    handleSizeChange(value){ //每页数据显示条数改变触发
        this.page_size=value;
         let vm=this;
        vm.$ajax({
                    method:'get',
                    url:'/api/card',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                      page:this.current_page,
                      size:value
                    }
                }).then(res => {
                 if(res.data.code==200){
                    this.tableData=res.data.data.list;
                 }
                })
    },
    handleCurrentChange(value){ //当前页改变触发
         this.current_page=value;
         let vm=this;
        vm.$ajax({
                    method:'get',
                    url:'/api/card',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                      page:value,
                      size:this.page_size
                    }
                }).then(res => {
                 if(res.data.code==200){
                    this.tableData=res.data.data.list;
                 }


                })
    },
    query(){
      let vm=this;
        vm.$ajax({
                    method:'get',
                    url:'/api/card',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        page:this.current_page,
                        size:this.page_size
                    }
                }).then(res => {
                 if(res.data.code==200){
                    this.tableData=res.data.data.list;
                    this.total=res.data.data.total;
                 }


                })
    }
  },
  created(){
   this.query()  
  }
}
</script>

<style>

</style>
