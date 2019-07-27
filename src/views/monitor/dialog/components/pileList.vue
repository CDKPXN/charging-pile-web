<template>
    <div>
        <el-row>
            <el-table :data="tableData"  style="margin-left:0.3%;">
                <el-table-column prop="id" label="电桩序号">
                </el-table-column>
                 <el-table-column prop="num" label="电桩编码">
                </el-table-column>
                <el-table-column prop="name" label="电桩名称">
                </el-table-column>
                <el-table-column label="电桩类型">
                    <template slot-scope="scope">
                        <div slot="reference" >
                            <span v-if="scope.row.type==0">快充</span>
                            <span v-if="scope.row.type==1">慢充</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="ctype" label="电桩功率">
                    <template slot-scope="scope">
                        <div slot="reference" >
                            <span v-if="scope.row.ctype==0">交流</span>
                            <span v-if="scope.row.ctype==1">30KW</span>
                            <span v-if="scope.row.ctype==2">40KW</span>
                            <span v-if="scope.row.ctype==3">60KW</span>
                            <span v-if="scope.row.ctype==4">120KW</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="电桩状态">
                    <template slot-scope="scope">
                        <div slot="reference" >
                            <span v-if="scope.row.status==0">空闲</span>
                            <span v-if="scope.row.status==1">收到预约</span>
                            <span v-if="scope.row.status==2">预约中</span>
                            <span v-if="scope.row.status==3">充电中</span>
                            <span v-if="scope.row.status==4">故障</span>
                            <span v-if="scope.row.status==5">锁定</span>
                            <span v-if="scope.row.status==6">暂停</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="350px">
                    <template slot-scope="scope" >
                        <el-button  size="mini" type="primary" @click="handleRestore(scope.$index, scope.row)">恢复</el-button>
                        <el-button  size="mini" type="danger"  @click="handleLock(scope.$index, scope.row)">锁定</el-button>
                        <el-button  size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button  size="mini" type="danger" @click="handleStop(scope.$index, scope.row)">停止充电</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 桩点详情 -->
         <el-dialog :title="titelMsg" :visible.sync="dialogDetailPile" width="900px" @close="close('pileDetail')">
            <el-form :model="pileDetail" style="margin-left:-2.5%" ref="pileDetail" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="电桩序号" :label-width="formLabelWidth">
                            <el-input v-model="pileDetail.id" class="addStyle" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="电桩名称" :label-width="formLabelWidth" prop="name">
                            <el-input class="addStyle"  v-model="pileDetail.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                   <el-col :span="12">
                        <el-form-item label="电桩类型" :label-width="formLabelWidth">
                            <el-select v-model="type" class="addStyle">
                                  <el-option
                                    v-for="item in pieltype"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电桩功率" :label-width="formLabelWidth">
                            <el-select v-model="ctype" class="addStyle">
                                 <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="输入电压" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.vout" class="addStyle" disabled auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="输入电流" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.cout" class="addStyle" disabled auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="充电金额" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.cost" class="addStyle" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="充电电压" :label-width="formLabelWidth"> 
                            <el-input v-model="pilereal.voltage" class="addStyle" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="充电时间" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.duration"  class="addStyle" disabled auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="充电电量" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.amount"  class="addStyle" disabled auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="剩余时间" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.r_time" class="addStyle" disabled auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                        <el-col :span="12">
                        <el-form-item label="当前SOC" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.soc" class="addStyle" disabled auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="需求电压" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.v_need" disabled class="addStyle" auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="需求电流" :label-width="formLabelWidth">
                            <el-input v-model="pilereal.cout" disabled class="addStyle" auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer footer-dialog">
                <el-button type="infor" @click="dialogDetailPile = false">取 消</el-button>
                <el-button type="primary"  @click="saveMes">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'PileList',
    props:['tableData'],
    data(){
        var Amendname = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('电桩名称不能为空'))
            }
        }
        return{
                ctype:'',
                type:'',
                options: [{
                    value: 0,
                    label: '交流'
                    }, {
                    value: 1,
                    label: '30kw'
                    }, {
                    value: 2,
                    label: '40kw'
                    }, {
                    value: 3,
                    label: '60kw'
                    }, {
                    value: 4,
                    label: '120kw'
                    }],
                pieltype:[{
                    value: 0,
                    label: '快充'
                    }, {
                    value: 1,
                    label: '慢充'
                }],
                pileDetail:{
                    id:'',
                    name:'',
                    type:'',  //选择电桩类型
                },
                pilereal:{},
                titelMsg:'',          //对话框标题
                perusal:'',          //查询电桩类型
                WorkState:'',       //查询电桩工作状态
                dialogDetailPile:false,
                formLabelWidth: '110px',
                rules:{
                    name:{ validator: Amendname, trigger: 'blur' }
                },
        }
    },
    methods:{
        //查看桩点详情
        handleEdit(index,row){
            let vm = this
            vm.dialogDetailPile=true
            if(vm.tableData[index].type == 0){
                vm.type = 0
            }else(
                vm.type = 1
            )
            if(vm.tableData[index].ctype == 0){
                vm.ctype = 0
            }else if(vm.tableData[index].ctype == 1){
                vm.ctype = 1
            }else if(vm.tableData[index].ctype == 2){
                vm.ctype = 2
            }else{
                vm.ctype = 3
            }
            let titleName=vm.tableData[index].name
            vm.titelMsg=titleName+'信息'
            vm.pileDetail=JSON.parse(JSON.stringify(vm.tableData[index]))  //  深度拷贝，
            //获取桩点实时信息
            let pileid = row.id
            vm.$ajax({
                method:'get',
                url:'/api/pile/'+pileid+'/status',
                headers:{'token':sessionStorage.getItem('token')},
            }).then(res => {
                if(res.data.code == 200){

                        //服务器参数有问题，临时用其他参数代替

                    vm.pilereal = res.data.data

  
                    vm.pilereal.cout=Math.abs(vm.pilereal.cout);
                    vm.pilereal.voltage=vm.pilereal.vout
                    vm.clg(vm.pilereal)

                }
            })
        },
        // 电桩恢复
        handleRestore(index,row){
            this.$confirm('是否恢复此电桩?', '确认信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>{
                let pileId = row.id
                let status = 1;
                let vm = this
                vm.$ajax({
                    method:'PUT',
                    url:'/api/pile/'+pileId+'/changeStatus/'+status,
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code == 200){
                        vm.$emit('childQuery')
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                    }
                    else{
                        vm.$emit('childQuery')
                        this.$message({
                            type: 'info',
                            message: res.data.message
                        });
                    }
                })
             })
            .catch(res => {
                this.$message({
                    type: 'info',
                    message: '已取消此操作！'
                });          
            });
        },
        // 电桩锁定
        handleLock(index,row){
            this.$confirm('是否锁定或维护此电桩?', '确认信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>{
                let pileId = row.id
                let status = 2;
                let vm = this
                vm.$ajax({
                    method:'PUT',
                    url:'/api/pile/'+pileId+'/changeStatus/'+status,
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code == 200){
                        vm.$emit('childQuery')
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                    }
                    else{
                        vm.$emit('childQuery')
                        this.$message({
                            type: 'info',
                            message: res.data.message
                        });
                    }
                })
             })
            .catch(res => {
                this.$message({
                    type: 'info',
                    message: '已取消此操作！'
                });          
            });
        },
        //强制结算
        handleStop(index,row){
            this.$confirm('是否停止充电并强制结算?', '确认信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>{
                let pileId = row.id
                let status = 3;
                let vm = this
                vm.$ajax({
                    method:'PUT',
                    url:'/api/pile/'+pileId+'/changeStatus/'+status,
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code == 200){
                        vm.$emit('childQuery')
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                    }
                    else{
                        vm.$emit('childQuery')
                        this.$message({
                            type: 'info',
                            message: res.data.message
                        });
                    }
                })
            })
            .catch(res => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
        saveMes(){
            let vm = this
            if(vm.pileDetail.name == ''){
                return false;
            }else{
                this.$ajax({
                method:'put',
                url:'/api/pile',
                headers:{'token':sessionStorage.getItem('token')},
                data:{
                    id:vm.pileDetail.id,
                    name:vm.pileDetail.name,
                    ctype:vm.ctype,
                    type:vm.type
                }
            }).then(res=>{
                if(res.data.code==200){
                    vm.$message({
                        type:"success",
                        message:"修改成功"
                    })
                   vm.$emit('childQuery')
                }
            })
            vm.dialogDetailPile = false
            }
        },
        close(formName){
            this.$refs[formName].resetFields()
        },
    }
}
</script>