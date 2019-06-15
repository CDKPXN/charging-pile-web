<template>
  <div class="main">
      <el-card class="box-card">
        <div style="margin-left:20px;">
          <el-row>
            <el-col :span="3">
               <el-input placeholder="告警ID:" v-model="criteria.id" clearable>
              </el-input>
            </el-col>
            <el-col :span="3" style="margin-left:1%">
               <el-input placeholder="充电站名称" v-model="criteria.siteName" clearable>
              </el-input>
            </el-col>
            <el-col :span="3" style="margin-left:1%">
               <el-input placeholder="点桩编号" v-model="criteria.pileNum" clearable>
              </el-input>
            </el-col>
            <el-col :span="3" style="margin-left:1%">
               <el-select v-model="value" placeholder="请选择告警等级">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3" style="margin-left:1%">
                <div class="block">
                    <el-date-picker 
                        placeholder="开始时间"
                        v-model="criteria.beginTime" 
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        format="yyyy-MM-dd HH:mm:ss" 
                        type="datetime">
                    </el-date-picker>    
                </div>
            </el-col>
            <el-col :span="3" style="margin-left:5%">
                <div class="block">
                    <el-date-picker 
                        placeholder="结束时间"
                        v-model="criteria.endTime" 
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        format="yyyy-MM-dd HH:mm:ss" 
                        type="datetime">
                    </el-date-picker>    
                </div>
            </el-col>
            <el-col :span="2" style="margin-left:5%">
                <el-button type="primary" class="query" @click="query">查询</el-button>
            </el-col>
          </el-row>
        </div>
          <!-- 查询结果告警表格 -->
    <TimeBody :tableData="data"></TimeBody>
    <!-- 分页 -->
    <hr>
    <div class="block">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="current_page"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
    </el-card>
  </div>
</template>

<script>
  import TimeBody from './components/historyBody.vue'
    export default {
      components:{
        TimeBody
      },
        data () {
            return {
                options: [
                  {value: '', label: '--请选择--'},
                  {value: '1', label: '交流桩出现故障'},
                  {value: '2', label: '充电机人身安全级别故障'},
                  {value: '3', label: '充电机设备安全级别故障'},
                  {value: '4', label: '充电机告警提示级别故障'},
                  {value: '5', label: 'BMS人身安全级别故障'},
                  {value: '6', label: 'BMS设备安全级别故障'},
                  {value: '7', label: 'BMS告警提示级别故障'},
                  {value: '8', label: '充电机模块DC故障'},
                  {value: '9', label: '充电机模块AC故障'},
                  {value: '10', label: '未知故障'}
                ],
                value: '',
                data:[],
                criteria:{
                  id:'',
                  read:1,
                  siteName:'',
                  pileNum:'',
                  addr:'',
                  endTime:'',
                  beginTime:''
                },
                total:0,
                page_size:0,
                current_page:1
            }
        },
        created () {
          this.query()
        },
        methods:{
          query () {
            // data 是传递给子组件的参数
            let vm = this
            vm.data = []
            vm.$ajax({
              method:'post',
              url:'api/fault/list?page=1&size=1000',
              headers:{'token':vm.$token},
              data:{
                id:vm.criteria.id,
                read:vm.criteria.read,
                siteName:vm.criteria.siteName,
                pileNum:vm.criteria.pileNum,
                addr:vm.criteria.addr,
                endTime:vm.criteria.endTime,
                beginTime:vm.criteria.beginTime
              }
            })
            .then(res=>{
              vm.clg(res)
              if(res.data.code==200){
                vm.data = res.data.data.list
                vm.total = res.data.data.list.length
              }
            })
          },
          // 分页点击事件
            handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                 console.log(`每页 ${val} 条`);
                 let vm = this
                 vm.page_size = val
                 vm.data = []
                 vm.$ajax({
                    method:'post',
                    url:'api/fault/list?page=1&size='+vm.page_size,
                    headers:{'token':vm.$token},
                    data:{
                      id:vm.criteria.id,
                      read:vm.criteria.read,
                      siteName:vm.criteria.siteName,
                      pileNum:vm.criteria.pileNum,
                      addr:vm.criteria.addr,
                      endTime:vm.criteria.endTime,
                      beginTime:vm.criteria.beginTime
                    }
                 })
                 .then(res=>{
                    vm.clg(res)
                    if(res.data.code==200){
                        vm.data = res.data.data.list
                    }
                })
            },
            handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
              console.log(`当前页: ${val}`);
              let vm = this
                let size = vm.page_size==0?'10':vm.page_size
                vm.data = []
                vm.$ajax({
                  method:'post',
                  url:'api/fault/list?page='+val+'&size='+size,
                  headers:{'token':vm.$token},
                  data:{
                    id:vm.criteria.id,
                    read:vm.criteria.read,
                    siteName:vm.criteria.siteName,
                    pileNum:vm.criteria.pileNum,
                    addr:vm.criteria.addr,
                    endTime:vm.criteria.endTime,
                    beginTime:vm.criteria.beginTime
                  }
                })
                .then(res=>{
                  vm.clg(res)
                  if(res.data.code==200){
                      vm.data = res.data.data.list
                  }
              })
            }
        }
    }
</script>

<style scoped>
</style>