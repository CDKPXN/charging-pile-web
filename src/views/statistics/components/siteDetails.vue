<!-- 电站列表对应的电桩统计详情 -->
<template>
  <div>
    <!-- 标题 -->
    <el-row>
      <el-col :span="8" style="margin-left:30px;height:80px;line-height:80px;font-size:20px;">
        <span>电站详情</span>
      </el-col>
    </el-row>
    <!-- 电站列表 -->
    <el-row class="TableStyle" style="margin-top:0">
        <el-col :span="20">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="电桩名称">
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="总收入(元)">
                </el-table-column>
                <el-table-column
                    prop="electricQuantity"
                    label="充电电量（kwh）">
                </el-table-column>
                <el-table-column
                    prop="useDuration"
                    label="充电时长">
                </el-table-column>
                <el-table-column
                    prop="useTimes"
                    label="充电次数">
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
        </el-col>
    </el-row>
    <!-- 图表统计 -->
     <el-row>
        <el-col :span="20" class="TabStyle">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="总收入" name="first">
                        <div id="totalRevenue" style="width:85%;height:420px;margin-left:70px;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="电量输出" name="second">
                        <div id="powerOutPut" style="width:85%;height:420px;margin-left:70px;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="总时长" name="third">
                        <div id="totalTime" style="width:85%;height:420px;margin-left:70px;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="充电订单数" name="fourth">
                        <div id="totalOrder" style="width:85%;height:420px;margin-left:70px;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="故障数" name="fifth">
                        <div id="totalFault" style="width:85%;height:420px;margin-left:70px;"></div>
                    </el-tab-pane>
                </el-tabs>
        </el-col>
    </el-row>
    <!-- 用户构成 -->
    <el-row>
      <el-col :span="11" class="groupStyle">
            <div class="groupECharts" style="margin-left:1%;">
                <p>用户构成</p>
                <div id="userForm" style="height:300px;width:400px;"></div>
            </div>    
      </el-col>
    </el-row>
  </div>
</template>
<script>
// echarts 矢量图 引入
import echarts from '../../../../static/js/echarts.min.js'
export default {
    data(){
        return{
            activeName: 'first',
            tableData:[],
            siteId:'',
            //分页
            current_page:1,
            total:0,
            page_size:0,
        }
    },
    mounted:function(){    
        var xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        //用户构成ECharts表
        this.$ajax({
            method:'get',
            url:'/api/sitesstatistics/userrole/#'+this.siteId,
            headers:{'token':sessionStorage.getItem('token')}
        }).then(res => {
            if(res.data.code == 200){
                let data = []
                res.data.data.map(item =>{
                    data.push({value:item})
                })
                data[0].name = '普通用户',
                data[1].name = '集团用户'
                this.getUserForm(data)
            }
        })
    },
    methods:{
        handleClick(tab, event) {
            let vm = this
            var xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            if(vm.activeName == 'first'){
                this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/income/#'+vm.siteId,
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        for(var i = 0 ; i < data.length ; i++){
                            for(var j = 0 ; j < data[i].length ; j++){
                                data[i][j] = parseFloat(data[i][j] / 100).toFixed(2)
                            }
                        }
                        this.gettotalRevenue(xData,data)
                    }
                })
            }
            else if(vm.activeName == 'second'){
                this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/electricquantity/#'+vm.siteId,
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['电量输出']
                        this.getesPrice(xData,data,'powerOutPut',legData)
                    }
                })
            }
            else if(vm.activeName == 'third'){
                this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/useduration/#'+vm.siteId,
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['充电时长']
                        this.getesPrice(xData,data,'totalTime',legData)
                    }
                })
            }
            else if(vm.activeName == 'fourth'){
                this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/orders/#'+vm.siteId,
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['充电订单数']
                        this.getesPrice(xData,data,'totalOrder',legData)
                    }
                })
            }
            else{
                this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/fault/#'+vm.siteId,
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['故障数']
                        this.getesPrice(xData,data,'totalFault',legData)
                    }
                }) 
            }
        },
        // 电量输出/总时长/订单数/故障数ECharts表
        getesPrice(xData,sData,eDom,legData){
            let vm = this
            let data = sData
            let Dom = eDom
            var myChart = echarts.init(document.getElementById(Dom));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer : { // 坐标轴指示器，坐标轴触发有效
                        type : 'none' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    itemGap: 40,
                    data:legData,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{interval: 0},
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    }
                },
                series: [
                    {
                        name:legData[0],
                        type:'line',
                        data:data,
                        itemStyle: {
                            normal: {
                                color: "#FF7070",
                                lineStyle: {
                                    color: "#FF7070"
                                }
                            }
                        },
                    },
                ]
            };
            myChart.setOption(option)
        },
        //总收入ECharts表
        gettotalRevenue(xData,sData){
            let vm = this
            let chargeData = sData[0]
            let reChargeData = sData[1]
            var myChart = echarts.init(document.getElementById('totalRevenue'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer : { // 坐标轴指示器，坐标轴触发有效
                        type : 'none' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    itemGap: 40,
                    data:['订单收入','充值收入'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{interval: 0},
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    }
                },
                series: [
                    {
                        name:'订单收入',
                        type:'line',
                        data:chargeData,
                        itemStyle: {
                            normal: {
                                color: "#74B9E7",
                                lineStyle: {
                                    color: "#74B9E7"
                                }
                            }
                        },
                    },
                    {
                        name:'充值收入',
                        type:'line',
                        data:reChargeData,
                        itemStyle: {
                            normal: {
                                color: "#FF7070",
                                lineStyle: {
                                    color: "#FF7070"
                                }
                            }
                        },
                    },
                ]
            };
            myChart.setOption(option)
        },
        //用户构成
        getUserForm(data){
            let vm = this
            let Serdata = data
            var myChart = echarts.init(document.getElementById('userForm'))
            var option = {
                title: {
                    left: 'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color:['#74B9E7','#FF7070'],  
                legend: {
                    orient: 'vertical',
                    left: 0,
                    top: 140,
                    bottom: 20,
                    data: ['普通用户','集团用户']
                },
                series : [
                    {   
                        name: '用户构成',
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:Serdata,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal : {
                                label : {
                                    show : false   //隐藏标示文字
                                },
                                labelLine : {
                                    show : false   //隐藏标示线
                                }
                            }
                        },
                    }
                ]
            };
            myChart.setOption(option)
        },
        //点桩列表
        getSiteDetails(){
            let vm = this
            vm.$ajax({
                method:'get',
                url:'/api/sitestatistics/sitetable/'+vm.siteId+'?page=1&size=1000',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    vm.total = res.data.data.list.length
                    vm.tableData = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
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
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
            let vm = this
            vm.page_size = val
            vm.tableData = []
            vm.$ajax({
                method:'get',
                url:'/api/sitestatistics/sitetable/'+vm.siteId+'?page=1&size='+vm.page_size,
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
                url:'/api/sitestatistics/sitetable/'+vm.siteId+'?page='+val+'&size='+size,
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
        this.siteId = this.$route.query.id
        this.getSiteDetails()
        this.handleClick()
    }
}
</script>
<style scoped>
    @import '../../../style/electricPile.scss';
</style>