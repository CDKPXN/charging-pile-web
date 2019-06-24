<template>
    <div>
        <i class="fa fa-spinner fa-pulse loading" v-if="loading"></i>
         <el-row class="search" style="width:98.2%">
            <el-col :span="4" class="colStyle">
                <el-input placeholder="集团名称" v-model="groupName" class="inputStyle" @change="restore" clearable></el-input> 
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="query" @click="query">查询</el-button>
            </el-col>
            <el-col :span="2" style="right:0;position:absolute;">
                <el-button type="primary" class="add" @click="handleAdd()">增加集团</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="集团名称" width="300px">
            </el-table-column>
            <el-table-column prop="discount" label="集团折扣">
            </el-table-column>
            <el-table-column prop="count" label="集团人数">
            </el-table-column>
            <el-table-column prop="remarks" label="备注">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" >
                <el-button size="mini" type="primary" @click="lookData(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增 和 编辑集团信息对话框 -->
        <el-dialog :title="titleMsg" :visible.sync="dialogFormVisible" width="450px" @close="close('form')">
            <el-form :model="form" style="margin-left:-8%" ref="form" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="集团名称" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="集团折扣" :label-width="formLabelWidth" prop="discount">
                            <el-input v-model="form.discount"  type="number" class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="集团备注" :label-width="formLabelWidth" prop="remarks">
                            <el-input v-model="form.remarks"  class="addStyle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer"  class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="subMessage()">确 认</el-button>
            </div>
        </el-dialog>
        <!-- 分页 -->
        <!-- <hr> -->
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
    </div>
</template>

<script>
    export default {
        name: 'EvaluateList',
        data () {
            var addName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('集团名称不能为空'))
                }
            }
            var addDiscount = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('集团折扣不能为空'))
                }
            }
            var addRemarks = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('集团备注不能为空'))
                }
            }
            return {
                loading:true,
                titleMsg:'',
                dialogFormVisible:false,
                formLabelWidth: '120px',
                groupName:'',
                form: {
                    name: '',
                    discount:'',
                    remarks:'',
                    addName:'',
                    addDiscount:'',
                    addNote:'',
                    userName:'',
                    userPhone:'',
                    id:''
                },
                tableData:[],
                current_page: 1,
                page_size: 10,
                total:0,
                rules:{
                    name:[
                        {validator:addName,trigger:'blur'}
                    ],
                    discount:[
                        {validator:addDiscount,trigger:'blur'}
                    ],
                    remarks:[
                        {validator:addRemarks,trigger:'blur'}
                    ]
                }
            }
        },
        watch:{
            page_size (val) {
                this.clg(val)
            }
        },
        created () {
            this.query()
        },
        methods:{
            //还原数据
            restore(){
                if(this.groupName==''){
                    this.query()
                }
            },
            query () {   // 查询
                let vm = this
                vm.loading = true
                vm.tableData = []
                vm.$ajax({
                    method:'get',
                    url:'/api/bloc/list?page=1&size=1000',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.groupName
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        console.log(res.data.data.list)
                        vm.tableData = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                        vm.total = res.data.data.list.length
                        vm.loading = false
                    }
                })
            },
            handleEdit(row,$event){  // 编辑集团
                this.titleMsg="修改集团信息"
                this.dialogFormVisible=true  
                this.form.name=$event.name
                this.form.discount=$event.discount
                this.form.remarks=$event.remarks
                this.form.id=$event.id
                this.static_modal=''
            }, 
            handleAdd () {     // 新增集团
                this.dialogFormVisible=true  
                this.titleMsg="新增集团信息"
                this.form.name=''
                this.form.discount=''
                this.form.remarks=''
                this.form.id=''
                this.static_modal='add'
            },
            Verification () {  // 验证数据
                let vm = this
                if(vm.form.name=='' || vm.form.discount=='' || vm.form.remarks==''){
                     vm.$message({
                        type:'warning',
                        message:"请完善参数"
                    })
                }else{
                    return true
                }
            },
            addGroup () {   // 发送添加集团的数据
                let vm = this
                if(vm.Verification()){
                    vm.$ajax({
                        method:'POST',
                        url:'/api/bloc',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            name: vm.form.name,
                            discount: vm.form.discount,
                            remarks: vm.form.remarks,
                        }
                    })
                    .then(res=>{
                        if(res.data.code==200){
                            vm.static_modal = ''
                            vm.$message({
                                type:'success',
                                message:"新增成功"
                            })
                            vm.dialogFormVisible=false;
                            vm.query()
                        }else{
                            vm.static_modal = ''
                        }
                    })
                }
            },
            detailes () {  // 发送修改集团的数据
                let vm = this
                if(vm.form.name=='' || vm.form.discount=='' || vm.form.remarks==''){
                    return false;
                }else{
                    vm.$ajax({
                        method:'put',
                        url:'/api/bloc',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            name: vm.form.name,
                            discount: vm.form.discount,
                            remarks: vm.form.remarks,
                            id: vm.form.id
                        }
                    })
                    .then(res=>{
                        if(res.data.code==200){
                            vm.$message({
                                type:'success',
                                message:"修改成功"
                            })
                            vm.dialogFormVisible=false;
                            vm.query()
                        }
                    })
                }
            },
            subMessage(){  // 判断是 修改 还是 新增集团
                let vm = this
                if(vm.static_modal == 'add'){
                    vm.addGroup()
                }else{
                    vm.detailes()
                } 
            },
            handleDelete(index,row){ //删除集团信息
                this.$confirm('此操作将永久删除该集团和集团下存在的用户, 是否继续?', '确认信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let id = row.id
                    this.$ajax({
                        method:'delete',
                        url:'/api/bloc/'+id,
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            id:id
                        }
                    }).then(res => {
                        if(res.data.code == 200){
                            this.query()
                        }
                    })
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
                 vm.loading = true
                 vm.page_size = val
                 vm.tableData = []
                 vm.$ajax({
                    method:'get',
                    url:'/api/bloc/list?page=1&size='+vm.page_size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.groupName
                    }
                 })
                 .then(res=>{
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list
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
                    url:'/api/bloc/list?page='+val+'&size='+size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.groupName
                    }
                 })
                 .then(res=>{
                    if(res.data.code==200){
                        vm.tableData = res.data.data.list
                        vm.loading = false
                    }
                })
            },
            //查看详情
            lookData(index,row){
                let id = row.id
                let siteName = row.name
                this.$router.push({path:'./registered',query:{id:id,siteName:siteName}})
            },
            close(formName){
                let vm = this
                vm.$refs[formName].resetFields()
            }
        },
    }
</script>