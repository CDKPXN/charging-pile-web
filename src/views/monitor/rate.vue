<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-card">  
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="00:00~06:00" name="first">
              <el-table
                :data="tableDataFirst"
                style="width: 100%">
                <el-table-column
                  prop="createTime"
                  label="时间段">
                </el-table-column>
                <el-table-column
                  prop="ePrice"
                  label="基础电价（元）">
                </el-table-column>
                <el-table-column
                  prop="fPrice"
                  label="快充服务费（元）">
                </el-table-column>
                <el-table-column
                  prop="sPrice"
                  label="慢充服务费（元）">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="06:00~12:00" name="second">
              <el-table
                  :data="tableDataSecond"
                  style="width: 100%">
                  <el-table-column
                    prop="createTime"
                    label="时间段">
                  </el-table-column>
                  <el-table-column
                    prop="ePrice"
                    label="基础电价（元）">
                  </el-table-column>
                  <el-table-column
                    prop="fPrice"
                    label="快充服务费（元）">
                  </el-table-column>
                  <el-table-column
                    prop="sPrice"
                    label="慢充服务费（元）">
                  </el-table-column>
                  <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="12:00~18:00" name="third">
              <el-table
                :data="tableDataThird"
                style="width: 100%">
                <el-table-column
                  prop="createTime"
                  label="时间段">
                </el-table-column>
                <el-table-column
                  prop="ePrice"
                  label="基础电价（元）">
                </el-table-column>
                <el-table-column
                  prop="fPrice"
                  label="快充服务费（元）">
                </el-table-column>
                <el-table-column
                  prop="sPrice"
                  label="慢充服务费（元）">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="18:00~24:00" name="fourth">
              <el-table
                :data="tableDataFourth"
                style="width: 100%">
                <el-table-column
                  prop="createTime"
                  label="时间段">
                </el-table-column>
                <el-table-column
                  prop="ePrice"
                  label="基础电价（元）">
                </el-table-column>
                <el-table-column
                  prop="fPrice"
                  label="快充服务费（元）">
                </el-table-column>
                <el-table-column
                  prop="sPrice"
                  label="慢充服务费（元）">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="12" >
        <el-card class="box-card" style="box-shadow:0 0 10px 1px grey;margin-top:15%">  
          <el-row>
            <el-col :span="24">
              <span class="title">电价服务费</span>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName1" @tab-click="handleClick" class="abc">
            <el-tab-pane label="慢充详情" name="first">
              <div id="slowDetails" style="width:800px;height:400px;"></div>
            </el-tab-pane>
            <el-tab-pane label="快充详情" name="second">
              <div id="fastDetails" style="width:800px;height:400px;"></div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑对话框 -->
    <el-dialog title="费率设置" :visible.sync="dialogFormVisible" width="450px" @close="close('form')">
      <el-form :model="form" style="margin-left:-8%" ref='form' :rules='rules'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="时间段" :label-width="formLabelWidth">
              <el-input v-model="form.createTime" class="addStyle" disabled auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="基础电价" :label-width="formLabelWidth" prop="ePrice">
              <el-input v-model="form.ePrice" class="addStyle" clearable auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <el-form-item label="快充服务费" :label-width="formLabelWidth" prop="fPrice">
                <el-input v-model="form.fPrice" class="addStyle" clearable auto-complete="off"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="慢充服务费" :label-width="formLabelWidth" prop="sPrice">
            <el-input v-model="form.sPrice" class="addStyle" clearable auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subaMend">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import echarts from '../../../static/js/echarts.min.js'
//  引入Price.js
import priceCount  from '../../config/price.js'

export default {
  data(){
    var ePrice = (rule,value,callback) => {
      let reg =/^[0-9]+([.]{1}[0-9]{2})?$/
      if(value === ''){
        callback(new Error('请输入基础电价'))
      }else if(!reg.test(value)){
        callback(new Error('请输入正整数或者正整数加两位小数点'))
      }
    }
    var sPrice = (rule,value,callback) => {
      let reg =/^[0-9]+([.]{1}[0-9]{2})?$/
      if(value === ''){
        callback(new Error('请输入慢充服务费'))
      }else if(!reg.test(value)){
        callback(new Error('请输入正整数或者正整数加两位小数点'))
      }
    }
    var fPrice = (rule,value,callback) => {
      let reg =/^[0-9]+([.]{1}[0-9]{2})?$/
      if(value === ''){
        callback(new Error('请输入慢充服务费'))
      }else if(!reg.test(value)){
        callback(new Error('请输入正整数或者正整数加两位小数点'))
      }
    }
    return {
      activeName: 'first',
      activeName1: 'first',
      tableData:[],
      tableDataTimeFirst:['00:00~30:00','00:30~01:00','01:00~01:30','01:30~02:00','02:00~02:30','02:30~03:00','03:00~03:30','03:30~04:00','04:00~04:30','04:30~05:00','05:00~05:30','05:30~06:00'],
      tableDataTimeSecond:['06:00~06:30','06:30~07:00','07:00~07:30','07:30~08:00','08:00~08:30','08:30~09:00','09:00~09:30','09:30~10:00','10:00~10:30','10:30~11:00','11:00~11:30','11:30~12:00'],
      tableDataTimeThird:['12:00~12:30','12:30~13:00','13:00~13:30','13:30~14:00','14:00~14:30','14:30~15:00','15:00~15:30','15:30~16:00','16:00~16:30','16:30~17:00','17:00~17:30','17:30~18:00'],
      tableDataTimeFourth:['18:00~18:30','18:30~19:00','19:00~19:30','19:30~20:00','20:00~20:30','21:30~21:00','21:00~21:30','21:30~22:00','22:00~22:30','22:30~23:00','23:00~23:30','23:30~24:00'],
      tableDataFirst:[],
      tableDataSecond:[],
      tableDataThird:[],
      tableDataFourth:[],
      basicEprice:[], //基础电价
      slowPrice:[], //慢充服务费
      sSum:[], //电价和慢充服务费
      fastPrice:[], // 快充服务费
      fSum:[], //电价和快充服务费
      dialogFormVisible:false,
      formLabelWidth: '120px',
      id:0,
      form:{
        index:0,
        createTime:'',
        ePrice:'',
        sPrice:'',
        fPrice:'',
      },
      //表单验证
      rules:{
        ePrice:[
          {validator:ePrice,trigger:'blur'}
        ],
        sPrice:[
          {validator:sPrice,trigger:'blur'}
        ],
        fPrice:[
          {validator:fPrice,trigger:'blur'}
        ],
      }
    }
  },
  // mounted(){
  //   let vm = this
  //   var xData = ['00：30','01：00','01：30','02：00','02：30','03：00','03：30','04：00','04：30','05：00','05：30','06：00']
  //   var id = 'slowDetails'
  //   // this.getesPrice(id,xData,vm.slowPrice,vm.basicEprice,vm.sSum)
  // },
  methods:{
    //tabs切换
    handleClick(tab, event) {
      let vm = this
      var xData = []
      vm.basicEprice = []
      vm.slowPrice= []
      vm.sSum= []
      vm.fastPrice= []
      vm.fSum= []
      if(vm.activeName == 'first'){
        vm.tableDataFirst.map(item =>{
          vm.slowPrice.push(item.sPrice)  // 慢充服务费
          vm.fastPrice.push(item.fPrice)  // 快充服务费
          vm.basicEprice.push(item.ePrice) // 基础电价
        })
        vm.fSum = priceCount.fPrice(vm.tableDataFirst)  // 快充 + 基础电价 总费
        vm.sSum = priceCount.sPrice(vm.tableDataFirst)  // 慢充 + 基础电价 总费
        // 时间段
        xData = ['00：30','01：00','01：30','02：00','02：30','03：00','03：30','04：00','04：30','05：00','05：30','06：00']
      }else if(vm.activeName == 'second'){
        vm.tableDataSecond.map(item =>{
          vm.slowPrice.push(item.sPrice)  // 慢充服务费
          vm.fastPrice.push(item.fPrice)  // 快充服务费
          vm.basicEprice.push(item.ePrice) // 基础电价
        })
        vm.fSum = priceCount.fPrice(vm.tableDataSecond)  // 快充 + 基础电价 总费
        vm.sSum = priceCount.sPrice(vm.tableDataSecond)  // 慢充 + 基础电价 总费
        // 时间段
        xData = ['06：30','07：00','07：30','08：00','08：30','09：00','09：30','10：00','10：30','11：00','11：30','12：00']
      }else if(vm.activeName == 'third'){
        vm.tableDataThird.map(item =>{
          vm.slowPrice.push(item.sPrice)  // 慢充服务费
          vm.fastPrice.push(item.fPrice)  // 快充服务费
          vm.basicEprice.push(item.ePrice) // 基础电价
        })
        vm.fSum = priceCount.fPrice(vm.tableDataThird)  // 快充 + 基础电价 总费
        vm.sSum = priceCount.sPrice(vm.tableDataThird)  // 慢充 + 基础电价 总费
        // 时间段
        xData = ['12：30','13：00','13.30','14：00','14：30','15：00','15：30','16：00','16：30','17：00','17：30','18：00']
      }else{
        vm.tableDataFourth.map(item =>{
          vm.slowPrice.push(item.sPrice)  // 慢充服务费
          vm.fastPrice.push(item.fPrice)  // 快充服务费
          vm.basicEprice.push(item.ePrice) // 基础电价
        })
        vm.fSum = priceCount.fPrice(vm.tableDataFourth)  // 快充 + 基础电价 总费
        vm.sSum = priceCount.sPrice(vm.tableDataFourth)  // 慢充 + 基础电价 总费
        // 时间段
        xData = ['18：30','19：00','19.30','20：00','20：30','21：00','21：30','22：00','22：30','23：00','23：30','24：00']
      }
      if(vm.activeName1 == 'first'){
        this.getesPrice('slowDetails',xData,vm.slowPrice,vm.basicEprice,vm.sSum)
      }else{
        this.getesPrice('fastDetails',xData,vm.fastPrice,vm.basicEprice,vm.fSum)
      }
    },
    //电价服务费ECharts表
    getesPrice(id,xData,slowPrice,basicEprice,sSum){
      let vm = this
      vm.$ajax({
        method:'get',
        url:'/api/rate/'+vm.$route.query.siteId,
        headers:{'token':sessionStorage.getItem('token')}
      }).then(res => {
        if(res.data.code == 200){
          var myChart = echarts.init(document.getElementById(id))
          var option = {
            tooltip: {
              trigger: 'axis',
              axisPointer : { // 坐标轴指示器，坐标轴触发有效
                type : 'none' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data:['电价费','服务费','电价和服务费']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              data: xData,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel:{interval: 0}
            },
            yAxis: {
              type: 'value',
              name: '单位(元)',
              splitLine:{
                show:false
              }
            },
            series: [
              {
                  name:'电价费',
                  type:'line',
                  data:basicEprice
              },
              {
                  name:'服务费',
                  type:'line',
                  data:slowPrice
              },
              {
                  name:'电价和服务费',
                  type:'line',
                  data:sSum
              },
            ]
          };
          myChart.setOption(option)
        }
      })
      
    },
    //获取电站费率信息
    getSiteRate(){
      let vm = this
      vm.$ajax({
        method:'get',
        url:'/api/rate/'+vm.$route.query.siteId,
        headers:{'token':sessionStorage.getItem('token')}
      }).then(res => {
        if(res.data.code == 200){
          // vm.tableData = JSON.parse(res.data.data.rate)
          vm.tableData = eval('(' + res.data.data.rate + ')');  // JSON字符串转JSON对象
          // 单位转换
          for(var j= 0;j<vm.tableData.length;j++){
            vm.tableData[j].sPrice = (vm.tableData[j].sPrice / 100).toFixed(2)
            vm.tableData[j].fPrice = (vm.tableData[j].fPrice / 100).toFixed(2)
            vm.tableData[j].ePrice = (vm.tableData[j].ePrice / 100).toFixed(2)
          }
          vm.id = res.data.data.id  // 费率ID 
          // 00:00 ~ 06:00
          let first = vm.tableData.slice(0,12)
          for(var j= 0;j<first.length;j++){
            vm.tableDataFirst.push({'createTime':vm.tableDataTimeFirst[j],'ePrice':first[j].ePrice,'fPrice':first[j].fPrice,'sPrice':first[j].sPrice})
          }
          vm.tableDataFirst.map(item =>{
            vm.slowPrice.push(item.sPrice)
            vm.fastPrice.push(item.fPrice)
            vm.basicEprice.push(item.ePrice)
          })
          for(var i = 0 ; i < vm.tableDataFirst.length;i++){
            let slowSum = (parseFloat(vm.slowPrice[i])+parseFloat(vm.basicEprice[i])).toFixed(2)
            let fastSum = (parseFloat(vm.fastPrice[i])+parseFloat(vm.basicEprice[i])).toFixed(2)
            vm.sSum.push(slowSum)
            vm.fSum.push(fastSum)
          }
          // 06:00 ~ 12:00
          let second = vm.tableData.slice(12,24)
          for(var j= 0;j<second.length;j++){
            vm.tableDataSecond.push({'createTime':vm.tableDataTimeSecond[j],'ePrice':second[j].ePrice,'fPrice':second[j].fPrice,'sPrice':second[j].sPrice})
          }
          // 12:00 ~ 18:00
          let third = vm.tableData.slice(24,36)
          for(var j= 0;j<third.length;j++){
            vm.tableDataThird.push({'createTime':vm.tableDataTimeThird[j],'ePrice':third[j].ePrice,'fPrice':third[j].fPrice,'sPrice':third[j].sPrice})
          }
          // 18:00 ~ 24:00
          let fourth = vm.tableData.slice(36,48)
          for(var j= 0;j<fourth.length;j++){
            vm.tableDataFourth.push({'createTime':vm.tableDataTimeFourth[j],'ePrice':fourth[j].ePrice,'fPrice':fourth[j].fPrice,'sPrice':fourth[j].sPrice})
          }
        }
      })
    },
    // 编辑对话框
    handleEditor(index,row){
      let vm = this
      vm.form.index = index
      vm.form.createTime = row.createTime
      vm.form.ePrice = row.ePrice
      vm.form.sPrice = row.sPrice
      vm.form.fPrice = row.fPrice
      vm.dialogFormVisible = true
    },
    // 修改电价/服务费
    subaMend(){
      let vm = this
      let reg =/^[0-9]+([.]{1}[0-9]{2})?$/
      let eId = parseInt(vm.$route.query.siteId)
      let rateIndex = 0
      let rate = {}
      if(vm.form.ePrice === '' || reg.test(vm.form.ePrice) == false || vm.form.sPrice === '' || reg.test(vm.form.sPrice) == false || vm.form.fPrice === '' || reg.test(vm.form.fPrice) == false){
        return false;
      }else{
        if(vm.activeName == 'first'){
          rateIndex =  vm.form.index
        }else if(vm.activeName == 'second'){
          rateIndex =  vm.form.index + 12
        }else if(vm.activeName == 'third'){
          rateIndex =  vm.form.index + 24
        }else{
          rateIndex =  vm.form.index + 36
        }
        rate.ePrice = vm.form.ePrice
        rate.fPrice = vm.form.fPrice
        rate.sPrice = vm.form.sPrice
        vm.tableData[rateIndex] = rate
        vm.tableData.map(item => {
          item.ePrice = Math.ceil(item.ePrice * 100)
          item.fPrice = Math.ceil(item.fPrice * 100)
          item.sPrice = Math.ceil(item.sPrice * 100)
        })
        let rateStr =JSON.stringify(vm.tableData)
        vm.$ajax({
          method:'put',
          url:'/api/rate',
          headers:{'token':sessionStorage.getItem('token')},
          data:{
            id:vm.id,
            rate:rateStr
          }
        }).then(res =>{
          if(res.data.code == 200){
            this.$alert('修改成功','提示',{
              confirmButtonText:'确定',
              callback:action =>{
                vm.tableData = []
                vm.tableDataFirst = [],
                vm.tableDataSecond = [],
                vm.tableDataThird = [],
                vm.tableDataFourth = [],
                vm.dialogFormVisible = false
                vm.getSiteRate()
                vm.handleClick()
              }
            })
          }
        })
      }
    },
    // 清除验证
    close(formname){
      let vm = this
      vm.$refs[formname].resetFields()
    },
  },
  created(){
    this.getSiteRate()
    this.handleClick()
  }
}
</script>