<template>
  <div style="margin-top:30px;">
    <!-- 查询 -->
    <el-row class="search">
      <el-col :span="4" class="colStyle">
        <el-input
          placeholder="手机号码"
          v-model="phone"
          class="inputStyle"
          @change="RestorePhone"
          clearable
        ></el-input>
      </el-col>
       <el-col :span="4" class="colStyle">
      <el-select
          v-model="financeStatus"
          placeholder="财务状态"
          class="inputStyle"
          clearable
          @change="changeQuery"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-col>
      <el-col :span="4" class="colStyle">
        <div class="block">
          <el-date-picker
            v-model="month"
            value-format="yyyy-M"
            :default-value="new Date()"
            type="month"
            placeholder="选择年月"
          ></el-date-picker>
        </div>
      </el-col>

      <el-col :span="5">
        <el-button type="primary" class="query" @click="query">查询</el-button>
        <el-button
          class="add"
          type="primary"
          style="margin-left:10%"
          icon="document"
          @click="handleDownload"
          :loading="downloadLoading"
        >导出报表</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="手机号码"></el-table-column>
       <el-table-column prop="beginTime" label="开始时间"></el-table-column>
      <el-table-column prop="ctime" label="结束时间"></el-table-column>
      <el-table-column prop="czConsumptionMonth" label="本月充值消费金额"></el-table-column>
      <el-table-column prop="lastBalance" label="上月充值余额"></el-table-column>
      <el-table-column prop="balance" label="当前充值余额"></el-table-column>
      <el-table-column prop="rechargeMonth" label="本月充值金额"></el-table-column>
      <el-table-column prop="refundMonth" label="本月退款金额"></el-table-column>
      <el-table-column prop="dValue" label="异常差值金额 "></el-table-column>
       <!-- <el-table-column  label="操作" >
         <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="medium " v-show='scope.$index<page_size'>退款</el-button>
       </template>
       </el-table-column> -->
    </el-table>
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
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
var myDate = new Date();
let currentdate = myDate.getDate();
let currentmonth = myDate.getMonth() + 1;
let currentyear = myDate.getFullYear();
export default {
  created() {
    this.query();
  },
  data() {
    return {
      phone: null,
      month: null,
      downloadLoading: false,
      tableData: [],
      // 分页
      current_page: 1,
      page_size: 10,
      total: 0,
      financeStatus:null,
           options:[
                {
                value:'0',
                label:'正常'
            },
                {
                value:'1',
                label:'异常'
            },
            ],
    
    };
    
  },
  methods: {
     
    changeQuery(){
      this.query();
    },
    RestorePhone() {
      if (this.phone !== "") {
        this.query();
      }
    },
    //导出报表的点击事件
    handleDownload() {
      let vm = this;
      let month = "";
      let year = currentyear;
      if (vm.month == "" || vm.month == null) {
        if (currentdate < 28) {
          month = currentmonth - 1;
        } else {
          month = currentmonth;
        }
      } else {
        month = parseInt(vm.month.split("-")[1]);
        year = parseInt(vm.month.split("-")[0]);
      }
      let testphone = "";
      if (vm.phone !== "") {
        testphone = "&phone=" + vm.phone;
      }
   
      vm.$ajax({
        method: "get",
        url:
          "/api/user/balance",
        headers: { token: sessionStorage.getItem("token") },
        params:{
          year:year,
          month:month,
          status:vm.financeStatus ,
          phone:vm.phone
        }
      }).then(res => {
        if (res.data.code == 200) {
          vm.dataList = res.data.data.list;
          console.log("返回的异常用户列表", vm.dataList);
          vm.downloadLoading = true;
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../vendor/Export2Excel.js");

            const tHeader = [
              "手机号码",
                "开始时间",
              "结束时间",
              "本月充值消费金额",
              "上月充值余额",
              "当前充值余额",
              "本月充值金额",
              "本月退款金额",
              "异常差值金额"
            ];
            const filterVal = [
              "phone",
              "beginTime",
              "ctime",
              "czConsumptionMonth",
              "lastBalance",
              "balance",
              "rechargeMonth",
              "refundMonth",
              "dValue"
            ];
            const list = this.dataList;
            list.map(item=>{
               item.czConsumptionMonth = parseFloat(
              item.czConsumptionMonth / 100
            ).toFixed(2);
            item.lastBalance = parseFloat(item.lastBalance / 100).toFixed(2);
            item.balance = parseFloat(item.balance / 100).toFixed(2);
            item.rechargeMonth = parseFloat(item.rechargeMonth / 100).toFixed(
              2
            );
            item.refundMonth = parseFloat(item.refundMonth / 100).toFixed(2);
            item.dValue = parseFloat(item.dValue / 100).toFixed(2);
            })
              let tongji={phone:'统计',beginTime:'--',ctime:'--',czConsumptionMonth:0,lastBalance:0,balance:0,rechargeMonth:0,refundMonth:0,dValue:0};
                            for(let i=0;i<list.length;i++){
                                 tongji.czConsumptionMonth+=Number(this.dataList[i].czConsumptionMonth) 
                                 tongji.lastBalance+=Number(this.dataList[i].lastBalance) 
                                 tongji.balance+=Number(this.dataList[i].balance) 
                                 tongji.rechargeMonth+=Number(this.dataList[i].rechargeMonth) 
                                 tongji.refundMonth+=Number(this.dataList[i].refundMonth) 
                                 tongji.dValue+=Number(this.dataList[i].dValue) 
                            }
                            // tongji.balance=tongji.balance.toFixed(2)
                            // console.log("dddd",tongji)
                            list.push(tongji)
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "用户财务列表");
            this.downloadLoading = false;
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //查询的点击事件
    query() {
      let vm = this;
      let month = "";
      let year = currentyear;
      
      if (vm.month == null || vm.month == "") {
        if (currentdate < 28) {
          month = currentmonth - 1;
        } else {
          month = currentmonth;
        }
      } else {
        month = parseInt(vm.month.split("-")[1]);
        year = parseInt(vm.month.split("-")[0]);
      }
      
      let testphone = "";
      if (vm.phone !== "") {
        testphone = "&phone=" + vm.phone;
      }
      // let pagesize = vm.page_size == 0 ? "10" : vm.page_size;
  
     //获取当前表格数据
    
      vm.$ajax({
        method: "get",
        url: "/api/user/balance",
        headers: { token: sessionStorage.getItem("token") },
             params:{
               page:vm.current_page,
               size:vm.page_size,
          year:year,
          month:month,
          status:vm.financeStatus ,
          phone:vm.phone
        }
      }).then(res => {
        if (res.data.code == 200) {
          vm.tableData = res.data.data.list;       
          vm.tableData.map(item => {
            item.czConsumptionMonth = parseFloat(
              item.czConsumptionMonth / 100
            ).toFixed(2);
            item.lastBalance = parseFloat(item.lastBalance / 100).toFixed(2);
            item.balance = parseFloat(item.balance / 100).toFixed(2);
            item.rechargeMonth = parseFloat(item.rechargeMonth / 100).toFixed(
              2
            );
            item.refundMonth = parseFloat(item.refundMonth / 100).toFixed(2);
            item.dValue = parseFloat(item.dValue / 100).toFixed(2);
          });
         
          //获取所有的用户数据用来统计
           vm.$ajax({
        method: "get",
        url:
          "/api/user/balance",
        headers: { token: sessionStorage.getItem("token") },
        params:{
          year:year,
          month:month,
          status:vm.financeStatus ,
          phone:vm.phone
        }
      }).then(res => {
        if (res.data.code == 200) {
          vm.dataList = res.data.data.list;
           vm.dataList.map(item=>{
               item.czConsumptionMonth = parseFloat(
              item.czConsumptionMonth / 100
            ).toFixed(2);
            item.lastBalance = parseFloat(item.lastBalance / 100).toFixed(2);
            item.balance = parseFloat(item.balance / 100).toFixed(2);
            item.rechargeMonth = parseFloat(item.rechargeMonth / 100).toFixed(
              2
            );
            item.refundMonth = parseFloat(item.refundMonth / 100).toFixed(2);
            item.dValue = parseFloat(item.dValue / 100).toFixed(2);
            })   
              let tongji={phone:'\xa0\xa0\xa0'+'统计',beginTime:'--',ctime:'--',czConsumptionMonth:0,lastBalance:0,balance:0,rechargeMonth:0,refundMonth:0,dValue:0}; 
              for(let i=0;i< vm.dataList.length;i++){
                                 tongji.czConsumptionMonth+=Number(this.dataList[i].czConsumptionMonth) 
                                 tongji.lastBalance+=Number(this.dataList[i].lastBalance) 
                                 tongji.balance+=Number(this.dataList[i].balance) 
                                 tongji.rechargeMonth+=Number(this.dataList[i].rechargeMonth) 
                                 tongji.refundMonth+=Number(this.dataList[i].refundMonth) 
                                 tongji.dValue+=Number(this.dataList[i].dValue) 
                            }  
                             tongji.balance=Number(tongji.balance).toFixed(2)
                             tongji.czConsumptionMonth=Number(tongji.czConsumptionMonth).toFixed(2)
                             tongji.lastBalance=Number(tongji.lastBalance).toFixed(2)
                             tongji.rechargeMonth=Number( tongji.rechargeMonth) .toFixed(2)
                             tongji.refundMonth=Number(tongji.refundMonth).toFixed(2)
                             tongji.dValue=Number(tongji.dValue).toFixed(2)    
                            
                             vm.tableData.push(tongji)       
        }
      });        

          vm.total = res.data.data.total;
        }
      });
    },
    //当前页数据条数改变触发
    handleSizeChange(val) {
      this.page_size=val;
      this.query();
    },
    //当前页改变触发
    handleCurrentChange(val) {
      this.current_page = val;
        this.query();
    }
  }
};
</script>

<style>
</style>
