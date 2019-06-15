<template>
  <div style="margin-top:30px;">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="sitename" label="电站名称" width="150"></el-table-column>
      <el-table-column prop="qr_code" label="电桩编号" width="100"></el-table-column>
      <el-table-column prop="cost" label="充电消费(元)" width="120"></el-table-column>
      <el-table-column prop="cprice" label="电费(元)" width="90"></el-table-column>
      <el-table-column prop="sprice" label="服务费(元)" width="120"></el-table-column>
      <el-table-column prop="parking_fee" label="停车费(元)" width="120"></el-table-column>
      <el-table-column prop="duration" width="150" label="持续充电时间"></el-table-column>
      <el-table-column prop="begin_time" width="170" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" width="170" label="结束时间"></el-table-column>
      <el-table-column prop="electric_quantity" width="100" label="充电电量"></el-table-column>
      <el-table-column prop="status" label="充电状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">待支付</span>
          <span v-if="scope.row.status==1">充电中</span>
          <span v-if="scope.row.status==2">支付成功</span>
          <span v-if="scope.row.status==3">已完成</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import url from "../../../config/url.js";
export default {
  name: "ChargingList",
  props: ["tableData"],
  data() {
    return {};
  }
};
</script>
<style>

</style>