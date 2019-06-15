<template>
    <div  class="main">
        <div>
            <el-row>
                <el-col :span="12" style="position:relative">
                    <span style="font-size:18px;">告警详情</span>
                    <el-button type="primary" @click="goBlack" style="position:absolute;right:-2.2%">返回</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="alarmContent">
            <el-row>
                <el-col :span="12">
                    <p style="font-size:18px">基本信息</p>
                    <p>电站名称：{{userDetail.site_name}}</p>
                    <p>电站地址：{{userDetail.addr}}</p>
                    <p>电桩编号：{{userDetail.pile_num}}</p>
                    <p>故障等级：{{userDetail.level}}</p>
                    <p>故障描述：{{userDetail.name}}</p>
                    <p>故障时间：{{userDetail.ctime}}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            userDetail:[],
        }
    },
    created(){
        this.query()
    },
    methods:{
        query(){
            let vm = this
            let id = vm.$route.query.id
            let status = vm.$route.query.status
            vm.$ajax({
              method:'get',
              url:'api/fault/list?page=1&size=1000'+id,
              headers:{'token':sessionStorage.getItem('token')},
            })
            .then(res=>{
              if(res.data.code==200){
                  let arr = res.data.data.list
                  let arrNull = []
                  for(var item of arr){
                      if(item.id == id){
                          arrNull.push(item)
                          vm.userDetail = arrNull[0]
                      }
                  }
              }
            })
        },
        goBlack(){
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
    .main{
        margin: 20px 0 0 30px;
    }
    .alarmContent{
        margin: 20px 0 0 0;
        padding: 0 0 0 20px;
        font-size: 14px;
        background-color:rgb(92, 175, 230);
        border-radius: 4px;
        width:50%;
        height: 500px;
        color:white
    }
</style>


