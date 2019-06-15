<template>
    <div style="margin-top:30px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="siteName" label="电站名称">
            </el-table-column>
            <el-table-column prop="pileName" label="电桩名称">
            </el-table-column>
            <el-table-column prop="content" label="评价内容">
            </el-table-column>
            <el-table-column prop="ctime" label="评价时间">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column prop="grade" label="整体评分">
            </el-table-column>
            <el-table-column  label="整体评分">
                <template slot-scope="scope">
                    <el-rate
                        v-model="value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'EvaluationList',
        props:['tableData'],
        data () {
            return {
                value:4.7
            }
        },
        methods:{

        }
    }
</script>
<style>

</style>
