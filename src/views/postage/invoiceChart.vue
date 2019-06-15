<!-- 实收 -->
<template>
  <div class="card" style="margin:30px 0 0 20px">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="发票列表" name="0">
            <invoices-list  :activeName="activeName"  ></invoices-list >
          </el-tab-pane>
          <el-tab-pane label="订单列表" name="1">
            <invoices-order-list :activeName="activeName"  ></invoices-order-list>
          </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import invoicesList  from './components/invoicesList.vue'
  import invoicesOrderList from './components/invoicesOrderList.vue'
export default {
     components:{
      invoicesList,
      invoicesOrderList
    },
    data() {
      return {
        activeName: '0',
      }
    },
    methods: {
      //标签切换
      handleClick(tab, event) {
        // console.log("activeName",this.activeName)
        // sessionStorage.setItem('activeName',this.activeName)  
      },
    },
    created(){
        // this.activeName = sessionStorage.getItem('activeName')
    },
  
  };
    
</script>