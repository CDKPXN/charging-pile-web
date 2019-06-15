<template>
<!-- 充值订单 -->
    <div class="main">
         <el-card class="box-card">
            <div style="margin-left:20px;">
                <el-row  style="width:96%">
                    <el-col :span="4" class="colStyle">
                        <el-select v-model="aid" class="inputStyle" placeholder="活动类型">
                            <el-option key="1" label="注册" value="1"></el-option>
                            <el-option key="2" label="充值" value="2"></el-option>
                            <el-option key="3" label="推荐" value="3"></el-option>
                        </el-select>
                    </el-col>    
                    <el-col :span="4" class="colStyle">
                        <el-select v-model="status" class="inputStyle" placeholder="红包状态">
                            <el-option key="1" label="未使用" value="1"></el-option>
                            <el-option key="2" label="已使用" value="2"></el-option>
                            <el-option key="3" label="已过期" value="3"></el-option>
                            <el-option key="4" label="已绑定" value="4"></el-option>
                        </el-select>
                    </el-col>
                    <!-- <el-col :span="7" style="width:435px;">
                        <el-date-picker
                            v-model="DateTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss" 
                            @change="changeDate"
                            type="datetimerange"
                            range-separator="至"
                            clearable
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col> -->
                    <el-col :span="5">
                        <el-button type="primary" class="query" @click="query">查询</el-button>
                    </el-col>
                </el-row>
                <el-table :data="tableData" style="width: 100%;margin:30px 0 0 -20px">
                        <el-table-column  label="活动类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.aid == '1'">注册</span>
                                <span v-if="scope.row.aid == '2'">充值</span>
                                <span v-if="scope.row.aid == '3'">推荐</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="amount" label="红包金额(元)">
                        </el-table-column>
                        <el-table-column prop="ctime" label="创建时间">
                        </el-table-column>
                        <el-table-column prop="uptime" label="使用时间">
                        </el-table-column>
                        <el-table-column prop="expire" label="过期时间">
                        </el-table-column>
                        <el-table-column  label="红包状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status == '1'">未使用</span>
                                <span v-if="scope.row.status == '2'">已使用</span>
                                <span v-if="scope.row.status == '3'">已过期</span>
                                <span v-if="scope.row.status == '4'">已绑定</span>
                            </template>
                        </el-table-column>
                </el-table>
            </div>
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
export default {
    data(){
        return{
            aid:'',
            status:'',
            DateTime:'',
            tableData:[],
            // 分页
            current_page:1,
            total:0,
            page_size:0,
        }
    },
    created(){
        this.query()
    },
    methods:{
        changeDate(){
            if(this.DateTime === '' || this.DateTime == null){
                this.query()
            }
        },
        changeQuery(){
            this.query()
        },
        query () {
            let vm = this
            let beginTime = ''
            let endTime = ''
            let mode = null
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            vm.$ajax({
                method:'get',
                url:'/api/redpacket',
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    aid:vm.aid,
                    status:vm.status
                }
            }).then(res=>{
                if(res.data.code==200){
                    console.log(res.data.data)
                    vm.tableData = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.tableData.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100))

                        if(item.expire == null) item.expire = '--'
                        
                        if(item.uptime == null) item.uptime = '--'
                    })
                   vm.total = res.data.data.list.length
                }
            })
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
            let vm = this
            vm.page_size = val
            vm.tableData = []
            vm.$ajax({
                method:'get',
                url:'/api/redpacket?page=1&size='+vm.page_size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    aid:vm.aid,
                    status:vm.status
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.tableData = res.data.data.list
                    vm.tableData.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100))

                        if(item.expire == null) item.expire = '--'
                        
                        if(item.uptime == null) item.uptime = '--'
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
                url:'/api/redpacket?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    aid:vm.aid,
                    status:vm.status
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.tableData = res.data.data.list
                    vm.tableData.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100))

                        if(item.expire == null) item.expire = '--'
                        
                        if(item.uptime == null) item.uptime = '--'
                    })
                }
            })
        },
    }
}
</script>
