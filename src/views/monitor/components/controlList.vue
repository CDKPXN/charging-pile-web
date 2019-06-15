<template>
    <div>
        <el-table :data="tableData"  >
            <el-table-column prop="name" label="电站名称" width="300px;">
            </el-table-column>
            <el-table-column prop="addr" label="电站地址" width="500px;">
            </el-table-column>
            <el-table-column prop="total" label="电桩总数">
            </el-table-column>
            <el-table-column prop="fast" label="快充桩数">
            </el-table-column>
            <el-table-column prop="slow" label="慢充桩数">
            </el-table-column>
            <el-table-column prop="fastLeisure" label="快充空闲">
            </el-table-column>
            <el-table-column prop="slowLeisure" label="慢充空闲">
            </el-table-column>
            <el-table-column prop="fault" label="故障桩数">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  type="primary"  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button  type="danger" v-if="scope.row.is_del==0" @click="handleforbidden(scope.$index, scope.row)">禁用</el-button>
                    <el-button  type="success" v-else-if="scope.row.is_del==1" @click="handleresume(scope.$index, scope.row)">恢复</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    // import { api_groupSiteList } from '../../api/index.js'
    import url from '../../../config/url.js'
    export default {
        name: 'ControlList',
        props:['tableData'],
        data () {
            return {
            }
        },
        watch:{
            page_size (val) {
                this.clg(val)
            }
        },
        methods:{
            //查看详情
            handleEdit(index,row){
                let siteid=row.id
                let siteName = row.name
                // let addr=row.addr
                // let rowList=row
                this.$router.push({   
                    path:'/addDialog',
                    query:{id:siteid,name:siteName}
                })
            },
            //点击禁用的事件
            handleforbidden(index,row){
               row.is_del=1;
               let vm=this;
                vm.$ajax({
                    method:'put',
                    url:"/api/site",
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                       id:row.id,
                       is_del:row.is_del
                    }
                }).then(res=>{
                    if(res.data.code==200){
                        this.$message({
                         message: '禁用成功',
                         type: 'success'
                      });
                    }else{
                         this.$message.error('禁用失败');
                    }
                })
            },
            //点击恢复的事件
            handleresume(index,row){
               row.is_del=0;
               let vm=this;
                vm.$ajax({
                    method:'put',
                    url:"/api/site",
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                       id:row.id,
                       is_del:row.is_del
                    }
                }).then(res=>{
                    if(res.data.code==200){
                        this.$message({
                         message: '恢复成功',
                         type: 'success'
                      });
                    }else{
                         this.$message.error('恢复失败');
                    }
                })
            }
        },
    }
</script>