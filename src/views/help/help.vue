<template>
    <div style="width:1140px;margin-left:8%">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="TabStyle">
        <el-tab-pane label="总览" name="first">
          <help-over-view></help-over-view>
        </el-tab-pane>
        <el-tab-pane label="财务">
          <financial></financial>
        </el-tab-pane>
        <el-tab-pane label="站点">
          <site></site>
        </el-tab-pane>
        <el-tab-pane label="用户">
          <user></user>
        </el-tab-pane>
        <el-tab-pane label="订单">
          <order></order>
        </el-tab-pane>
        <el-tab-pane label="车辆">
          <vehicle></vehicle>
        </el-tab-pane>
        <el-tab-pane label="告警">
          <alarm></alarm>
        </el-tab-pane>
        <el-tab-pane label="统计">
          <statistical></statistical>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
import helpOverView from './components/helpOverView'
import Financial from './components/financial'
import Site from './components/site'
import User from './components/user'
import Order from './components/order'
import Vehicle from './components/vehicle'
import Statistical from './components/statistical'
import Alarm from './components/alarm'
  export default {
    components:{
      helpOverView,
      Financial,
      Site,
      User,
      Order,
      Vehicle,
      Statistical,
      Alarm
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  }
</script>
<style>
    @import '../../style/help.scss';
</style>