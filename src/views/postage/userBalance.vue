
<template>
     <div class="card" style="margin:30px 0 0 20px">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="正常用户表" name="0">
            <invioceCharts  :activeName="activeName"  ></invioceCharts>
          </el-tab-pane> -->
          <el-tab-pane label="用户财务表" name="0">
            <faultlist :activeName="activeName"  ></faultlist>
          </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import invioceCharts  from './components/userBalanceNormal.vue'
  import faultlist from './components/userBalanceAbnormal.vue'
  export default {
    components:{
      faultlist,
      invioceCharts
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

<style>

</style>
