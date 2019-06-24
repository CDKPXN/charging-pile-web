<!-- 图表数据统计 -->
<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="注册用户" name="first">
            <div id="esPrice" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="充值收入" name="second">
            <div id="totalRevenue" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <!-- <el-tab-pane label="电量输出" name="third">
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
        </el-tab-pane> -->
    </el-tabs>
</template>
<script>
// echarts 矢量图 引入
import echarts from '../../../../static/js/echarts.min.js';
let date=new Date();
let month=date.getMonth()+1;
console.log('月份',month)
export default {
    name:'ChartList',
    data(){
        return{
            activeName: 'first',
        }
    },
    mounted:function(){    
        var xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        //注册用户Echarts表
        this.$ajax({
            method:'get',
            url:'/api/sitesstatistics/usercount',
            headers:{'token':sessionStorage.getItem('token')}
        }).then(res => {
            console.log("图表：",res)
            if(res.data.code == 200){
                let data = res.data.data
                let legData = ['注册人数']
                this.getesPrice(xData,data.slice(0,month),'esPrice',legData)
            }
        })
    },
    methods:{
        // Tabs切换
        handleClick(tab, event) {
            let vm = this
            var xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            if(vm.activeName == 'second'){
                this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/income',
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        for(var i = 0 ; i < data.length ; i++){
                            for(var j = 0 ; j < data[i].length ; j++){
                                data[i][j] = parseFloat(data[i][j] / 100).toFixed(2)
                            }
                        }
                        // this.gettotalRevenue(xData,data)
                         let legData = ['充值收入']
                         this.getesPrice(xData,data[1].slice(0,month),'totalRevenue',legData)
                    }
                })
            }
            // else if(vm.activeName == 'third'){
                
            //     this.$ajax({
            //         method:'get',
            //         url:'/api/sitesstatistics/electricquantity',
            //         headers:{'token':sessionStorage.getItem('token')}
            //     }).then(res => {
            //         if(res.data.code == 200){
            //             let data = res.data.data
            //             let legData = ['电量输出']
            //             this.getesPrice(xData,data,'powerOutPut',legData)
            //         }
            //     })
            // }
            // else if(vm.activeName == 'fourth'){
            //     this.$ajax({
            //         method:'get',
            //         url:'/api/sitesstatistics/useduration',
            //         headers:{'token':sessionStorage.getItem('token')}
            //     }).then(res => {
            //         if(res.data.code == 200){
            //             let data = res.data.data
            //             let legData = ['充电时长']
            //             this.getesPrice(xData,data,'totalTime',legData)
            //         }
            //     })
            // }
            // else if(vm.activeName == 'fifth'){
            //     this.$ajax({
            //         method:'get',
            //         url:'/api/sitesstatistics/orders',
            //         headers:{'token':sessionStorage.getItem('token')}
            //     }).then(res => {
            //         if(res.data.code == 200){
            //             let data = res.data.data
            //                 let legData = ['充电订单数']
            //             this.getesPrice(xData,data,'totalOrder',legData)
            //         }
            //     })
            // }
            // else if(vm.activeName == 'sixth'){
            //     this.$ajax({
            //         method:'get',
            //         url:'/api/sitesstatistics/fault',
            //         headers:{'token':sessionStorage.getItem('token')}
            //     }).then(res => {
            //         if(res.data.code == 200){
            //             let data = res.data.data
            //             let legData = ['故障数']
            //             this.getesPrice(xData,data,'totalFault',legData)
            //         }
            //     }) 
            // }
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
            // let chargeData = sData[0]
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