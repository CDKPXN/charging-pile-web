<!-- 图表数据统计 -->
<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane label="注册用户" name="first">
            <div id="esPrice" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane> -->
        <el-tab-pane label="订单收入" name="second">
            <div id="orderincome" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="电量输出" name="third">
            <div id="powerOutPut" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="总时长" name="fourth">
            <div id="totalTime" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="充电订单数" name="fifth">
            <div id="totalOrder" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="故障数" name="sixth">
            <div id="totalFault" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
 var xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
 let date=new Date();
let month=date.getMonth()+1;
// echarts 矢量图 引入
import echarts from '../../../../static/js/echarts.min.js'
export default {
    name:'ChartList2',
    data(){
        return{
            activeName: 'second',
            aid:'',
            sid:'',
            isquery:true
        }
    },
    mounted:function(){    
       
        //订单收入 
        this.orderincome();
        
    },
   
    methods:{
        
        //获取订单的数据
        orderincome(){
              this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/income',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.aid,sid:this.sid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        for(var i = 0 ; i < data.length ; i++){
                            for(var j = 0 ; j < data[i].length ; j++){
                                data[i][j] = parseFloat(data[i][j] / 100).toFixed(2)
                            }
                        }
                        let legData = ['订单收入']
                        this.getesPrice(xData,data[0].slice(0,month),'orderincome',legData)
                    }
                })
         },
         //获取电量的数据
         powerOutPut(){
             this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/electricquantity',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.aid,sid:this.sid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['电量输出']
                        this.getesPrice(xData,data.slice(0,month),'powerOutPut',legData)
                    }
                })
         },
         //获取充电时长的数据
         totalTime(){
             this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/useduration',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.aid,sid:this.sid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['充电时长']
                        this.getesPrice(xData,data.slice(0,month),'totalTime',legData)
                    }
                })
         },
         //获取充电订单数的数据
         totalOrder(){
             this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/orders',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.aid,sid:this.sid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                            let legData = ['充电订单数']
                        this.getesPrice(xData,data.slice(0,month),'totalOrder',legData)
                    }
                })
         },
         //获取故障树的数据
         totalFault(){
              this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/fault',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.aid,sid:this.sid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        let legData = ['故障数']
                        this.getesPrice(xData,data.slice(0,month),'totalFault',legData)
                    }
                }) 
         },
        getaidsid(aid,sid,isquery){
        this.isquery=isquery;
         this.aid=aid;
         this.sid=sid;
        },
        // Tabs切换
        handleClick(tab, event) {
            let vm = this       
             if(vm.activeName == 'third'){
                 if(this.isquery){
                   this.powerOutPut();
                 }                 
            }
            else if(vm.activeName == 'fourth'){
                if(this.isquery){
                   this.totalTime();
                }    
            }
            else if(vm.activeName == 'fifth'){
                 if(this.isquery){
               this.totalOrder();
                 }
            }
            else if(vm.activeName == 'sixth'){
                 if(this.isquery){
                this.totalFault(); 
                }
            }
        },
        //注册用户/电量输出/总时长/订单数/故障数ECharts表
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
                                color: "#74B9E7",
                                lineStyle: {
                                    color: "#74B9E7"
                                }
                            }
                        },
                    },
                ]
            };
            myChart.setOption(option)
        },
        //总收入ECharts表(暂时不用了)
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
    }
}
</script>