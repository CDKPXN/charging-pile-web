<template>
    <div class="main">
         <el-card class="box-card">
           <div style="margin-left:20px;">
                <el-row>     
                    <el-col :span="4" class="colStyle">
                         <el-input v-model="carId" placeholder="车牌号" class="inputStyle" @change="GoqueryCarId" clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="1">
                        <el-button type="primary" class="query" @click="query">查询</el-button>
                    </el-col>
                </el-row>
            </div>
            <private-vehicles-list :table-data="data"></private-vehicles-list>
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
import PrivateVehiclesList from './components/privateVehiclesList.vue'
import axios from 'axios'
import url from '../../config/url.js'
export default {
    components:{
        PrivateVehiclesList
    },
    data(){
        return{
            carId:'',
            data:[],
            licenseNum:'',
            current_page:1,
            total:0,
            page_size:0,
        }
    },
    created(){
        this.query()
    },
    methods:{
        GoqueryCarId(){
            if(this.carId == ''){
                this.query()
            }  
        },
        query () {
            let vm = this
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/car/nonBloc?page=1&size=1000',
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    'licenseNum':vm.carId
                }
            }).then(res=>{
                console.log(res.data.data.list)
                if(res.data.code==200){
                    vm.data = res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.total = res.data.data.list.length
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
                let vm = this
                vm.page_size = val
                vm.data = []
                vm.$ajax({
                    method:'get',
                    url:'/api/car/bloc?page=1&size='+vm.page_size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        'licenseNum':vm.carId
                    }
                })
                .then(res=>{
                if(res.data.code==200){
                    vm.data = res.data.data.list
                }
            })
        },
        handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
                let vm = this
                let size = vm.page_size==0?'10':vm.page_size
                vm.data = []
                vm.$ajax({
                    method:'get',
                    url:'/api/car/bloc?page='+val+'&size='+size,
                    headers:{'token':sessionStorage.getItem('token')},
                    params:{
                        'licenseNum':vm.carId
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.data = res.data.data.list
                    }
            })
        },
    }
}
</script>

<style scoped>

</style>