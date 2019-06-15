<template>
    <div>
        <el-row class="search" style="margin-top:0;width:98.2%">
            <el-col :span="16" style="position:relative">
                <span style="font-size:18px;">消费记录</span>
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
            <el-col :span="2" style="right:0;position:absolute;">
                <el-button type="infor" class="add" @click="Goback">返回</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="用户姓名">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column prop="MonthCost" label="月消费上限(元)">
            </el-table-column>
            <el-table-column prop="cost" label="消费金额(元)">
            </el-table-column>
            <el-table-column prop="balance" label="可消费余额(元)">
            </el-table-column>
            <el-table-column prop="ctime" label="消费时间">
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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                siteName:'',
                tableData:[],
                // 查询model
                username:'',
                phone:'',
                // 分页
                current_page: 1,
                
                total:0,
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
            query () {   // 查询
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
                    }
                })
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
                    }
                })
            },
            //返回集团列表
            Goback(){
                let vm = this
                vm.$router.go(-1)
            }
        },
    }
</script>