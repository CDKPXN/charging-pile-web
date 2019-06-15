<template>
    <div style="margin:1% 0 1% 0">

        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always"  class="cardTopBorder">
                    <span style="margin-right:50%;font-size:16px;color:#676a71;">充电站收入排名</span>
                    <el-table :data="tableData" style="width: 100%;background:#ffffff;height:400px;padding-top:15px;margin-left:3%;">
                        <el-table-column prop="index" label="排名" width="60"></el-table-column>
                        <el-table-column prop="name" label="电站名"></el-table-column>
                        <el-table-column prop="sum_income" label="总收入(元)" width="100"></el-table-column>
                        <el-table-column prop="sum_e" label="充电电量" width="100"></el-table-column>
                        <el-table-column prop="ctime" label="投运时间" width="140"></el-table-column>
                        <el-table-column prop="count" label="充电桩数量" width="100"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card shadow="always" class="cardTopBorder">
                    <span style="margin-right:50%;font-size:16px;color:#676a71">当月TOP10充电桩收入（元）</span>
                    <div id="footer" style="width:100%;height:400px;"></div>
                </el-card>
            </el-col>

        </el-row>

    </div>
</template>

<script>
import echarts from '../../../../static/js/echarts.min.js'
    export default {
        name: 'OverviewFooter',
        data(){
            return{
                tableData:[]
            }
        },
        mounted () {
            let vm = this
            vm.getTopCharge()
            //当月Top10充电桩收入排名
            var myChart = echarts.init(document.getElementById('footer'))
            vm.$ajax({
                method:'get',
                url:'api/pandect/topForPile',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res=>{
                var data = res.data.data
                        console.log("当月Top10充电桩收入排名",data)                
                data.map(item =>{
                    item.income = (parseFloat(item.income) / 100).toFixed(2)
                })
                var topData = []
                data.map(item => {
                    topData.push({name:'收入',value:item.income,siteName:item.siteName,num:item.num,pilename:item.name})
                })
                var option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                    formatter: function (params, ticket, callback) {
                            let result = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#3398DB"></span>'
                            var res =  params[0].name;
                            for (var i = 0; i < params.length ; i++) {
                                res += '<br/>' + result + params[i].seriesName + ' : ' + params[i].value + '<br/>' + result +'电站名称 : ' + params[i].data.siteName + '<br/>' 
                                + result +'电桩名称 : ' + params[i].data.pilename+ '<br/>' + result +'电桩编号 : ' + params[i].data.num;
                            }
                            return res;
                        }
                    },
                    grid: {
                        top:'8%',
                        left: '6.4%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            background:false,
                            data : ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6', 'NO.7','NO.8','NO.9','NO.10'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine:{
                                show:false
                            }
                        }
                    ],
                    series : [
                        {
                            name:'收入',
                            siteName:'123',
                            type:'bar',
                            barWidth: '60%',
                            data:topData
                        },
                    ]
                }
                myChart.setOption(option)
            })
        },
        methods:{
            //充电站收入排名
            getTopCharge () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'api/pandect/top',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    if(res.data.code==200){
                        let arr = res.data.data
                        let index = 0
                        arr.map(item => {
                            let dateString = item.ctime.substr(0,10)
                            index = index + 1
                            vm.tableData.push({
                                index:index,
                                id:item.id,
                                name:item.name,
                                sum_e:item.sum_e,
                                sum_income:(parseFloat(item.income) / 100).toFixed(2),
                                ctime:dateString,
                                count:item.p_count
                            })
                        })
                    }
                })
            }
        }
    }
</script>