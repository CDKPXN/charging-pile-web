<template>
<!-- 充电订单 -->
    <div class="main">
         <el-card class="box-card">
            <div style="margin-left:20px;">
                <el-row  style="width:96%">                  
                    <el-col :span="4" class="colStyle">
                        <el-input v-model="phone" class="inputStyle" @change="retorePhone" placeholder="手机号码" clearable>
                        </el-input>
                    </el-col>   
                       <!-- 模糊用户搜索 --> 
                    <el-col :span="4" class="colStyle">                
                   <el-select v-model="userid" filterable placeholder="请输入业主名称" style="margin-right:40px" @change="filter" clearable v-if="auth.isAdmin()">
                     <el-option
                       v-for="item in mohudataList" 
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
                      </el-option>
                   </el-select>
                   </el-col> 
                    <el-col :span="4" class="colStyle">
                        <el-select v-model="zdid" filterable placeholder="请输入站点名称" style="margin-right:40px"   clearable>
                     <el-option
                       v-for="item in mohudataList2" 
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
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
            <charging-list :table-data="data"></charging-list>
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
        </el-card>
    </div>
</template>
<script>
import ChargingList from './components/chargingList.vue'
import url from '../../config/url.js'

export default {
    components:{
        ChargingList
    },
    data(){
        return{
            DateTime:'',
            siteName:'',
            phone:'',
            data:[],
            dataList:[],  //导出
            mohudataList:[],
            mohudataList2:[],
            userid:'',
            zdid:'',
            current_page:1,
            total:0,
            page_size:10,
            downloadLoading:false,
 
        }
    },
    methods:{
        retoreSiteName(){
            if(this.siteName==''){
                this.query()
            }
        },
        retorePhone(){
            if(this.phone==''){
                this.query()
            }
        },
        changeDate(){
            if(this.DateTime === '' || this.DateTime == null){
                this.query()
            }
        },
        //模糊用户搜索
            filtersmethoduser(){
                let vm = this;
             this.$ajax({
                method:'get',
                url:'/api/admin/list',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    vm.mohudataList=res.data.data.list
                  
                }
            })
        },
        
         //模糊搜索站点
            filtersmethod(){
             this.$ajax({
                method:'get',
                url:'/api/site/list',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    this.mohudataList2=res.data.data.list    
                }
            })
        },
        filter(val){
            let vm=this;
            vm.$ajax({
                    method:'get',
                    url:'/api/admin/'+val+'/site',
                    headers:{'token':sessionStorage.getItem('token')},               
                }).then(res => {
                    if(res.data.code == 200){                    
                      vm.mohudataList2=res.data.data
                      if(vm.zdid==''){
                          for(let i=0;i<res.data.data.length;i++){
                                vm.zdidarr.push(res.data.data[i].id)
                                
                          }           
                      }
                    }
                });
        },
    
        query () {
            let vm = this
            let beginTime = ''
            let endTime = ''
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            this.$ajax({
                method:"get",
                url:'/api/charging/order/list',
                headers:{"token":sessionStorage.getItem('token')},
                params:{
                    phone:vm.phone,
                    sitename:vm.siteName,
                    beginTime:beginTime,
                    endTime:endTime,
                    aid:vm.userid,
                    sid:vm.zdid,
                    page:vm.current_page,
                    size:vm.page_size
                }
            }).then(res=>{
                if(res.data.code==200){
                    console.log(res.data.data)
                    vm.data = res.data.data.list.slice(0,10)
                    // console.log("充电订单",vm.data)
                    vm.data.map(item =>{
                        item.cost = (parseFloat((item.cost) / 100)).toFixed(2)
                        item.cprice = (parseFloat((item.cprice) / 100)).toFixed(2)
                        item.sprice =(parseFloat((item.sprice) / 100)).toFixed(2)
                        item.parking_fee =(parseFloat((item.parking_fee) / 100)).toFixed(2)
                        var Hours = parseInt(item.duration / 3600)
                        var Minutes = parseInt(parseInt(item.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.duration % 3600) % 60)
                        item.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                    vm.total = res.data.data.total
                }else{
                    vm.$message({
                        type:'warning',
                        message:res.data.message
                    })
                }
            })
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
            let vm = this
            let beginTime = ''
            let endTime = ''
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            vm.page_size = val
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/charging/order/list?page=1&size='+vm.page_size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    phone:vm.phone,
                    sitename:vm.siteName,
                    beginTime:beginTime,
                    endTime:endTime,
                    sid:vm.zdid,
                    aid:vm.userid,
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.data = res.data.data.list
                    vm.data.map(item =>{
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
        handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
            let vm = this
            let beginTime = ''
            let endTime = ''
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            let size = vm.page_size==0?'10':vm.page_size
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/charging/order/list?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    phone:vm.phone,
                    sitename:vm.siteName,
                    beginTime:beginTime,
                    endTime:endTime,
                    sid:vm.zdid,
                    aid:vm.userid,
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    vm.data = res.data.data.list
                    vm.data.map(item =>{
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
        //导出报表
        handleDownload() {
            
            let vm = this
            let beginTime = ''
            let endTime = ''
            if(vm.DateTime != null){
                beginTime = vm.DateTime[0]
                endTime = vm.DateTime[1]
            }
            this.$ajax({
                method:"get",
                url:'/api/charging/order/list',
                headers:{"token":sessionStorage.getItem('token')},
                params:{
                    phone:vm.phone,
                    sitename:vm.siteName,
                    beginTime:beginTime,
                    endTime:endTime,
                    aid:vm.userid,
                    sid:vm.zdid
                }
            }).then(res => {
                if(res.data.code == 200){
                    vm.dataList = res.data.data.list;
                    vm.dataList.map(item =>{
                        item.cost = (parseFloat((item.cost) / 100)).toFixed(2)
                        item.cprice = (parseFloat((item.cprice) / 100)).toFixed(2)
                        item.sprice =(parseFloat((item.sprice) / 100)).toFixed(2)
                        item.parking_fee =(parseFloat((item.parking_fee) / 100)).toFixed(2)
                        item.cz_cprice =(parseFloat((item.cz_cprice) / 100)).toFixed(2)
                        item.cz_sprice =(parseFloat((item.cz_sprice) / 100)).toFixed(2)
                        item.cz_pprice =(parseFloat((item.cz_pprice) / 100)).toFixed(2)
                        item.cz =(parseFloat((item.cz) / 100)).toFixed(2)
                        var Hours = parseInt(item.duration / 3600)
                        var Minutes = parseInt(parseInt(item.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.duration % 3600) % 60)
                        item.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                        if(item.status == 0){
                            item.status = '待支付'
                        }else if(item.status == 1){
                            item.status = '充电中'
                        }else if(item.status == 2){
                            item.status = '支付成功'
                        }else{
                            item.status = '已完成'
                        }
                    });
                    this.downloadLoading = true;
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('../../vendor/Export2Excel.js');
                        const tHeader = ['用户名称','手机号码', '电站名称','电桩编号','充电消费','电费','服务费','停车费','充值扣除电费','充值扣除服务费','充值扣除停车费','充值扣除总费用','持续充电时间','结束时间','充电电量','充电状态'];
                        const filterVal = ['username','phone', 'sitename','qr_code','cost','cprice','sprice','parking_fee','cz_cprice','cz_sprice','cz_pprice','cz','duration','begin_time','electric_quantity','status'];
                        const list = this.dataList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '充电订单列表');
                        this.downloadLoading = false;
                    })
                }
            })
            
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    },
     created(){
 
        this.query();
        this.filtersmethoduser();
        this.filtersmethod();
        
    },
}
</script>