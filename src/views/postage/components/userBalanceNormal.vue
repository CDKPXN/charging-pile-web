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
        <div class="block">      
          <el-date-picker v-model="month"  value-format="yyyy-M"  :default-value='new Date()' type="month" placeholder="选择年月"></el-date-picker>
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
       <el-table-column prop="ctime" label="统计时间"></el-table-column>
      <el-table-column prop="czConsumptionMonth" label="本月充值消费金额"></el-table-column>
      <el-table-column prop="lastBalance" label="上月充值金额"></el-table-column>
      <el-table-column prop="balance" label="用户当前充值金额(元)"></el-table-column>
      <el-table-column prop="rechargeMonth" label="本月充值金额"></el-table-column>
      <el-table-column prop="refundMonth" label="本月退款金额"></el-table-column>
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
let currentyear=myDate.getFullYear();
// import { api_modifyOwner } from "../../api/index.js";
// import { currentId } from 'async_hooks';
export default {
  props: ["activeName"],
  
  data() {
    return {
      phone: "",
      status: "",
      tableData: [],
      sellectstatus: "",
      month: "",
      year:'',
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 分页
      current_page: 1,
      page_size: 10,
      total: 0,
      dataList: [],
      downloadLoading: false,
      dialogFormCharge: false,
      count: 0,
      uid: ""
    };
  },
  watch: {
    form: {
      handler(newPhone, oldPhone) {
        console.log();
      },
      // immediate: true,
      deep: true
    }
  },
  created() {
    let vm = this;
    vm.sellectstatus = this.activeName;
    vm.query();
  },
  methods: {
  
    RestorePhone() {
      if (this.phone !== "") {
        this.query();
      }
    },
   
    query() {
       let vm = this; 
       let month='';
       let year=currentyear;
      
      if(vm.month==''){
      if(currentdate<28){    
             month=currentmonth-1;          
      }else{    
             month=currentmonth;               
      }
      }else{
            month=parseInt(vm.month.split('-')[1]); 
            year=parseInt(vm.month.split('-')[0]);
      }
      let testphone='';
      if(vm.phone!==''){
         testphone='&phone='+vm.phone
      }
         let pagesize= vm.page_size == 0?'10':vm.page_size;
         let url= "/api/user/balance?"+'year='+year+"&month="+month+"&status="+0+"&page="+vm.current_page+"&size="+pagesize+testphone 
          console.log("url",url)
      vm.$ajax({
        method: "get",
        url:url,
        headers: { token: sessionStorage.getItem("token") }
      }).then(res => {
          console.log(res)
        if (res.data.code == 200) {     

             vm.tableData = res.data.data.list
             vm.tableData.map(item=>{
                item.czConsumptionMonth=parseFloat((item.czConsumptionMonth)/100).toFixed(2)
                 item.lastBalance=parseFloat((item.lastBalance)/100).toFixed(2)
                  item.balance=parseFloat((item.balance)/100).toFixed(2)
                   item.rechargeMonth=parseFloat((item.rechargeMonth)/100).toFixed(2)
                    item.refundMonth=parseFloat((item.refundMonth)/100).toFixed(2)
             })
               console.log("用户列表", res.data.data.list); 
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
    },
    //导出数据
    handleDownload() {
      let vm = this;
       let month='';
       let year=currentyear;
      
      if(vm.month==""){
      if(currentdate<28){    
             month=currentmonth-1;          
      }else{    
             month=currentmonth;               
      }
      }else{
            month=parseInt(vm.month.split('-')[1]); 
            year=parseInt(vm.month.split('-')[0]);
      }
       let testphone='';
      if(vm.phone!==''){
         testphone='&phone='+vm.phone
      }
      console.log("导出正常用户url","/api/user/balance?"+'year='+year+"&month="+month+"&status="+1+testphone)
      vm.$ajax({
        method: "get",
        url: "/api/user/balance?"+'year='+year+"&month="+month+"&status="+0+testphone ,
        headers: { token: sessionStorage.getItem("token") },
      }).then(res => {
        if (res.data.code == 200) {
          vm.dataList = res.data.data.list;
          console.log("返回的正常用户列表",vm.dataList)
        
          vm.downloadLoading = true;
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../vendor/Export2Excel.js");
            const tHeader = [
             
              "手机号码",
              "统计时间",
              "本月充值消费金额",
              "上月充值金额",
              "用户当前充值金额(元)",
              "本月充值金额",
              "本月退款金额",
              
            ];
            const filterVal = [
            
              "phone",
              "ctime",
              "czConsumptionMonth",
              "lastBalance",
              "balance",
              "rechargeMonth",
              "refundMonth",
              
            ];
            const list = this.dataList;
            list.map(item=>{
                item.czConsumptionMonth=parseFloat((item.czConsumptionMonth)/100).toFixed(2)
                 item.lastBalance=parseFloat((item.lastBalance)/100).toFixed(2)
                  item.balance=parseFloat((item.balance)/100).toFixed(2)
                   item.rechargeMonth=parseFloat((item.rechargeMonth)/100).toFixed(2)
                    item.refundMonth=parseFloat((item.refundMonth)/100).toFixed(2)
             })
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "正常用户列表");
            this.downloadLoading = false;
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
  
  }
}
</script>