<template>
    <div  class="main">
        <el-row>
            <el-col :span="16" style="position:relative">
                <span style="font-size:18px;">业主详情</span>
                <el-button type="infor" @click="goBlack" style="position:absolute;right:0">返回</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" class="ownerContent">
                <p style="font-size:18px;">基本信息</p>
                <p>登录账户：{{this.userDetail.username}}</p>
                <p>业主名称：{{this.userDetail.name}}</p>
                <p>手机号码：{{this.userDetail.phone}}</p>
                <p>所关联充电站数：{{this.total}}</p>
            </el-col>
        </el-row>
        <el-row style="margin:20px 0">
            <el-col :span="16" style="position:relative">
                <el-button type="primary" style="position:absolute;right:0%;" @click="BindPile">绑定电站</el-button>
            </el-col>
        </el-row>
        <div style="margin:50px 0 0 -20px;">
            <el-row>
                <el-col :span="16">
                    <el-table :data="tableData"   style="width: 100%">
                        <el-table-column prop="name" label="电站名称" width="300">
                        </el-table-column>
                        <el-table-column prop="addr" label="电站地址">
                        </el-table-column>
                        <el-table-column prop="total" label="电桩总数" width="130">
                        </el-table-column>
                        <el-table-column prop="eprice" label="电费" width="130">
                        </el-table-column>
                        <el-table-column prop="sprice" label="服务费" width="130">
                        </el-table-column>
                        <el-table-column label="操作" width="130">
                            <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="Unbind(scope.$index, scope.row)">解绑</el-button>
                            </template>
                        </el-table-column>  
                    </el-table>
                </el-col>
            </el-row>
        </div>
         <el-dialog :title="titleMsg" :visible.sync="dialogFormVisible" width="450px">
           <el-form :model="form" style="margin-left:-4.5%">
               <el-row>
                    <el-col :span="12">
                        <el-form-item label="未绑定站点" :label-width="formLabelWidth">
                            <el-select v-model="form.sitename" class="addStyle" auto-complete="off" placeholder="请选择需要绑定的电站名">
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
                <el-button type="primary" @click="BindY">确 认</el-button>
            </div>
        </el-dialog>
        <!-- 分页 -->
        <div style="margin-left:-20px">
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
    </div>
</template>
<script>
// import { api_detailOwner } from '../../api/index.js'
export default {
    data(){
        return{
            tableData:[],
            userDetail:[],
            titleMsg:'',
            form: {
                sitename:'',
                options:[],
            },
            dialogFormVisible:false,
            formLabelWidth: '120px',
            page_size:0,
            total:0,
            current_page:1,
        }
    },
    methods:{
        //绑定站点查询
        query(){
            let vm = this
            let uid = vm.$route.query.uid
            vm.$ajax({
                method:'get',
                url:'/api/site/list?page=1&size=1000'+'&uid='+uid,
                headers:{'token':sessionStorage.getItem('token')},
            }).then(res => {
                vm.tableData = res.data.data.list.slice(0,vm.page_size == 0?'10':vm.page_size)
                 vm.tableData.map(item =>{
                    item.eprice = (parseFloat(item.eprice) / 100).toFixed(2)
                    item.sprice = (parseFloat(item.sprice) / 100).toFixed(2)
                })
                vm.total = res.data.data.list.length
            })
        },
        //返回业主页面
        goBlack(){
            this.$router.push('../../management')
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                let vm = this
                let uid = vm.$route.query.uid
                vm.page_size = val
                vm.tableData = []
                vm.$ajax({
                method:'get',
                url:'/api/site/list?page=1&size='+vm.page_size + '&uid=' + uid,
                headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                if(res.data.code==200){
                    vm.tableData = res.data.data.list
                }
            })
        },
        handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
            let vm = this
            let uid = vm.$route.query.uid
                let size = vm.page_size==0?'10':vm.page_size
                vm.tableData = []
                vm.$ajax({
                method:'get',
                url:'/api/site/list?page='+val+'&size='+size + '&uid=' + uid,
                headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                if(res.data.code==200){
                    vm.tableData = res.data.data.list
                }
            })
        },
        //绑定站点
        BindPile(){
            let vm = this
            vm.titleMsg = '绑定站定'
            vm.dialogFormVisible = true
            vm.$ajax({
                method:'get',
                url:'/api/site/list?uid=0',
                headers:{'token':sessionStorage.getItem('token')},
            }).then(res=>{
                if(res.data.code==200){
                    let arr = res.data.data.list
                    let num = -1
                    vm.form.options = []
                    for( var item of arr){
                        num++; 
                        vm.form.options.push({value:num,label:item.name,id:item.id})
                    }
                }
            })
        },
        BindY(){
            let vm = this 
            let sid = vm.form.options[vm.form.sitename].id
            let uid = vm.$route.query.uid
            vm.$ajax({
                method:'PUT',
                url:'/api/site',
                headers:{'token':sessionStorage.getItem('token')},
                data:{
                    uid:uid,
                    id:sid
                }
            }).then(res => {
                if(res.data.code == 200){
                    vm.$message({
                        type:'success',
                        message:'绑定成功'
                    })
                    vm.dialogFormVisible = false
                    vm.query()
                }
            })
        },
        //解绑
        Unbind(index,row){
            this.$confirm('确定解绑该站点?', '确认信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let vm = this 
                    let sid = row.id
                    vm.$ajax({
                        method:'PUT',
                        url:'/api/site',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            uid:"0",
                            id:sid
                        }
                    }).then(res => {
                        if(res.data.code == 200){
                            vm.query()
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
    },
    created(){
        let vm = this
        this.query()
        // let name = vm.$route.query.ownername
        let phone = vm.$route.query.phone
        vm.$ajax({
            method:'get',
            url:'/api/admin/list?page=1&size=1000' + '&phone=' + phone,
            headers:{'token':sessionStorage.getItem('token')},
        }).then(res=>{
            if(res.data.code==200){  
                vm.userDetail=res.data.data.list[0]
                console.log(vm.userDetail)
            }
        })
     
    }
}
</script>
<style scoped>
    .main{
        margin: 20px 0 0 30px;
    }
    .ownerContent{
        margin: 20px 0 0 0;
        padding: 0 0 0 20px;
        background-color:rgb(92, 175, 230);
        border-radius: 4px;
        height: auto;
        color:white;
        font-size: 14px
    }
</style>

