<template>
  <div class="main">    
    <el-card>
        <span class="listTitle">站点列表</span>
        <el-row class="search" style="width:98.5%;">
            <el-col :span="4" class="colStyle">
                <el-input v-model="siteName" class="inputStyle" @change="retoreName" placeholder="充电站名" clearable></el-input>
            </el-col>
            <el-col :span="4" class="colStyle">
                <el-input v-model="siteAdd" class="inputStyle" @change="retoreAdd" placeholder="充电站地址" clearable></el-input>
            </el-col>
            <el-col :span="4" class="colStyle">
                <el-input v-model="siteCount" class="inputStyle" @change="retoreCount" placeholder="电桩总数" clearable></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" class="query" @click="query">查询</el-button>
            </el-col>
            <el-col :span="3">
                <el-button class="add" @click="openAdd"  style="position:absolute;right:0%" type="primary" v-if="auth.isAdmin()">新增站点</el-button>
            </el-col>
        </el-row>
        <!-- 站点查询列表表格 -->
        <el-row style="width:96%;">
            <ControlList :table-data="data"></ControlList>  
        </el-row>
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
    </el-card>
  </div>
</template>

<script>
    import ControlList from './components/controlList'

    export default {
        components:{
            ControlList
        },
        data () {
            return {
                data:[],
                siteName:'',
                siteAdd:'',
                siteCount:'',
                isTrue:true,
                //分页
                current_page: 1,  //当前页
                page_size: 10,   //每页显示多少条数据
                total:0,  //根据数据分页显示

            }
        },
        methods:{
            query(){
                let vm=this
                vm.$ajax({
                    method:'get',
                    url:"/api/site/list?page=1&size=1000",
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.siteName,
                        addr:vm.siteAdd,
                        total:vm.siteCount
                    }
                }).then(res=>{
                    if(res.data.code==200){
                        // let detailsAddr = ''
                        // console.log('data',res.data.data.list)
                        vm.data = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                        // for(var i = 0 ; i <  vm.tableData.length ; i++){
                        //     detailsAddr = vm.tableData[i].province + vm.tableData[i].city + vm.tableData[i].district + vm.tableData[i].addr
                        //     vm.$set(vm.tableData[i],'addr',detailsAddr)
                        // }
                        vm.total = res.data.data.list.length           
                        vm.loading = false
                    }
                })
            },
            retoreName(){
                if(this.siteName==''){
                    this.query()
                }
            },
            retoreAdd(){
                if(this.siteAdd==''){
                    this.query()
                }
            },
            retoreCount(){
                if(this.siteCount==''){
                    this.query()
                }
            },
            //新增站点
            openAdd(){
                let titlemsg = 0
                let sitedate = 0
                this.$router.push({path:'./addCharge',query:{titlemsg:titlemsg,sitedate:sitedate}})
            },
            handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                 let vm = this
                 vm.loading = true
                 vm.page_size = val
                 vm.data = []
                 vm.$ajax({
                    method:'get',
                    url:'/api/site/list?page=1&size='+vm.page_size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.siteName,
                        addr:vm.siteAdd,
                        total:vm.siteCount
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
                vm.data = []
                vm.$ajax({
                    method:'get',
                    url:'/api/site/list?page='+val+'&size='+size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        name:vm.siteName,
                        addr:vm.siteAdd,
                        total:vm.siteCount
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.data = res.data.data.list
                        vm.loading = false
                    }
                })
            },
        },
        created(){
    
            this.query()
        }
    }
</script>

<style scoped>
  
</style>