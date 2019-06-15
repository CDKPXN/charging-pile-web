<template>
    <div>
        <el-row>
            <el-table :data="chargTable">
                <el-table-column prop="username" label="用户名称" width="145">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码" width="145">
                </el-table-column>
                <el-table-column prop="sitename" label="电站名称" width="190">
                </el-table-column>
                <el-table-column prop="cost" label="充电消费(元)" width="140">
                </el-table-column>
                <el-table-column prop="cprice" label="电费(元)" width="120">
                </el-table-column>
                <el-table-column prop="sprice" label="服务费(元)" width="120">
                </el-table-column>
                <el-table-column prop="parking_fee" label="停车费(元)" width="120">
                </el-table-column>
                <el-table-column prop="duration" width="170" label="持续充电时间">
                </el-table-column>
                <el-table-column prop="begin_time" width="200" label="开始时间">
                </el-table-column>
                <el-table-column prop="electric_quantity" width="100" label="充电电量">
                </el-table-column>
                <el-table-column prop="status" label="充电状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待支付</span>
                        <span v-if="scope.row.status==1">充电中</span>
                        <span v-if="scope.row.status==2">支付成功</span>
                        <span v-if="scope.row.status==3">已完成</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 分页 -->
        <div class="paTotal">
            <span>共&nbsp;{{total}}&nbsp;结果</span>
        </div>
        <div class="block" style="margin-left:10%;">
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
    name:'SiteChargList',
    data(){
        return{
            chargTable:[],
            sitename:'',
            // 分页
            total:0,
            page_size:0,
            current_page:1,
        }
    },
    methods:{
        //获取当前站点的充电记录
        getCharg(){
            let vm = this
            vm.$ajax({
                method:"get",
                url:'api/charging/order/list?page=1&size=1000',
                headers:{"token":sessionStorage.getItem('token')},
                params:{
                    sitename:this.sitename
                }
            }).then(res => {
                if(res.data.code == 200){
                    vm.chargTable=res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.total=res.data.data.list.length
                    vm.chargTable.map(item =>{
                        item.cost = (parseFloat((item.cost) / 100)).toFixed(2)
                        item.cprice = (parseFloat((item.cprice) / 100)).toFixed(2)
                        item.sprice =(parseFloat((item.sprice) / 100)).toFixed(2)
                        item.parking_fee =(parseFloat((item.parking_fee) / 100)).toFixed(2)
                        var Hours = parseInt(item.duration / 3600)
                        var Minutes = parseInt(parseInt(item.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.duration % 3600) % 60)
                        item.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                }
            })
        },
        //分页
        handleSizeChange(val){
            let vm = this
            vm.page_size = val
            vm.chargTable = []
            vm.$ajax({
                method:'get',
                url:'api/charging/order/list?page=1&size='+val,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    sitename:this.sitename
                }
            }).then(res=>{
                if(res.data.code){
                    vm.chargTable=res.data.data.list
                    vm.chargTable.map(item =>{
                        item.cost = (parseFloat((item.cost) / 100)).toFixed(2)
                        item.cprice = (parseFloat((item.cprice) / 100)).toFixed(2)
                        item.sprice = (parseFloat((item.sprice) / 100)).toFixed(2)
                        item.parking_fee =(parseFloat((item.parking_fee) / 100)).toFixed(2)
                        var Hours = parseInt(item.duration / 3600)
                        var Minutes = parseInt(parseInt(item.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.duration % 3600) % 60)
                        item.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                }
            })
        },
        handleCurrentChange(val){
            let vm = this
            let size = vm.page_size==0?'10':vm.page_size
            vm.chargTable = []
            vm.$ajax({
                method:'get',
                url:'api/charging/order/list?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    sitename:this.sitename
                }
            }).then(res=>{
                if(res.data.code){
                    vm.chargTable=res.data.data.list
                    vm.chargTable.map(item =>{
                        item.cost = (parseFloat((item.cost) / 100)).toFixed(2)
                        item.cprice = (parseFloat((item.cprice) / 100)).toFixed(2)
                        item.sprice = (parseFloat((item.sprice) / 100)).toFixed(2)
                        item.parking_fee =(parseFloat((item.parking_fee) / 100)).toFixed(2)
                        var Hours = parseInt(item.duration / 3600)
                        var Minutes = parseInt(parseInt(item.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.duration % 3600) % 60)
                        item.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                }
            })
        },
    },
    created(){
        this.sitename = this.$route.query.name
        this.getCharg()        
    }
}
</script>