<!-- 电站列表统计 -->
<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="电站名称" width="220px">
            </el-table-column>
            <el-table-column
                prop="income"
                label="充电收入（元）" width="130px">
            </el-table-column>
            <el-table-column
                prop="electricQuantity"
                label="充电电量（kwh）" width="150px">
            </el-table-column>
            <el-table-column
                prop="useDuration"
                label="充电时长" width="150px">
            </el-table-column>
            <el-table-column
                prop="useTimes"
                label="充电次数" width="90px">
            </el-table-column>
                <el-table-column
                prop="fault"
                label="故障数">
            </el-table-column>
            <el-table-column
                prop="comment"
                label="评论平均分" width="100px">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    name:'SiteList',
    data(){
        return{
            tableData:[],
            //分页
            current_page:1,
            total:0,
            page_size:0,
        }
    },
    methods:{
        //电站列表
        siteList(){     
            let vm = this
            vm.$ajax({
                method:'get',
                url:'/api/sitesstatistics/sitestable?page=1&size=1000',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    vm.tableData = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.total = res.data.data.list.length
                    vm.tableData.map(item => {
                        item.income = (item.income / 100).toFixed(2)
                        var Hours = parseInt(item.useDuration / 3600)
                        var Minutes = parseInt(parseInt(item.useDuration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.useDuration % 3600) % 60)
                        item.useDuration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                }
            })
        },
        //查看详情
        handleClick(row){
            this.$router.push({path:'/siteDetails',query:{id:row.siteId}})
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
            let vm = this
            vm.page_size = val
            vm.tableData = []
            vm.$ajax({
                method:'get',
                url:'/api/sitesstatistics/sitestable?page=1&size='+vm.page_size,
                headers:{'token':sessionStorage.getItem('token')}
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.tableData = res.data.data.list;
                    vm.tableData.map(item => {
                        item.income = (item.income / 100).toFixed(2)
                        var Hours = parseInt(item.useDuration / 3600)
                        var Minutes = parseInt(parseInt(item.useDuration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.useDuration % 3600) % 60)
                        item.useDuration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
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
                url:'/api/sitesstatistics/sitestable?page='+val+'size='+vm.page_size,
                headers:{'token':sessionStorage.getItem('token')}
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.tableData = res.data.data.list;
                    vm.tableData.map(item => {
                        item.income = (item.income / 100).toFixed(2)
                        var Hours = parseInt(item.useDuration / 3600)
                        var Minutes = parseInt(parseInt(item.useDuration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.useDuration % 3600) % 60)
                        item.useDuration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                }
            })
        },
    },
    created(){
        this.siteList()
    },
}
</script>