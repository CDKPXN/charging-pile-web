<!-- 图表数据统计 -->
<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="注册用户" name="first">
            <div id="esPrice" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="充值收入" name="second">
            <div id="totalRevenue" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
          <el-tab-pane label="订单收入" name="third">
             <!-- 根据所选用户和电站查数据 -->
            <div  style="margin:0px 30px 0px 30px" >
             <!-- 模糊用户搜索 -->
                  <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px"  clearable v-if="auth.isAdmin()">
                   <el-option
                    v-for="item in dataList2" 
                   :key="item.id"
                   :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
     <!-- 模糊搜索站点 -->
                  <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px"  clearable>
                    <el-option
                    v-for="item in dataList" 
                        :key="item.id"
                      :label="item.name"
                        :value="item.id">
                     </el-option>
                         </el-select>
           <el-button type="primary" class="btnStyle" @click="lookfororderincome">查询</el-button>              
         </div>   
            <div id="orderincome" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="电量输出" name="fourth">
               <!-- 根据所选用户和电站查数据 -->
            <div  style="margin:0px 30px 0px 30px" >
             <!-- 模糊用户搜索 -->
                  <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px"  clearable v-if="auth.isAdmin()">
                   <el-option
                    v-for="item in dataList2" 
                   :key="item.id"
                   :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
     <!-- 模糊搜索站点 -->
                  <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px"  clearable>
                    <el-option
                    v-for="item in dataList" 
                        :key="item.id"
                      :label="item.name"
                        :value="item.id">
                     </el-option>
                         </el-select>
           <el-button type="primary" class="btnStyle" @click="lookforpowerOutPut">查询</el-button>              
         </div>  
            <div id="powerOutPut" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="充电时长" name="fifth">
               <!-- 根据所选用户和电站查数据 -->
            <div  style="margin:0px 30px 0px 30px" >
             <!-- 模糊用户搜索 -->
                  <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px"  clearable v-if="auth.isAdmin()">
                   <el-option
                    v-for="item in dataList2" 
                   :key="item.id"
                   :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
     <!-- 模糊搜索站点 -->
                  <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px"  clearable>
                    <el-option
                    v-for="item in dataList" 
                        :key="item.id"
                      :label="item.name"
                        :value="item.id">
                     </el-option>
                         </el-select>
           <el-button type="primary" class="btnStyle" @click="lookfortotalTime">查询</el-button>              
         </div>  
            <div id="totalTime" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="充电订单数" name="sixth">
               <!-- 根据所选用户和电站查数据 -->
            <div  style="margin:0px 30px 0px 30px" >
             <!-- 模糊用户搜索 -->
                  <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px"  clearable v-if="auth.isAdmin()">
                   <el-option
                    v-for="item in dataList2" 
                   :key="item.id"
                   :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
     <!-- 模糊搜索站点 -->
                  <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px" clearable>
                    <el-option
                    v-for="item in dataList" 
                        :key="item.id"
                      :label="item.name"
                        :value="item.id">
                     </el-option>
                         </el-select>
           <el-button type="primary" class="btnStyle" @click="lookfortotalOrder">查询</el-button>              
         </div>  
            <div id="totalOrder" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
        <el-tab-pane label="故障数" name="seventh">
               <!-- 根据所选用户和电站查数据 -->
            <div  style="margin:0px 30px 0px 30px" >
             <!-- 模糊用户搜索 -->
                  <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px"  clearable v-if="auth.isAdmin()">
                   <el-option
                    v-for="item in dataList2" 
                   :key="item.id"
                   :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
     <!-- 模糊搜索站点 -->
                  <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px"  clearable>
                    <el-option
                    v-for="item in dataList" 
                        :key="item.id"
                      :label="item.name"
                        :value="item.id">
                     </el-option>
                         </el-select>
           <el-button type="primary" class="btnStyle" @click="lookfortotalFault">查询</el-button>              
         </div>  
            <div id="totalFault" style="width:85%;height:420px;margin-left:70px;"></div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
// echarts 矢量图 引入
import echarts from '../../../../static/js/echarts.min.js';
var xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
let date=new Date();
let month=date.getMonth()+1;
console.log('月份',month)
export default {
    name:'ChartList',
    data(){
        return{
            activeName: 'first',
            dataList:[],
            dataList2:[],
            userid:null,
             zdid:null,
        }
    },
    mounted:function(){    
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
    created(){
          this.filtersmethod();
          this.filtersmethoduser();
          
    },
    methods:{
         orderincome(){
               this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/income',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.userid,sid:this.zdid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data
                        for(var i = 0 ; i < data.length ; i++){
                            for(var j = 0 ; j < data[i].length ; j++){
                                data[i][j] = parseFloat(data[i][j] / 100).toFixed(2)
                            }
                        }                    
                        let legData = ['订单收入']
                        this.getesPrice(xData,data[0].slice(0,month),'orderincome',legData);             
                    }
                })
             
         },
         powerOutPut(){
               this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/electricquantity',
                    headers:{'token':sessionStorage.getItem('token')},
                     params:{aid:this.userid,sid:this.zdid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data.slice(0,month);              
                        let legData = ['电量输出']
                        this.getesPrice(xData,data,'powerOutPut',legData)
                    }
                })
         },
         totalTime(){
            this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/useduration',
                    headers:{'token':sessionStorage.getItem('token')},
                     params:{aid:this.userid,sid:this.zdid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data.slice(0,month);                    
                        let legData = ['充电时长']
                        this.getesPrice(xData,data,'totalTime',legData)
                    }
                })
         },
         totalOrder(){
            this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/orders',
                    headers:{'token':sessionStorage.getItem('token')},
                     params:{aid:this.userid,sid:this.zdid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data.slice(0,month);                  
                        let legData = ['充电订单数']
                        this.getesPrice(xData,data,'totalOrder',legData)
                    }
                })
         },
         totalFault(){
              this.$ajax({
                    method:'get',
                    url:'/api/sitesstatistics/fault',
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{aid:this.userid,sid:this.zdid}
                }).then(res => {
                    if(res.data.code == 200){
                        let data = res.data.data;               
                        let legData = ['故障数']
                        this.getesPrice(xData,data.slice(0,month),'totalFault',legData)
                    }
                }) 
         },
        // Tabs切换
        handleClick(tab, event) {
            let vm = this;
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
             else if(vm.activeName == 'third'){
                     //清空搜索输入框
                this.userid=null;
                this.zdid=null;  
               this.orderincome();         
            }
            else if(vm.activeName == 'fourth'){
                   //清空搜索输入框
                    this.userid=null;
                    this.zdid=null;   
               this.powerOutPut(); 
             
            }
            else if(vm.activeName == 'fifth'){
                   //清空搜索输入框
                    this.userid=null;
                    this.zdid=null;   
                this.totalTime();
            }
            else if(vm.activeName == 'sixth'){
                   //清空搜索输入框
                    this.userid=null;
                    this.zdid=null;   
                this.totalOrder();
            }
            else if(vm.activeName == 'seventh'){
                    //清空搜索输入框
                    this.userid=null;
                    this.zdid=null;  
                this.totalFault();
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
       //模糊搜索站点
            filtersmethod(){
             this.$ajax({
                method:'get',
                url:'/api/site/list',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    this.dataList=res.data.data.list 
                     
                }
            })
        },
             //模糊搜索用户
            filtersmethoduser(){
             this.$ajax({
                method:'get',
                url:'/api/admin/list',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    this.dataList2=res.data.data.list
                  
                }
            })
        },  
        // 查询
        lookfororderincome(){
          this.orderincome(); 
        },
        lookforpowerOutPut(){
          this.powerOutPut();  
        },
        lookfortotalTime(){
            this.totalTime();
        },
        lookfortotalOrder(){
           this.totalOrder(); 
        },
        lookfortotalFault(){
           this.totalFault(); 
        }
    }
}
</script>