<template>
    <div style="margin-top:30px;">
        <el-table :data="tableData" style="width: 100%">

            <el-table-column
                label="状态">
                <template slot-scope="scope">
                   <el-badge value="new" class="item" v-if="scope.row.read==0">
                    </el-badge>
               </template>
            </el-table-column>
            <el-table-column
                prop="site_name"
                label="电站名称">
            </el-table-column>
            <el-table-column
                prop="addr"
                label="电站地址">
            </el-table-column>
            <el-table-column
                prop="pile_num"
                label="点桩编号">
            </el-table-column>
            <el-table-column
                prop="level"
                label="故障等级">
            </el-table-column>
            <el-table-column
                prop="name"
                label="故障描述">
            </el-table-column>
            <el-table-column
                prop="ctime"
                label="创建时间" >
            </el-table-column>
            <el-table-column
                label="处理情况" >
                <template slot-scope="scope">
                   <span v-if="scope.row.dispose==0" style="color:#409EFF">未处理</span>
                   <span v-if="scope.row.dispose==1">已处理</span>
               </template>
            </el-table-column>

            <!-- <el-table-column label="操作" >         
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'TimeBody',
        props:['tableData'],
        watch:{
            data (val) {
                console.log(val)
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style>
    .titleText{
        font-size:14px;
        font-weight: 600
    }
</style>