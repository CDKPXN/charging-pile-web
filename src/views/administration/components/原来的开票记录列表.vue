<template>
    <div style="position:relative">
         <!-- 查询方式 -->
        <el-row class="search"  style="width:96%">
            <el-col :span="7" style="width:435px">
                <el-date-picker
                    v-model="beginEndTime"
                    @change="changeDate"
                    type="datetimerange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss" 
                    format="yyyy-MM-dd HH:mm:ss" 
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="query" @click="query">查询</el-button>
            </el-col>
        </el-row>
        <!-- 数据表 -->
        <el-table :data="tableData">
            <el-table-column  prop="gfmc" label="购方名称">
            </el-table-column>
            <el-table-column  prop="spmc" label="商品名称">
            </el-table-column>
            <el-table-column  prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="djhm" label="发票单据号码">
            </el-table-column>
            <el-table-column prop="count" label="子单据数">
            </el-table-column>
            <el-table-column  prop="hjje" label="合计金额">
            </el-table-column>
            <el-table-column  prop="hjse" label="合计税额">
            </el-table-column>
            <el-table-column  prop="jshj" label="价税合计">
            </el-table-column>
            <el-table-column  prop="ctime" label="发票申请时间">
            </el-table-column>
            <el-table-column label="发票状态">
                <template slot-scope="scope">
                    <div slot="reference" >
                        <span v-if="scope.row.status==1">待开票</span>
                        <span v-else>己开票</span>
                    </div>
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
    </div>
</template>

<script>
export default {
     name: 'detailPaid',
        data(){
            return{
                tableData:[],
                // 分页
                total:0,
                current_page:1,
                page_size:0,
                beginEndTime:'',
                beginTime:'',
                endTime:'',
            }
        },
        methods:{
            //开票记录查询
            query(){
                let vm = this 
                if(vm.beginEndTime != ''){
                    vm.beginTime = vm.beginEndTime[0]
                    vm.endTime = vm.beginEndTime[0]
                }
                vm.$ajax({
                    method:'get',
                    url:'/api/invoice',
                    headers:{"token":sessionStorage.getItem('token')},
                    params:{
                        beginTime:vm.beginTime,
                        endTime:vm.endTime
                    }
                }).then(res => {
                    if(res.data.code == 200){
                        console.log(res.data.data.list)
                        vm.tableData = res.data.data.list.slice(0,10)
                        vm.total = res.data.data.total
                    }
                })
            },
            //数据刷选
            changeDate(){
                if(this.beginEndTime === '' || this.beginEndTime == null){
                    this.query()
                }
            },
            //分页
            handleSizeChange(val){
                let vm = this
                if(vm.beginEndTime != ''){
                    vm.beginTime = vm.beginEndTime[0]
                    vm.endTime = vm.beginEndTime[0]
                }
                vm.page_size=val 
                vm.tableData=[]
                vm.$ajax({
                    method:'get',
                    url:'/api/invoice',
                    headers:{"token":sessionStorage.getItem('token')},
                    params:{
                        beginTime:vm.beginTime,
                        endTime:vm.endTime
                    }
                }).then(res=>{
                    if(res.data.code == 200){
                        console.log(res.data.data.list)
                        vm.tableData = res.data.data.list.slice(0,10)
                        vm.total = res.data.data.total
                    }
                })
            },
            handleCurrentChange(val){
                let vm = this
                if(vm.beginEndTime != ''){
                    vm.beginTime = vm.beginEndTime[0]
                    vm.endTime = vm.beginEndTime[0]
                }
                let size = vm.page_size==0?'10':vm.page_size
                vm.tableData = []
                this.$ajax({
                    method:'get',
                    url:'/api/invoice',
                    headers:{"token":sessionStorage.getItem('token')},
                    params:{
                        beginTime:vm.beginTime,
                        endTime:vm.endTime
                    }
                }).then(res=>{
                    if(res.data.code == 200){
                        console.log(res.data.data.list)
                        vm.tableData = res.data.data.list.slice(0,10)
                        vm.total = res.data.data.total
                    }
                })
            }
        },
        created () {
            this.query()
        },
}
</script>

<style>

</style>
