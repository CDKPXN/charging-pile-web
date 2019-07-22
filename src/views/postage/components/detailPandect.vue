<template>
    <div style="margin-top:1%">
        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always" class="cardTopBorder">
                    <span style="margin-right:50%;font-size:16px;color:#676a71">本年收入情况（元）</span>
                    <div id="mainYear" style="width: 100%;height:400px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always" class="cardTopBorder">
                <span style="margin-right:50%;font-size:16px;color:#676a71">本周收入情况（元）</span>
                <div id="week" style="width: 100%;height:400px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from '../../../../static/js/echarts.min.js'
    export default {
        name: 'OverviewBody',
        data () {
            return {
                data:[]
            }
        },
        mounted (){
            this.echartsYear()
            this.echartsWeek()
        },
        methods:{
            echartsYear () {  // 年收入趋势图
                let vm = this
                var myChart = echarts.init(document.getElementById('mainYear'))
                vm.$ajax({
                    method:'get',
                    url:'api/rechargeOrder/statistics',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    var dataAmount = res.data.data.statisticsAmountForYear
                    dataAmount.forEach((value,index,item) => {
                        dataAmount[index] = (parseFloat(value) / 100).toFixed(2)
                    })
                    var dataPayFor = res.data.data.statisticsPayForYear
                    dataPayFor.forEach((value,index,item) => {
                        dataPayFor[index] = (parseFloat(value) / 100).toFixed(2)
                    })
                    var option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'category',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        legend: {
                            data:['应收','实收']
                        },
                        xAxis: {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        yAxis: {
                            type: 'value',
                            splitLine:{
                                show:false
                            }
                        },
                        series: [{
                            data: dataAmount,
                            name:'应收',
                            type: 'bar'
                        },{
                            data: dataPayFor,
                            name:'实收',
                            type: 'bar'
                        }]
                    }
                    myChart.setOption(option)
                })
            },
            echartsWeek () {  // 本周收入趋势图
                let vm = this
                var myChart = echarts.init(document.getElementById('week'))
                vm.$ajax({
                    method:'get',
                    url:'api/rechargeOrder/statistics',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    var dataAmount = res.data.data.statisticsAmountForWeek
                    var dataAmountFormat = [];
                    dataAmount.forEach((value,index,item) => {
                        // var flag = index;
                        // if(index == 6) flag = -1;
                        // console.log(flag+1)
                        dataAmountFormat[index] = (parseFloat(value) / 100).toFixed(2)
                       
                    })
                    var dataPayFor = res.data.data.statisticsPayForWeek
                    var dataPayForFormat = [];
                    dataPayFor.forEach((value,index,item) => {
                        var flag = index;
                        if(index == 6) flag = -1;
                        dataPayForFormat[flag+1] = (parseFloat(value) / 100).toFixed(2)
                    })
                    // var optionData=[]
                    // var PayForWeek=[]
                    // for(var i = 0; i<dataAmount.length; i++){
                    //     optionData.push(dataAmount[i])
                    // }
                    // for(var i=0; i<dataPayFor.length; i++){
                    //     PayForWeek.push(dataPayFor[i])
                    // }
                    var option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'category',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        legend: {
                            data:['应收','实收']
                        },
                        xAxis: {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            data: [ '周一', '周二', '周三', '周四', '周五', '周六','周日'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        yAxis: {
                            type: 'value',
                            splitLine:{
                                show:false
                            }
                        },
                        series: [{
                            data: dataAmountFormat,
                            name:'应收',
                            barWidth: '20%',
                            type: 'bar',
                            // itemStyle:{
                            //     normal:{
                            //         color:'#4ad2ff'
                            //     }
                            // },
                        },{
                            data: dataPayForFormat,
                            name:'实收',
                            barWidth: '20%',
                            type: 'bar',
                            itemStyle:{
                                normal:{
                                    // color:'red'
                                }
                            },
                        }]
                    }
                    myChart.setOption(option)
                })
            },  
        }
    }
</script>
