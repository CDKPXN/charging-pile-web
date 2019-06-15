<template>
    <div class="main">
        <el-card class="box-card">
             <el-row style="width:95%;">
                <el-col :span="10">
                        <span class="addTitle">{{this.siteArr.name}}信息</span>
                </el-col>
                <el-col :span="3">
                        <el-button class="check" @click="changMessage" type="primary">修改信息</el-button>
                        <el-button class="check" style="right:8%" @click="Gocontrolre" type="infor">返回</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:6%;width:95%">
                <el-col :span="8"  class='list'>
                    <p style="font-size:20px">基本信息</p>
                    <p>电站名称：<span>{{this.siteArr.name}}</span><p>
                    <!-- <p>电站名称：<span>{{this.siteArr.province+this.siteArr.city+this.siteArr.district+this.siteArr.name}}</span><p> -->
                    <p><span>电站地址：</span><span style="line-height: 16px;">{{this.siteArr.addr}}</span></p>
                    <p>电站维护人：<span>{{this.siteArr.linkmanPhone}}</span></p>
                </el-col>
                <el-col :span="8"  class='list' style='background-color:#74b9e7;position:absolute;right:37%'>
                    <p style="font-size:20px">收费信息</p>
                    <p>充电费用：{{this.siteArr.eprice}}元/度</p>
                    <p>停车费用：{{this.siteArr.parkingFee}}元/小时</p>
                    <p>快充服务费用：{{this.siteArr.sprice}}元</p>
                    <p>慢充服务费用：{{this.siteArr.slowPrice}}元</p>
                    <!-- <p>支付方式：银联充值</p> -->
                </el-col>
                <el-col :span="8" class='list' style="background-color:#70d399;position:absolute;right:0">
                    <p style="font-size:20px">设备详情</p>
                    <p>总充电桩数：{{this.siteArr.total}}个</p>
                    <p>慢充电桩数：{{this.siteArr.slow}}个</p>
                    <p>快充电桩数：{{this.siteArr.fast}}个</p>
                    <p>慢充空闲数：{{this.siteArr.slowLeisure}}个</p>
                    <p>快充空闲数：{{this.siteArr.fastLeisure}}个</p>
                    <p>故障电桩数：{{this.siteArr.fault}}个</p>
                </el-col>
            </el-row>
            <el-row style="width:95%">
                <el-col :span="4">
                    <span class="addTitle">当前充电列表</span>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px">
                <site-charg-list></site-charg-list>
            </el-row>
            <el-row style="width:95%">
                <el-col :span="4">
                    <span class="addTitle">电桩列表</span>
                </el-col>
            </el-row>
            <el-row style="width:95%">
                <el-col :span="4" style="margin:0 0 30px 20px;" class="colStyle">
                    <el-select v-model="perusal" placeholder="快充/慢充" class="inputStyle" clearable @change="queryPerusal">
                        <el-option label="快充" value="0"></el-option>
                        <el-option label="慢充" value="1"></el-option>
                    </el-select>
                </el-col>
                 <el-col :span="4" class="colStyle">
                    <el-select v-model="WorkState" placeholder="电桩状态" class="inputStyle" clearable @change="queryWorkState">
                            <el-option label="空闲" value="0"></el-option>
                            <el-option label="收到预约" value="1"></el-option>
                            <el-option label="预约中" value="2"></el-option>
                            <el-option label="充电中" value="3"></el-option>
                            <el-option label="故障" value="4"></el-option>
                            <el-option label="锁定" value="5"></el-option>
                            <el-option label="暂停" value="6"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="openAddModel" class="check">新增电桩</el-button>
                </el-col>
            </el-row>
            <el-row>
                <pile-list :table-data="tableData" v-on:childQuery="query"></pile-list>
            </el-row>
            
            <!-- 分页 -->
            <div class="paTotal">
                <span>共&nbsp;{{total}}&nbsp;结果</span>
            </div>
            <div class="block" style="margin-left:10%;">
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
            <!-- 新增对话框 -->
            <el-dialog :title="titelMsg" :visible.sync="dialogAddPile" width="450px" @close="close('pile')">
                <el-form :model="pile" style="margin-left:-8%" ref="pile" :rules="rules">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="电桩名称" :label-width="formLabelWidth" prop="name">
                                <el-input v-model="pile.name" auto-complete="off" autofocus=""  class="addStyle"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="电桩类型" :label-width="formLabelWidth" prop="changePerusal">
                                <el-select v-model="pile.changePerusal" placeholder="请选择电桩类型" class="addStyle">
                                    <el-option label="快充" value="0"></el-option>
                                    <el-option label="慢充" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="电桩功率" :label-width="formLabelWidth" prop="PilePower">
                                <el-select v-model="pile.PilePower" placeholder="请选择充电桩功率" class="addStyle">
                                    <el-option label="交流" value="0"></el-option>
                                    <el-option label="30kw" value="1"></el-option>
                                    <el-option label="40kw" value="2"></el-option>
                                    <el-option label="60kw" value="3"></el-option>
                                    <el-option label="120kw" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer footer-dialog">
                    <el-button type="infor" @click="dialogAddPile = false" style="margin-left:60px;">取 消</el-button>
                    <el-button type="primary"  @click="addPile">确 认</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
// import { api_addPile , api_detailSite , api_groupPileList ,api_changeSite} from '../../api/index.js'
import PileList from './components/pileList.vue'
import SiteChargList from './components/siteChargList.vue'
export default {
    components:{
        PileList,
        SiteChargList
    },
    data(){
        var Addname = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('电桩名称不能为空'));
            }else {
                callback();
            }
        };
        return{
            changePerusal:'',  //选择电桩类型
            PilePower:'',     //电桩功率
            perusal:'',          //查询电桩类型
            WorkState:'',       //查询电桩工作状态
            username:'',            //查询电桩名称和地址
            titelMsg:'',     //对话框标题
            pile: {
                name:'',
                changePerusal:'',
                PilePower:'',
            },
            dialogAddPile:false,
            formLabelWidth: '120px',
            tableData:[],
            siteArr:[],
            total:0,
            page_size:0,
            current_page:1,
            rules:{
                name: [
                    { validator: Addname, trigger: 'blur' }
                ],
            },
        }
    },
    methods:{
        //条件查询桩点信息
        queryPerusal(){
            this.query()
        },
        queryWorkState(){
           this.query()
        },
        //查询桩点数据
        query(){
            let vm = this
            var id=this.$route.query.id
            let type = vm.perusal
            let status = vm.WorkState
            vm.$ajax({
                method:'get',
                url:'/api/pile/site/'+id+'?type='+type+'&status='+status,
                headers:{'token':sessionStorage.getItem('token')},
            }).then(res=>{
                if(res.data.code){
                    vm.tableData=res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.total=res.data.data.list.length
                }
            })
        },
        Verification () {  // 验证数据
            let vm = this
            if(vm.pile.id=='' || vm.pile.name=='' || vm.pile.changePerusal=='' || vm.pile.PilePower==''){
                vm.$message({
                    type:'warning',
                    message:"请完善参数"
                })
            }else{
                return true
            }
        },
        //新增充电桩
        openAddModel(){
            this.titelMsg='新增电桩'
            this.dialogAddPile=true
        },
        addPile(){
            let vm = this
            var id = this.$route.query.id
            if(vm.Verification()){
                let params = {
                                        sid:id,
                    name:vm.pile.name,
                    type:vm.pile.changePerusal,
                    ctype:vm.pile.PilePower
                };
                let url = '/api/pile';
                vm.$ajax({
                    url:url,
                    method:"post",
                    data:params,
                    headers:{'token':sessionStorage.getItem('token')},
                }).then(res=>{
                    vm.clg(res)
                    if(res.data.code==200){
                        vm.$message({
                            type:'success',
                            message:"新增成功"
                        })
                        vm.dialogAddPile=false
                        this.query()
                    }
                })
            }
        },
        //修改站点信息
        changMessage(){
            let titlemsg = 1
            let sitedate = JSON.parse(JSON.stringify(this.siteArr)).id
            this.$router.push({path:'./addCharge',query:{titlemsg:titlemsg,sitedate:sitedate}})
        },
        //根据传过来的参数获取站点详细信息
        querySite(){
            var id = this.$route.query.id
            this.$ajax({
                method:'get',
                url:'/api/site/list?id='+id,
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res=>{
                if(res.data.code=200){
                    console.log(res.data.data.list)
                    this.siteArr=res.data.data.list[0]
                    this.siteArr.eprice = (this.siteArr.eprice / 100).toFixed(2)
                    this.siteArr.sprice = (this.siteArr.sprice / 100).toFixed(2)
                    this.siteArr.slowPrice = (this.siteArr.slowPrice / 100).toFixed(2)
                    this.siteArr.parkingFee = (this.siteArr.parkingFee / 100).toFixed(2)
                }
            })
        },
        //分页
        handleSizeChange(val){
            let vm = this
            var id=this.$route.query.id
            vm.page_size = val
            vm.tableData=[]
            vm.$ajax({
                method:'get',
                url:'/api/pile/site/'+id+'?page=1&size='+val,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    type:vm.perusal,
                    status:vm.WorkState
                }
            }).then(res=>{
                if(res.data.code){
                    vm.tableData=res.data.data.list
                }
            })
        },
        handleCurrentChange(val){
            let vm = this
            var id=this.$route.query.id
            let size = vm.page_size==0?'10':vm.page_size
            vm.tableData = []
            vm.$ajax({
                method:'get',
                url:'/api/pile/site/'+id+'?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    type:vm.perusal,
                    status:vm.WorkState
                }
            }).then(res=>{
                if(res.data.code){
                    vm.tableData=res.data.data.list
                }
            })
        },
        //返回站点列表
        Gocontrolre(){
            let vm = this
            vm.$router.push('./controlRecord')
        },
        close(formName){
            this.$refs[formName].resetFields()
        },
    },
    created(){
        this.query()
        //请求站点列表
        this.querySite()
    }
}
</script>

<style scoped>
    .main{
        margin: 30px 0 0 20px;
    }
    .addTitle{
        font-size: 18px;
        display: inline-block;
        padding:0px 0 36px 20px
    }
    /* 修改按钮 */
    .check{
        position: absolute;
        right: 0;
        font-size:14px;
        height: 36px;
        border-radius: 3px;
    }
    /* 站点列表 */
    .list{
        height: 220px;
        width: 25%;
        border-radius: 3px;
        padding-left: 30px;
        color:white;
        margin-left: 20px;
        background-color:#f78585
    }
    .list p{
        line-height: 10px;
        font-size: 14px
    }
</style>