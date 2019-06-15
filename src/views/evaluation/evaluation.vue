<template>
    <div class="main">
        <el-card class="box-card" style="box-shadow:0 0 10px 0px grey">
            <div style="margin-left:20px;">
                <el-row>    
                    <el-col :span="4" class="colStyle">
                        <el-input v-model="siteName" placeholder="电站名称"  class="inputStyle" @change="Goquery" clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="4" class="colStyle">
                        <el-input v-model="electricPileName" placeholder="电桩名称" class="inputStyle" @canplay="Goquery" clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="4" class="colStyle">
                        <el-input v-model="phone" placeholder="手机号码" class="inputStyle" @canplay="Goquery" clearable>
                        </el-input>
                    </el-col>
                    <el-col :span="4" class="colStyle">
                        <el-select v-model="value" placeholder="评价星级">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>  
                    <el-col :span="7" style="width:435px;">
                        <el-date-picker
                            v-model="beginEndTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>  
                    <el-col :span="1">
                        <el-button type="primary" class="query" @click="query">查询</el-button>
                    </el-col>
                </el-row>
            </div>
            <evaluation-list :table-data="data"></evaluation-list>
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
import EvaluationList from './components/evaluationList.vue'
export default {
    components:{
        EvaluationList
    },
    data(){
        return{
            phone:'',
            siteName:'',
            electricPileName:'',
            beginEndTime:'',
            grade:'',
            options:[{
                value:'1',
                label:"一星"
            },{
                value:'2',
                label:"二星"
            },{
                value:'3',
                label:"三星"
            },{
                value:'4',
                label:"四星"
            },{
                value:'5',
                label:"五星"
            }],
            total:0,
            page_size:0,
            current_page:1,
            carId:'',
            userName:'',
            value: '',
            data:[{"value":3.7}]
        }
    },
    methods:{
        Goquery(){
            let vm = this
            let RegEmp = /^\w[-\w.+]*@+[0-9A-Za-z]{1,14}$/
            if(!RegEmp.test(vm.siteName)){
                console.log(RegEmp.test(vm.siteName))
            }if(vm.siteName.length <= 5){
                console.log("长度不够")
            }
        },
        query () {
            let vm = this
  
            // vm.$ajax({
            //     method:'get',
            //     url:'/api/evaluate/list?page=1&size=1000' ,
            //     headers:{'token':vm.$token},
            //     data:{}
            // }).then(res=>{
            //    console.log(res.data.data)
            //     if(res.data.code==200){
            //         vm.data=res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
            //         vm.total = res.data.data.list.length
            //     }
            // })
        },
        handleSizeChange(val){
            let vm = this
            vm.page_size = val
            vm.data = []
            vm.$ajax({
                method:'get',
                url:'/api/evaluate/list?page=1'+'&size='+val,
                headers:{'token':vm.$token},
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
                url:'/api/evaluate/list?page='+val+'&size='+size,
                headers:{'token':vm.$token},
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.data=res.data.data.list
                }
            })
        }
    },
    created(){
        this.query()
    }
}
</script>

<style scoped>
</style>