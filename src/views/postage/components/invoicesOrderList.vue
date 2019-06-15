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
      <el-col :span="2">
        <el-button type="primary" class="query" @click="query">查询</el-button>
      </el-col>
    </el-row>
    <!-- 数据表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="sitename" label="电站名称" width="150"></el-table-column>
      <el-table-column prop="qr_code" label="电桩编号" width="100"></el-table-column>
      <el-table-column prop="cz_cprice" label="电费(元)" width="90"></el-table-column>
      <el-table-column prop="cz_sprice" label="服务费(元)" width="120"></el-table-column>
      <el-table-column prop="cz_pprice" label="停车费(元)" width="120"></el-table-column>
      <el-table-column prop="duration" width="150" label="持续充电时间"></el-table-column>
      <el-table-column prop="end_time" width="170" label="结束时间"></el-table-column>
      <el-table-column prop="electric_quantity" width="100" label="充电电量"></el-table-column>
        <el-table-column prop="fphm" label="发票号码"></el-table-column>
      <el-table-column prop="fp_status" label="发票状态">
        <template slot-scope="scope">
          <span v-if="scope.row.fp_status==0">开票中</span>
          <span v-if="scope.row.fp_status==1">己开票</span>
          <span v-if="scope.row.fp_status==2">未开票</span>
          <span v-if="scope.row.fp_status==3">己过期</span>
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
      fphm: null,
      fpStatus: null,     
            options:[
                {
                value:'0',
                label:'开票中'
            },
                {
                value:'1',
                label:'己开票'
            },{
                value:'2',
                label:'未开票'
            },{
                value:'3',
                label:'己过期'
            }
            ],
    };
  },
  methods: {
      changeQuery(){
        if (this.fpStatus !== "") {
        this.query();
      }
      },
    //发票号码过滤
    RestoreFphm() {
        if(this.fphm =="")
        {
            this.fphm=null;
        }
        this.query();
      
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
    //开票记录查询
    query() {
      let vm = this;
      if (vm.beginEndTime != "") {
        vm.beginTime = vm.beginEndTime[0];
        vm.endTime = vm.beginEndTime[1];
      }
      vm.$ajax({
        method: "get",
        url: "/api/invoice/orders",
        headers: { token: sessionStorage.getItem("token") },
        params: {
          page: vm.current_page,
          size: vm.page_size,
          beginTime: vm.beginTime,
          endTime: vm.endTime,
          fphm: vm.fphm,
          fpStatus: vm.fpStatus
        }
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          //   vm.tableData = res.data.data.list.slice(0, 10);
          vm.tableData = res.data.data.list;
    //           <el-table-column prop="cz_cprice" label="电费(元)" width="90"></el-table-column>
    //   <el-table-column prop="cz_sprice" label="服务费(元)" width="120"></el-table-column>
    //   <el-table-column prop="cz_pprice" label="停车费(元)" width="120"></el-table-column>
    //   <el-table-column prop="duration" width="150" label="持续充电时间"></el-table-column>

    //   <el-table-column prop="electric_quantity" width="100" label="充电电量"></el-table-column>
        vm.tableData.map(m=>{
                m.cz_cprice = parseFloat( m.cz_cprice /100).toFixed(2)
                 m.cz_sprice = parseFloat( m.cz_sprice /100).toFixed(2)
                  m.cz_pprice = parseFloat( m.cz_pprice /100).toFixed(2)
                     var Hours = parseInt(m.duration / 3600)
                        var Minutes = parseInt(parseInt(m.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(m.duration % 3600) % 60)
                        m.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
        })
          vm.total = res.data.data.total;
        }
      });
    },
    //数据刷选
    changeDate() {
      if (this.beginEndTime === "" || this.beginEndTime == null) {
        this.query();
      }
    }
  },
  created() {
    this.query();
  }
};
</script>

<style>
</style>
