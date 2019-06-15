<template>
<!-- 充值订单 -->
    <div class="main">
         <el-card class="box-card">
            <div style="margin-left:20px;">
                <el-row  style="width:96%">    
                    <el-col :span="4" class="colStyle">
                         <el-input v-model="userphone" placeholder="手机号码" class="inputStyle" @change="retore" clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="4" class="colStyle">
                        <el-select v-model="mode" placeholder="充值类型" class="inputStyle" clearable @change="changeQuery">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>  
                    </el-col>    
                    <el-col :span="7" style="width:435px;">
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
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary" class="query" @click="query">查询</el-button>
                        <el-button class="add" type="primary" style="margin-left:10%" icon="document" @click="handleDownload" :loading="downloadLoading">导出报表</el-button>
                    </el-col>
                </el-row>
            </div>
            <recharge-list :table-data="data"></recharge-list>
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
import RechargeList from './components/rechargeList.vue'
export default {
    components:{
        RechargeList
    },
    data(){
        return{
            DateTime:'',
            userphone:'',
            mode:'',
            options:[{
                value:'1',
                label:'银联'
            },{
                value:'2',
                label:'微信'
            },{
                value:'3',
                label:'支付宝'
            },{
                value:'4',
                label:'卡片充值'
            },{
                value:'5',
                label:'退款'
            }],
            data:[],
            dataList:[],
            current_page:1,
            total:0,
            page_size:0,
            downloadLoading:false
        }
    },
    created(){
        this.query()
        console.log(sessionStorage.getItem('token'))
    },
    methods:{
        retore(){
            if(this.userphone === ''){
                this.query()
            }
        },
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
            if(vm.mode != ''){
                mode = vm.mode
            }
            vm.$ajax({
                method:'get',
                url:'/api/rechargeOrder/list?page=1&size=2000',
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    mode:mode,
                    phone:vm.userphone,
                    beginTime:beginTime,
                    endTime:endTime
                }
            }).then(res=>{
               if(res.data.code==200){
                    vm.data = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    console.log("充值列表：",vm.data)
                    vm.data.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                    })
                   vm.total = res.data.data.list.length
               }
            })
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
            let vm = this
            let beginTime = ''
            let mode = null
            let endTime = ''
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            if(vm.mode != ''){
                mode = vm.mode
            }
            vm.page_size = val
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/rechargeOrder/list?page=1&size='+vm.page_size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    mode:mode,
                    phone:vm.userphone,
                    beginTime:beginTime,
                    endTime:endTime
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.data = res.data.data.list
                    vm.data.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                    })
                }
            })
        },
        handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
            let vm = this
            let beginTime = ''
            let endTime = ''
            let mode = null
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            if(vm.mode != ''){
                mode = vm.mode
            }
            let size = vm.page_size==0?'10':vm.page_size
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/rechargeOrder/list?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    mode:mode,
                    phone:vm.userphone,
                    beginTime:beginTime,
                    endTime:endTime
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.data = res.data.data.list
                    vm.data.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                    })
                }
            })
        },
        //导出报表
        handleDownload() {
            let vm = this
            let beginTime = ''
            let endTime = ''
            let mode = null
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            if(vm.mode != ''){
                mode = vm.mode
            }
            this.$ajax({
                method:"get",
                url:'/api/rechargeOrder/list',
                headers:{"token":sessionStorage.getItem('token')},
                params:{
                    mode:mode,
                    phone:vm.userphone,
                    beginTime:beginTime,
                    endTime:endTime
                }
            }).then(res => {
                if(res.data.code == 200){
                    vm.dataList = res.data.data.list;
                    vm.dataList.map(item =>{
                        item.amount = (parseFloat((item.amount) / 100)).toFixed(2)
                        if(item.mode == 1){
                            item.mode = '银联'
                        }else if(item.mode == 2){
                            item.mode = '微信'
                        }else{
                            item.mode = '支付宝'
                        }
                        if(item.status ==  1){
                            item.status = '未支付'
                        }else if(item.status ==  2){
                            item.status = '已支付'
                        }else if(item.status ==  3){
                            item.status = '己退款'
                        }
                    })
                    this.downloadLoading = true;
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('../../vendor/Export2Excel.js');
                        const tHeader = ['用户名称', '手机号码', '充值金额(元)','充值类型','充值时间','充值完成时间','充值状态'];
                        const filterVal = ['name', 'phone', 'amount','mode','ctime','uptime','status'];
                        const list = this.dataList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '充值订单列表');
                        this.downloadLoading = false;
                    })
                }
            })
            
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>
