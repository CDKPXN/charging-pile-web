<template>
    <div style="margin-top:30px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="用户名称">
            </el-table-column>
            <el-table-column prop="id_code" label="车辆识别码">
            </el-table-column>
            <el-table-column prop="license_num" label="车牌号">
            </el-table-column>
            <el-table-column prop="max_cv" label="最高充电电压">
            </el-table-column>
            <el-table-column prop="b_type" label="电池类型">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '../../../config/url.js'
    export default {
        name: 'PrivateVehiclesList',
        props:['tableData'],
        data () {
            return {
            }
        },
    }
</script>
<style>

</style>