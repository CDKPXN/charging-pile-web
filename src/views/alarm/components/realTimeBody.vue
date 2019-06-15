<template>
    <div style="margin-top:30px;">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column width="40px">
                <template slot-scope="scope">
                    <el-badge is-dot class="item" v-if="scope.row.status==0"></el-badge>
               </template>
            </el-table-column>
            <el-table-column prop="site_name" label="电站名称">
            </el-table-column>
            <el-table-column prop="name" label="故障描述">
            </el-table-column>
            <el-table-column prop="ctime" label="故障时间" >
            </el-table-column>
            <el-table-column prop="level" label="故障等级">
            </el-table-column>
            <el-table-column prop="addr" label="电站地址">
            </el-table-column>
            <el-table-column prop="pile_num" label="电桩编号">
            </el-table-column>
            <!-- <el-table-column
                label="处理情况" >
                <template slot-scope="scope">
                   <span v-if="scope.row.dispose==0" style="color:#409EFF">未处理</span>
                   <span v-if="scope.row.dispose==1">已处理</span>
               </template>
            </el-table-column> -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="sendStatus(scope.$index, scope.row)">
                        详情
                    </el-button>
               </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'AlarmBody',
        props:['tableData'],
        watch:{
            data (val) {
                console.log(val)
            }
        },
        data () {
            return {
            }
        },
        methods:{
            sendStatus(index,row){
                console.log(row)
                console.log(index)
                let vm = this
                let id = row.id
                let status = row.status
                this.$router.push({path:"./detailAlarm",query:{id:id,status:status}})
                if(row.status==0){
                    vm.$ajax({
                        method:'put',
                        url:'/api/fault/'+id,
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            id:id
                        }
                    }).then(res=>{
                       console.log(res)
                    })
                }             
            }
        }
    }
</script>

<style>
    .titleText,.titleTextY{
        height:25px;
        width:50px;
        border-radius:25px;
        text-align:center;
        line-height:25px;
        color:white;font-size:12px;
    }
    .titleText{
        background: rgb(247, 133, 133);
    }
    .titleTextY{
       background-color: rgb(92, 175, 230);
    }
</style>