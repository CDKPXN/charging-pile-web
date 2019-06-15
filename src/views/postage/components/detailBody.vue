<!-- 应收 -->
<template>
    <div style="position:relative">
        <!-- 查询方式 -->
        <el-row class="search"  style="width:96%">
            <el-col :span="4" class="colStyle">
                <el-select v-model="mode" placeholder="充值方式" class="inputStyle" clearable @change="changeQuery">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>  
            </el-col>
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
        <el-table :data="tableData" style="width:70%">
            <el-table-column  prop="name" label="用户名称" width="150px">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="150px">
            </el-table-column>
            <el-table-column prop="amount" label="充值金额(元)">
            </el-table-column>
            <el-table-column prop="ctime" label="充值时间" width="200px">
            </el-table-column>
            <el-table-column label="对账金额(元)">
                <template slot-scope="scope">
                    <div slot="reference" >
                        <span v-if="scope.row.pay==null">未对账</span>
                        <span v-else>{{scope.row.pay}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="充值方式">
                <template slot-scope="scope">
                    <div slot="reference" >
                        <span v-if="scope.row.mode==1">银联</span>
                        <span v-if="scope.row.mode==2">微信</span>
                        <span v-if="scope.row.mode==3">支付宝</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="充值状态">
                <template slot-scope="scope">
                    <div slot="reference" >
                        <span v-if="scope.row.status==1">充值中</span>
                        <span v-if="scope.row.status==2">充值完成</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 应收汇总 -->
        <el-card shadow="always" class="content box-card">
            <el-row v-if="loadOver">
                <el-col :span='24'>
                    <el-row>
                        <el-col :span='24'>
                            <span style="display:inline-block;width:100%">{{Btime}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='24'>
                            <span>至</span>
                        </el-col>    
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <span style="display:inline-block;width:100%">{{Etime}}</span>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:8%">
                        <el-col :span="8">
                            <img src="../../../../static/img/money.png" style="width:50px;height:50px;float:left;margin-right:30px;" alt="汇总图片">
                        </el-col>
                        <el-col :span="12" class="summary">
                            <div style="width:150px;">
                                <p style="font-size:24px;">{{summary}}</p>
                                <p >应收汇总（元)</p>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row v-if="!loadOver">
              <el-col :span="24">
                  <i class="fa fa-spinner fa-pulse loading"></i>
              </el-col>
            </el-row>
        </el-card>
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
                :page-sizes="[10, 20, 50]"
                :page-size="10"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detailBody',
        data(){
            return{
                tableData:[],
                // 分页
                total:0,
                current_page:1,
                page_size:0,
                //汇总
                summary:0,  
                Btime:'',
                Etime:'',
                loadOver:false,
                //支付方式
                mode:'',  
                options: [
                    {
                        value: '1',
                        label: '银联'
                    },
                    {
                        value: '2',
                        label: '微信'
                    },
                    {
                        value: '3',
                        label: '支付宝'
                    }
                ],
                beginEndTime:'',
            }
        },
        methods:{
            //数据查询
            query(){
                let vm = this 
                let beginTime = ''
                let endTime = ''
                let mode = null
                if(vm.mode != ''){
                    mode = vm.mode
                }
                if(vm.beginEndTime != null){
                    beginTime = vm.beginEndTime[0]
                    endTime = vm.beginEndTime[1]
                }     
                vm.$ajax({
                    method:'get',
                    url:'/api/rechargeOrder/receivable?page=1&size=1000',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        mode:mode,
                        beginTime:beginTime,
                        endTime:endTime
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.loadOver = true
                        vm.tableData=res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                        res.data.data.list.map(item =>{
                            item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                            if(item.pay != null){
                                item.pay = (parseFloat((item.pay) / 100)).toFixed(2)
                            }
                        })
                        vm.total=res.data.data.list.length
                        vm.summary = 0
                        for(var i=0; i<res.data.data.list.length; i++){
                            if(res.data.data.list[i].pay != null){
                                vm.summary = vm.summary+parseFloat(res.data.data.list[i].pay)
                            }
                        }
                        vm.summary = vm.summary.toFixed(2)
                    }
                })
            },
            //数据刷选
            changeDate(){
                if(this.beginEndTime === '' || this.beginEndTime == null){
                    this.query()
                }
            },
            changeQuery(){
                this.query()
            },
            //分页
            handleSizeChange(val){
                let vm = this
                let beginTime = ''
                let endTime = ''
                let mode = null
                if(vm.mode != '' && vm.mode != 0){
                    mode = vm.mode
                }
                if(vm.beginEndTime != null){
                    beginTime = vm.beginEndTime[0]
                    endTime = vm.beginEndTime[1]
                } 
                vm.page_size=val 
                vm.tableData=[]
                vm.$ajax({
                    method:'get',
                    url:'/api/rechargeOrder/receivable?page=1&size='+vm.page_size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        mode:mode,
                        beginTime:beginTime,
                        endTime:endTime
                    }
                }).then(res=>{
                    vm.tableData=res.data.data.list
                    vm.tableData.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                        if(item.pay != null){
                            item.pay = (parseFloat((item.pay) / 100)).toFixed(2)
                        }
                    })
                })
            },
            handleCurrentChange(val){
                let vm = this
                let beginTime = ''
                let endTime = ''
                let mode = null
                if(vm.mode != '' && vm.mode != 0){
                    mode = vm.mode
                }
                if(vm.beginEndTime != null){
                    beginTime = vm.beginEndTime[0]
                    endTime = vm.beginEndTime[1]
                } 
                let size = vm.page_size==0?'10':vm.page_size
                vm.tableData = []
                this.$ajax({
                    method:'get',
                    url:'/api/rechargeOrder/receivable?page='+val+'&size='+size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        mode:mode,
                        beginTime:beginTime,
                        endTime:endTime
                    }
                }).then(res=>{
                    vm.tableData = res.data.data.list
                    vm.tableData.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                        if(item.pay != null){
                            item.pay = (parseFloat((item.pay) / 100)).toFixed(2)
                        }
                    })
                })
            }
        },
        // 获取最早日期和最晚日期
        beforeCreate(){
            let vm = this
            vm.$ajax({
                method:'get',
                url:'/api/rechargeOrder/receivable',
                headers:{'token':sessionStorage.getItem('token')},
            })
            .then(res=>{
                if(res.data.code==200){
                    let date = []
                    for(var i =0; i<res.data.data.list.length; i++){
                        date.push(res.data.data.list[i].ctime)
                    }
                    vm.Btime = date.pop()
                    vm.Etime = date[0]
                }
            })
        },
        created () {
            this.query()
        },
    }
</script>
<style scoped>
    .loading{
        left:50%;
        top:45px;
        margin-left: -25px;
    }
</style>