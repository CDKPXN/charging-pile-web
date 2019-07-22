<template>
    <div>
        <!-- 搜索部分 -->    
       <el-card class="box-card">
         <div>   
            <el-row class="search"  type="flex" justify="end">
            <!-- <el-col :span="4" class="colStyle">
                <el-input placeholder="卡号" v-model="cardNumber" clearable  class="inputStyle"></el-input> 
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="query" @click="lookfor">查询</el-button>
            </el-col> -->
            <el-col :span="6" class="col_pos">
                <el-button type="primary" class="add btn_right" @click="handleCard()">注册用户</el-button>
                <!-- <el-button type="primary" class="add btn_right" @click="handleAdd()">绑定已有用户</el-button> -->
                <el-button type="infor" class="add btn_right" @click="Goback">返回</el-button>
            </el-col>
        </el-row>
        </div>
         <!-- 表格 -->
        <div style="margin-left:20px;">
        <el-row>
        <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" class="userListtable">
            <el-table-column prop="phone" label="卡号"  >
            </el-table-column>
            <!-- <el-table-column prop="name" label="集团名称">
            </el-table-column>             
            <el-table-column prop="balance" label="用户余额(元)">
            </el-table-column> -->
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
                       <el-col :span="24"> <el-button size="mini"  type="danger"    style="font-size:0.2rem;" @click="handleCharge(scope.$index, scope.row)">解绑</el-button></el-col>
                      <!---col :xs="4" :sm="8" :md="8" :lg="8" :xl="8"><el-button size="mini"  type="primary"  class="userListbutton" style="font-size:0.2rem;" @click="handleEdit(scope.$index, scope.row)">编辑</el-button></el-col>
                      <el-col  <el:xs="4" :sm="8" :md="8" :lg="8" :xl="8"><el-button size="mini"  type="primary"  class="userListbutton" style="font-size:0.2rem;" @click="handlelook(scope.$index, scope.row)">查看</el-button></el-col>          -->
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
        <!-- 新增对话框 -->
        <el-dialog :title="titleMsg" :visible.sync="dialogaddVisible" width="450px" >
           <el-form  style="margin-left:-8%" ref='form'>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="卡号" :label-width="formLabelWidth" >
                            <el-input v-model="cardNumber" class="addStyle" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMend">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
let reg=/^\d{11}$/;
export default {
   data(){
       return{
           tableData:[],
           total:0,
           current_page:1,
           page_size:10,
           cardNumber:'',
           dialogaddVisible:false,
           titleMsg:'',
           formLabelWidth: '120px',
       }
   },
   methods:{
       lookfor(){//查询

       },

       handleCharge(index,row){ //解绑
          let vm=this;
          vm.$ajax({
                    method:'put',
                    url:'/api/card/son/user',
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                        phone:row.phone
                    }
                }).then(res => {
                   if(res.data.code==200){
                        this.$message({
                        type: 'success',
                        message: '解绑成功'
                     })
                     this.query();
                   }else{
                        this.$message({
                          type: 'warning',
                          message: res.data.message
                            })    
                   }
                })
       },
       handleCard(){//注册用户
         this.titleMsg='注册用户'
         this.dialogaddVisible=true;
       },
       addMend(){//注册和绑定用户的确认按钮
       if(this.titleMsg=='注册用户'){
        if(reg.test(this.cardNumber)){
          let vm=this;
          vm.$ajax({
                    method:'post',
                    url:'/api/card/son',
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                        id:this.$route.query.id,
                        phone:vm.cardNumber
                    }
                }).then(res => {
                   if(res.data.code==200){
                    this.dialogaddVisible=false;
                        this.$message({
                        type: 'success',
                        message: '注册成功'
                     })                  
                     this.query();                 
                     this.cardNumber='';//清空
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
       }else{
            if(reg.test(this.cardNumber)){
           let vm=this;
           vm.$ajax({
                    method:'post',
                    url:'/api/card/user',
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                        id:this.$route.query.id,
                        phone:vm.cardNumber
                    }
                }).then(res => {
                    if(res.data.code==200){
                     this.dialogaddVisible=false;
                        this.$message({
                        type: 'success',
                        message: '绑定成功'
                     })
                     this.query();         
                     this.cardNumber='';//清空
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
          
       }
        
         
       },
       handleAdd(){//绑定已有用户
          this.titleMsg='绑定用户'
         this.dialogaddVisible=true;
       },
       Goback(){
          this.$router.push({path:'./shuakaUser'})
       },
       //当前页显示条数改变触发
       handleSizeChange(value){
        this.page_size=value;   
        let vm=this;
        vm.$ajax({
                    method:'get',
                    url:'/api/card/son/'+this.$route.query.id,
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
       //当前页改变触发
       handleCurrentChange(value){
        this.current_page=value;   
        let vm=this;
        vm.$ajax({
                    method:'get',
                    url:'/api/card/son/'+this.$route.query.id,
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
                    url:'/api/card/son/'+this.$route.query.id,
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
       this.query();
   }
}
</script>

<style>

</style>
