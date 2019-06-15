<template>
  <div class="main">
    <el-card class="box-card">
      <div style="margin-left:20px;">
        <el-row>
          <el-col :span="4" class="colStyle">
            <el-input placeholder="充电站名称" class="inputStyle" v-model="criteria.siteName" @change="RestoreName" clearable>
            </el-input>
          </el-col>
          <el-col :span="4" class="colStyle">
            <el-select placeholder="阅读状态" class="inputStyle" v-model="status" @change="RestoreStutas" clearable>
              <el-option
                v-for="item in statusArry"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="colStyle">
            <el-input placeholder="电桩编号" class="inputStyle" @change="RestoreNum" v-model="criteria.pileNum" clearable>
            </el-input>
          </el-col>
          <el-col :span="4"  class="colStyle">
            <el-select v-model="fLevel" class="inputStyle" @change="ChangeLevel" clearable placeholder="请选择故障描述">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7" style="width:435px;">
            <el-date-picker
              v-model="DateTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss" 
              @change="changeDate"
              type="datetimerange"
              range-separator="至"
              clearable
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col> 
          <el-col :span="1">
            <el-button type="primary" class="query" @click="query">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果告警表格 -->
      <AlarmBody :tableData="data" :childrenQuery="query"></AlarmBody>
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
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import AlarmBody from './components/realTimeBody.vue'
    export default {
      components:{
        AlarmBody
      },
      data () {
        return {
          data:[],
          statusArry: [ 
            {value: 0, label: '未读'},
            {value: 1, label: '已读'},
          ],
          options: [
            {value: '未知故障', label: '未知故障'},
            {value: '交流桩出现故障', label: '交流桩出现故障'},
            {value: '充电机人身安全级别故障', label: '充电机人身安全级别故障'},
            {value: '充电机设备安全级别故障', label: '充电机设备安全级别故障'},
            {value: '充电机告警提示级别故障', label: '充电机告警提示级别故障'},
            {value: 'BMS人身安全级别故障', label: 'BMS人身安全级别故障'},
            {value: 'BMS设备安全级别故障', label: 'BMS设备安全级别故障'},
            {value: 'BMS告警提示级别故障', label: 'BMS告警提示级别故障'},
            {value: '充电机模块DC故障', label: '充电机模块DC故障'},
            {value: '充电机模块AC故障', label: '充电机模块AC故障'},
            {value: '电桩失去连接', label: '网络故障'},
          ],
          //刷选条件
          fLevel: null,
          status: null,
          DateTime:'',
          criteria:{
            siteName:null,
            pileNum:null,
          },
          //分页
          result:0,
          total:0,
          page_size:10,
          current_page:1,
        }
      },
      created () {
        this.query()
      },
      methods:{
        RestoreName(){
          if(this.criteria.siteName == ''){
            this.query()
          }
        },
        RestoreStutas(){
          this.query()
        },
        RestoreNum(){
          if(this.criteria.pileNum == ''){
            this.query()
          }
        },
        ChangeLevel(){
          this.query()
        },
        changeDate(){
          if(this.DateTime == '' || this.DateTime == null){
            this.query()
          }
        },
        query () {
          // data 是传递给子组件的参数
          let vm = this
          let beginTime =''
          let endTime = ''
          vm.data = []
          if(vm.DateTime != '' && vm.DateTime != null){
            beginTime = vm.DateTime[0]
            endTime = vm.DateTime[1]
          }
          if(vm.fLevel=='')vm.fLevel=null;
          vm.$ajax({
            method:'get',
            url:'api/fault/list',
            headers:{'token':sessionStorage.getItem('token')},
            params:{
              siteName:vm.criteria.siteName,
              status:vm.status,
              name:vm.fLevel,
              pileNum:vm.criteria.pileNum,
              beginTime:beginTime,
              endTime:endTime,
              page:vm.current_page,
              size:vm.page_size
            }
          })
          .then(res=>{
            if(res.data.code==200){
              console.log(res.data.data.list)
              vm.data = res.data.data.list
              vm.total = res.data.data.total
            }
          })
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
          this.query()
        },
        handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
          this.query()
        }
      }
    }
</script>