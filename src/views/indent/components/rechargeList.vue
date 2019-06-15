<template>
    <div style="margin-top:30px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="用户名称">
            </el-table-column>
                <el-table-column prop="phone" label=手机号码>
            </el-table-column>
            <el-table-column prop="amount" label="充值金额(元)">
            </el-table-column>
            <el-table-column prop="mode" label="充值类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.mode==1">银联</span>
                    <span v-if="scope.row.mode==2">微信</span>
                    <span v-if="scope.row.mode==3">支付宝</span>
                    <span v-if="scope.row.mode==4">卡片充值</span>
                     <span v-if="scope.row.mode==5">退款</span>
                </template>
            </el-table-column>
            <el-table-column prop="ctime" label="充值时间">
            </el-table-column>
            <el-table-column prop="uptime" label="充值完成时间">
            </el-table-column>
            <el-table-column  label="充值状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == '1'">未支付</span>
                    <span v-if="scope.row.status == '2'">已支付</span>
                    <span v-if="scope.row.status == '3'">己退款</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '../../../config/url.js'
    export default {
        name: 'RechargeList',
        props:['tableData'],
        data () {
            return {
            }
        },
    }
</script>
<style>

</style>