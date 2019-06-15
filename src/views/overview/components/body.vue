<template>
    <div style="margin-top:1%">
        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always" class="cardTopBorder">
                    <span style="margin-right:50%;font-size:16px;color:#676a71">月收入趋势图（元）</span>
                    <div id="mainYear" style="width: 100%;height:400px;margin-top:-30px"></div>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card shadow="always" class="cardTopBorder">
                    <span style="margin-right:50%;font-size:16px;color:#676a71">本周收入情况（元）</span>
                    <div id="mainWeek" style="width:100%;height:400px;margin-top:-30px"></div>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import echarts from '../../../../static/js/echarts.min.js'
    import axios from 'axios'
    import url from '../../../config/url.js'
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
                    url:'api/pandect/statisticsForYearMonthWeek',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    var data = res.data.data.statisticsForYear
                    data.forEach((value,index,item) => {
                        data[index] = (parseFloat(value.income) / 100).toFixed(2)
                    })
                    var option = {
                        xAxis: {
                            type: 'category',
                            boundaryGap : false,
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: {
                            type: 'value',
                            splitLine:{  //决定是否显示坐标中网格
                                show:false
                            }                       
                        },
                        tooltip : {
                            trigger: 'item',
                        },
                        series: [{
                            name:'月收入',
                            data: data,
                            type: 'line'
                        }]
                    }
                    myChart.setOption(option)
                })
            },
            echartsWeek () {  //  本周收入情况
                let vm = this
                var myChart = echarts.init(document.getElementById('mainWeek'))
                vm.$ajax({
                    method:'get',
                    url:'api/pandect/statisticsForYearMonthWeek',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    console.log(res)
                    var data = res.data.data.statisticsForWeek
                    var dataFormat = [];
                    data.forEach((value,index,item) => {
                        //if(value.week == 7)value.week = 0;
                        dataFormat[value.week-1] = (parseFloat(value.income) / 100).toFixed(2)
                       
                    })
                     console.log('dataform',dataFormat)
                    var option = {
                        xAxis: [{
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            data: [  '周一', '周二', '周三', '周四', '周五','周六','周日',]
                            
                        }],
                        yAxis: {
                           type: 'value',
                           splitLine:{  //决定是否显示坐标中网格
                                show:false
                            }   
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                        },
                        series: [{
                            data: dataFormat,
                            type: 'bar',
                            barWidth:'40%'
                        }]
                    }
                    myChart.setOption(option)
                })
            }
        }
    }
</script>