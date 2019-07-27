  <!-- 统计首页 -->
<template>
  <div>
    <!-- 第一行 -->
    <!-- 标题 -->
    <el-row>
      <el-col :span="8" class="title">
        <span><i class="fa fa-bar-chart" aria-hidden="true"></i>数据统计</span>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <!-- 查询条件 -->
    <el-row class="selectWhere">
      <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24"  class="fastLook">
        <span>快速查看：</span>
        <el-button type="infor" @click="Today" id="Today" class="btn">今天</el-button>
        <el-button type="infor" @click="yesTerday(1,'#yesTerday')" id="yesTerday" class="btn">昨天</el-button>
        <el-button type="infor" @click="yesTerday(7,'#latelySev')" id="latelySev" class="btn">最近7天</el-button>
        <el-button type="infor" @click="yesTerday(30,'#latelyThr')" id="latelyThr" class="btn">最近30天</el-button>
        <el-button type="infor" @click="yesTerday(365,'#latelyYear')" id="latelyYear" class="btn">最近一年</el-button>
      </el-col>
      
    </el-row>
    
      <!-- <div  style="display:flex;align-items: center;margin:10px 0;padding-left:30px;height:50px;"  > -->
  
    <!-- 第三行-->
    <el-row class="selectWhere">      
     <!-- 模糊用户搜索 -->
     <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" >
         <div>
            
      <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px" @change="filter" clearable v-if="auth.isAdmin()">
     <el-option
      v-for="item in dataList2" 
      :key="item.id"
      :label="item.name"
      :value="item.id">

      
    </el-option>
     </el-select>
     </div>
    </el-col>
     <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" > 
     <!-- 模糊搜索站点 -->
     <div> 
    <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px" @change="filter2" clearable>
     <el-option
      v-for="item in dataList" 
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
     </div>
    </el-col>
       <!-- 日期搜索框 -->
     <el-col  :xs="18" :sm="18" :md="18" :lg="18" :xl="18" > 
         <div>
         <span class="fast">筛选时间：</span>
        <el-date-picker
            v-model="beginEndTime"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="changeDate"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" class="btnStyle" @click="query('','')">查询</el-button>
        <el-button type="infor" @click="reset">重置</el-button>
         </div>
       </el-col> 
      <!-- </div> -->
    </el-row>

     <!-- 第四行 -->
    <!-- 查询结果显示 -->
    <el-row class="baseNot"  type="flex" justify="space-between" >
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
            <!-- 电站信息 -->
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="18" class="totalSite">
                    <div>
                        <span>总电站数<br/><span class="siteNum">{{sites}}</span></span>
                    </div>
                    <div>
                        <span>总电桩数<br/><span class="siteNum">{{piles}}</span></span>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="6" class="totalSite siteNot">
                    <img src="../../../static/img/siteList.png" style="height:20px;width:20px;position:relative;top:5.5%" alt="">
                    <span>&nbsp;&nbsp;电站信息</span>
                </el-col>
            </el-row>
            <!-- 订单信息 -->
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="18" class="totalSite">
                    <div>
                        <span>总订单数<br/><span class="indentNum">{{sitesstatistics.orderSize+sitesstatistics.rechargeOrderSize}}</span></span>
                    </div>
                    <div>
                        <span>充电订单数<br/><span class="indentNum">{{sitesstatistics.orderSize}}</span></span>
                    </div>
                    <div>
                        <span>充值订单数<br/><span class="indentNum">{{sitesstatistics.rechargeOrderSize}}</span></span>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="6" class="totalSite indentNot">
                    <img src="../../../static/img/chargList.png" style="height:20px;width:20px;position:relative;top:5.5%" alt="">
                    <span>&nbsp;&nbsp;订单信息</span>
                </el-col>
            </el-row>
            <!-- 充电信息 -->
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="18" class="totalSite">
                    <div>
                        <span>充电电量<br/><span class="changeNum">{{sitesstatistics.electricQuantity}}（度）</span></span>
                    </div>
                    <div>
                        <span>充电时长<br/><span class="changeNum">{{sitesstatistics.duration}}</span></span>
                    </div>
                    <div>
                        <span>充电人数<br/><span class="changeNum">{{sitesstatistics.peopleNum}}</span></span>
                    </div>
                    <!-- <div>
                        <span>充电次数<br/><span class="changeNum">900</span></span>
                    </div> -->
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="6" class="totalSite chargNot">
                    <img src="../../../static/img/chargE.png" style="height:20px;position:relative;top:5.5%" alt="">
                    <span>&nbsp;&nbsp;充电信息</span>
                </el-col>
            </el-row>
            <!-- 用户信息 -->
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="18" class="totalSite" style="border-bottom: 1px solid rgb(207, 207, 207);">
                    <div>
                        <span>集团用户数<br/><span class="userNum">{{userInfo.bloc}}</span></span>
                    </div>
                    <div>
                        <span>普通用户数<br/><span class="userNum">{{userInfo.nobloc}}</span></span>
                    </div>
                    <div>
                        <span>业主数<br/><span class="userNum">{{userInfo.admin}}</span></span>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="6" class="userNot">
                    <img src="../../../static/img/t_user.png" style="height:20px;width:20px;position:relative;top:5.5%" alt="">
                    <span>&nbsp;&nbsp;用户信息</span>
                </el-col>
            </el-row>
        </el-col>
        <!-- 收入信息 -->
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="income">
            <el-row class="incomeText">
                <el-col :span="24">
                    <img src="../../../static/img/t_money.png" style="height:20px;width:20px;" alt="">
                    <p style="display: inline-block;">&nbsp;&nbsp;收入情况</p><br>
                    <p >总收入¥&nbsp;{{sitesstatistics.income_count}}</p>
                    <!-- <div style="width:100%;display:inline-block;margin-top: 10%;">
                      <p  style="background-color:green;width:100%;margin:0px;">总收入¥&nbsp;{{sitesstatistics.income_count}}</p>
                      <p  style="background-color:red;width:100%;margin:0px;">总收入¥&nbsp;{{sitesstatistics.income_count}}</p>
                     <p  style="background-color:blue;width:100%;margin:0px;">总收入¥&nbsp;{{sitesstatistics.income_count}}</p> 
                    </div>             -->
                </el-col>
            </el-row>     
        </el-col>
    </el-row>
    <!-- 图表统计 -->
    <el-row>
        <el-col :span="20" class="TabStyle">
            <chart-list></chart-list>
        </el-col>
    </el-row>
    <!-- 根据所选用户和电站查数据 -->
   <!-- <div  style="margin:30px 30px 0px 30px" >
            
                  <el-select v-model="userid" filterable placeholder="请输入搜索用户" style="margin-right:40px" @change="getaid" clearable v-if="auth.isAdmin()">
                   <el-option
                    v-for="item in dataList2" 
                   :key="item.id"
                   :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
    
                  <el-select v-model="zdid" filterable placeholder="请输入搜索站点"  style="margin-right:40px" @change="getsid" clearable>
                    <el-option
                    v-for="item in dataList" 
                        :key="item.id"
                      :label="item.name"
                        :value="item.id">
                     </el-option>
                         </el-select>
           <el-button type="primary" class="btnStyle" @click="lookfor">查询</el-button>              
    </div> -->
    <!-- 图表统计2 -->
    <!-- <el-row>
        <el-col :span="20" class="TabStyle">
            <chartList2 ref="chidren2"></chartList2>
        </el-col>
    </el-row> -->
    <!-- 电站列表 -->
    <el-row class="TableStyle">
        <el-col :span="20">
            <site-list></site-list>
        </el-col>
    </el-row>
    <!-- 故障/用户构成 -->
    <el-row style="margin:20px 0 0 30px;width:81.7%" type="flex" justify="space-between">
      <el-col :span="12" style="padding-right:6px;">
            <el-card shadow="always" class="cardTopBorder" style="background-color:rgb(235, 235, 235);box-shadow: 0 0 10px 1px grey;text-align: center;">
                <p style="padding-left:15px">故障详情构成</p>
                <div id="chargForm" style="height:300px;width:450px;margin:0 auto;"></div>
           </el-card>
      </el-col>
      <el-col :span="12" style="padding-left:6px;" >
           <el-card shadow="always" class="cardTopBorder" style="background-color:rgb(235, 235, 235);box-shadow: 0 0 10px 1px grey;text-align: center;">
                <p>用户构成</p>
                <div id="userForm" style="height:300px;width:350px;margin:0 auto;"></div>
           </el-card>    
      </el-col>    
    </el-row>
  </div>
</template>

<script>
// echarts 矢量图 引入
import echarts from '../../../static/js/echarts.min.js'
//引入获取当前日期时间和最近的日期时间JS
import DateTime from '../../config/time.js'
// 引入按钮切换颜色JS
import btnStyle from '../../config/btnStyle.js'
// 子组件电站列表
import SiteList from './components/siteList.vue'
// 子组件图表
import ChartList from './components/chartList.vue'
//第二个图表
import ChartList2 from './components/chartList2.vue'
let date=new Date();
let month=date.getMonth()+1;
    export default {
        components:{
            SiteList,
            ChartList,
            ChartList2
        },
        inject:['reload'],
        data () {
            return {
                sitesstatistics:{},
                sites:0,
                piles:0,
                beginEndTime:'',
                userInfo:{},
                zdid:null,
                zdidarr:[],
                dataList:[],
                dataList2:[],
                userid:null,
                // aid:'',
                // sid:''

            }
        },
        
      
        mounted:function(){    
            //用户构成ECharts表
            this.$ajax({
                method:'get',
                url:'/api/sitesstatistics/userrole',
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
            //故障详情构成
            this.$ajax({
                method:'get',
                url:'/api/sitesstatistics/faultdetails',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    let data = []
                    res.data.data.map(item =>{
                        data.push({value:item.fault,name:item.name})
                    })
                    
                    this.getChargeForm(data)
                }
            })
        },
        watch:{
          dataList(){
              this.sites = this.dataList.length;
          }
        },
        methods:{
            // 数据查询
            query(beginTime,endTime){
                 let vm = this;
                 let zdidarr=[];
                 console.log("开始查询")
                console.log(beginTime,endTime)
                
                let begin_time =beginTime
                let end_time = endTime
                if(beginTime == ''){
                    begin_time = vm.beginEndTime[0]
                    end_time = vm.beginEndTime[1]
                }
                 vm.$ajax({
                    method:'post',
                    url:'/api/sitestatistics/site/countOrder',
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                        beginTime:begin_time,
                        endTime:end_time,
                        aid:vm.userid,
                        sid:vm.zdid
                    }
                }).then(res => {
                 
                    if(res.data.code == 200){
                        vm.sitesstatistics = res.data.data
                        //充电电量保留两位小数
                        vm.sitesstatistics.electricQuantity = parseFloat(vm.sitesstatistics.electricQuantity).toFixed(2)
                        //收入分转元
                        vm.sitesstatistics.income_count = parseFloat(vm.sitesstatistics.cost / 100).toFixed(2)
                        // 充电时长转换为时分秒
                        var Hours = parseInt(vm.sitesstatistics.duration / 3600)
                        var Minutes = parseInt(parseInt(vm.sitesstatistics.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(vm.sitesstatistics.duration % 3600) % 60)
                        vm.sitesstatistics.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                        vm.sitesstatistics.sites = 100
                    }
                });
                // vm.$ajax({
                //     method:'get',
                //     url:'/api/sitestatistics/admin/sites',
                //     headers:{'token':sessionStorage.getItem('token')},
                
                // }).then(res => {
                //     if(res.data.code == 200){
                //         vm.sites =  res.data.data;
                //     }
                // });
               
                  vm.$ajax({
                    method:'post',
                    url:'/api/sitestatistics/site/countPile',
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                        aid:vm.userid,
                        sid:vm.zdid
                    }
                }).then(res => {
                   
                    if(res.data.code == 200){
                        vm.piles =  res.data.data;
                    }
                })
                vm.$ajax({
                    method:'get',
                    url:'/api/sitestatistics/user/countUser',
                    headers:{'token':sessionStorage.getItem('token')},
                
                }).then(res => {
                    if(res.data.code == 200){
                        vm.userInfo =  res.data.data;
                    }
                });


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
        //点击查询事件把调用子组件的方法传值
        lookfor(){
            // this.$refs.chidren2.getaidsid(this.aid,this.sid,false);
            //点击的时候调用子组件的方法重新请求数据
            // this.$refs.chidren2.orderincome();
            // this.$refs.chidren2.powerOutPut();
            // this.$refs.chidren2.totalTime();
            // this.$refs.chidren2.totalOrder();
            // this.$refs.chidren2.totalFault();
        },
        //获取到用户的id
        // getaid(val){
        // this.aid=val;
        // },
        //获取到电站id
        // getsid(val){
        // this.sid=val;
        // },
        filter(val){
            let vm=this;
            vm.$ajax({
                    method:'get',
                    url:'/api/admin/'+val+'/site',
                    headers:{'token':sessionStorage.getItem('token')},               
                }).then(res => {
                    if(res.data.code == 200){                    
                      vm.dataList=res.data.data
                      if(vm.zdid==''){
                          for(let i=0;i<res.data.data.length;i++){
                                vm.zdidarr.push(res.data.data[i].id)
                                
                          }           
                      }
                    }
                });
        },
        filter2(val){
            let vm=this;
          vm.zdidarr.length=0;  
          vm.zdidarr.push(val)
        
        },
            //故障详情构成
            getChargeForm(data){
                let vm = this
                let legData = []
                data.map(item => {
                    legData.push(item.name)
                })
                var myChart = echarts.init(document.getElementById('chargForm'))
                var option = {
                    title: {
                        left: 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    grid:{
                        left:'100%'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        top: 20,
                        bottom: 20,
                        data: legData
                    },
                    series : [
                        {   
                            name: '故障详情构成',
                            type: 'pie',
                            radius : '65%',
                            center: ['70%', '50%'],
                            selectedMode: 'single',
                            data:data,
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
                    grid:{
                        left:'50%'
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
                            center: ['60%', '50%'],
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
            //查看今天
            Today(){
                let vm = this
                vm.beginEndTime = ''
                // 按钮切换颜色
                btnStyle.btnStyle('#Today')
                //  开始/结束时间
                let endTime = DateTime.getEndTime()
                let endTimeArr = endTime.split(' ')
                let beginTime = endTimeArr[0] + ' 00:00:00'
                vm.query(beginTime,endTime)
            },
            //查看昨天/最近7天/最近30天/最近一年
            yesTerday(num,DomId){
                let vm = this
                vm.beginEndTime = ''
                // 按钮切换颜色
                btnStyle.btnStyle(DomId)
                //  开始/结束时间
                let endTime = DateTime.getEndTime(num)
                let beginTime = DateTime.getBeginTime(num)
                console.log("时间",beginTime,endTime)
                this.query(beginTime,endTime)
            },
            // 清除选择时间后的查询
            changeDate(){
                if(this.beginEndTime == '' || this.beginEndTime == null){
                    this.Today()
                }
            },
            // 重置查询
            reset(){
                this.reload()
            //     this.filtersmethod();
            //     this.filtersmethoduser();          
            //     this.query();
            //       this.dataList=[];
            //     this.dataList2=[];
            //      $(document).ready(function(){
            //     $("#Today").css({
            //         "background-color": "#409EFF",
            //         'color':'white'
            //     }); 
            // })
                // let vm  = this
                // vm.beginEndTime = ''
                this.Today()
            }
        },
        created(){

            this.filtersmethod();
            this.filtersmethoduser();
            $(document).ready(function(){
                $("#Today").css({
                    "background-color": "#409EFF",
                    'color':'white'
                }); 
            })
            this.Today()
        }
    }
</script>

<style scoped>
    @import '../../style/electricPile.scss';
    .TableStyle {
        display: none;
    }
</style>