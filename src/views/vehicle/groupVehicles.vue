<template>
    <div class="main">
        <el-card class="box-card">
            <div style="margin-left:20px;">
                <el-row>    
                    <el-col :span="4" class="colStyle">
                         <el-input v-model="bname" placeholder="集团名称" class="inputStyle" @change="Goquery"  clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="4" class="colStyle">
                         <el-input v-model="carId" placeholder="车牌号" class="inputStyle" @change="GoqueryCarId" clearable>
                        </el-input>
                    </el-col>

                    <el-col :span="1">
                        <el-button type="primary" class="query" @click="query">查询</el-button>
                    </el-col>
                </el-row>
            </div>
            <group-vehicles-list :table-data="data"></group-vehicles-list>
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
// import { api_groupCarList } from '../api/index.js'
import GroupVehiclesList from './components/groupVehiclesList.vue'
export default {
    components:{
        GroupVehiclesList
    },
    data(){
        return{
            total:0,
            page_size:0,
            current_page:1,
            carId:'',
            bname:'',
            data:[]
        }
    },
    methods:{
        Goquery(){
            if(this.bname === ''){
                this.query()
            }     
        },
        GoqueryCarId(){
            if(this.carId == ''){
                this.query()
            }
        },
        query () {
            let vm = this
            vm.$ajax({
                method:'get',
                url:'/api/car/bloc?page=1&size=1000',
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    name:vm.bname,
                    licenseNum:vm.carId
                }
            }).then(res=>{
                if(res.data.code==200){
                    vm.data=res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.total = res.data.data.list.length
                }
            })
        },
        handleSizeChange(val){
            let vm = this
            vm.page_size = val
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/car/bloc?page=1'+'&size='+val,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    name:vm.bname,
                    licenseNum:vm.carId
                }
            }).then(res=>{
                if(res.data.code==200){
                    this.data=res.data.data.list
                }
            })
        },
        handleCurrentChange(val){
            let vm = this
            let size = vm.page_size==0?'10':vm.page_size
            vm.data=[]
            this.$ajax({
                method:'get',
                url:'/api/car/bloc?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    name:vm.bname,
                    licenseNum:vm.carId
                }
            }).then(res=>{
                if(res.data.code==200){
                    this.data=res.data.data.list
                }
            })
        },
    },
    created(){
        let vm = this
        vm.query()
    }
}
</script>

<style scoped>
</style>