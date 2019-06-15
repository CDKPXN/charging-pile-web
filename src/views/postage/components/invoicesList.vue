<template>
  <div style="position:relative">
    <!-- 查询方式 -->
    <el-row class="search" style="width:96%">
      <el-col :span="4" class="colStyle">
        <el-input
          placeholder="发票号码"
          v-model="fphm"
          class="inputStyle"
          @change="RestoreFphm"
          clearable
        ></el-input>
      </el-col>
       <el-col :span="4" class="colStyle">
        <el-select
          v-model="fpStatus"
          placeholder="发票状态"
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
      <el-col :span="7" style="width:435px">
        <el-date-picker
          v-model="beginEndTime"
          @change="changeDate"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
    <!-- 数据表 -->
    <el-table :data="tableData">
      <el-table-column prop="gfmc" label="购方名称"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="fphm" label="发票号码"></el-table-column>
      <el-table-column prop="count" label="子单据数"></el-table-column>
      <el-table-column prop="jshj" label="价税合计"></el-table-column>
      <el-table-column prop="ctime" label="发票申请时间"></el-table-column>
      <el-table-column label="发票状态">
        <template slot-scope="scope">
          <div slot="reference">
            <span v-if="scope.row.status==0">待开票</span>
            <span v-else>己开票</span>
          </div>
        </template>
      </el-table-column>
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
export default {
  name: "detailPaid",
  data() {
    return {
      tableData: [],
      // 分页
      total: 0,
      current_page: 1,
      page_size: 10,
      beginEndTime: "",
      beginTime: "",
      endTime: "",
      fphm: "",
      downloadLoading: false,
      fpStatus:null,
        options:[
                {
                value:'0',
                label:'开票中'
            },
                {
                value:'1',
                label:'己开票'
            },
            ],
    };
  },
  methods: {
    //发票状态过滤
    changeQuery(){
      if (this.fphm == "") {
        this.fphm = null;
      }
      this.query();
    },
    //发票号码过滤
    RestoreFphm() {
      if (this.fphm == "") {
        this.fphm = null;
      }
      this.query();
    },
    //开票记录查询
    query() {
      let vm = this;
      if (vm.beginEndTime != "") {
        vm.beginTime = vm.beginEndTime[0];
        vm.endTime = vm.beginEndTime[0];
      }
      vm.$ajax({
        method: "get",
        url: "/api/invoice",
        headers: { token: sessionStorage.getItem("token") },
        params: {
          beginTime: vm.beginTime,
          endTime: vm.endTime,
          page: vm.current_page,
          size: vm.page_size,
          fphm: vm.fphm,
          status:vm.fpStatus
          
        }
      }).then(res => {
        console.log("发票列表：", res);
        if (res.data.code == 200) {
          console.log(res.data.data.list);
          vm.tableData = res.data.data.list;
          // vm.tableData = res.data.data.list.slice(0, 10);
          vm.tableData.map(m => {
            m.jshj = parseFloat(m.jshj / 100).toFixed(2);
          });
          vm.total = res.data.data.total;
        }
      });
    },
    //数据刷选
    changeDate() {
      if (this.beginEndTime === "" || this.beginEndTime == null) {
        this.query();
      }
    },
    //当前页数据条数改变触发
    handleSizeChange(val) {
      this.page_size = val;
      this.query();
    },
    //当前页改变触发
    handleCurrentChange(val) {
      this.current_page = val;
      this.query();
    },
    //导出报表的点击事件
    handleDownload() {
      let vm = this;
      if (vm.beginEndTime != "") {
        vm.beginTime = vm.beginEndTime[0];
        vm.endTime = vm.beginEndTime[0];
      }
      vm.$ajax({
        method: "get",
        url: "/api/invoice",
        headers: { token: sessionStorage.getItem("token") },
        params: {
          beginTime: vm.beginTime,
          endTime: vm.endTime,
          fphm: vm.fphm,
           status:vm.fpStatus
        }
      }).then(res => {
        console.log("发票列表：", res);

        if (res.data.code == 200) {
          let dataList = res.data.data.list;
          dataList.map(m => {
            m.jshj = parseFloat(m.jshj / 100).toFixed(2);
            m.status= m.status==0?"开票中":"已开票";
          });
          console.log("返回的异常用户列表", dataList);
          vm.downloadLoading = true;
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../vendor/Export2Excel.js");

      // <el-table-column prop="gfmc" label="购方名称"></el-table-column>
      // <el-table-column prop="email" label="邮箱"></el-table-column>
      // <el-table-column prop="fphm" label="发票号码"></el-table-column>
      // <el-table-column prop="count" label="子单据数"></el-table-column>
      // <el-table-column prop="jshj" label="价税合计"></el-table-column>
      // <el-table-column prop="ctime" label="发票申请时间"></el-table-column>
      // <el-table-column label="发票状态">

            const tHeader = [
              "购方名称",
              "邮箱",
              "发票号码",
              "子单据数",
              "价税合计",
              "发票申请时间",
              "发票状态"
            ];
            const filterVal = [
              "gfmc",
              "email",
              "fphm",
              "count",
              "jshj",
              "ctime",
              "status"
            ];
            const list = dataList;

            const data = vm.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "异常用户列表");
            vm.downloadLoading = false;
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    this.query();
  }
};
</script>

<style>
</style>
