<template>
    <div style="width:98%;margin:0 auto">
        <el-row :gutter="12">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="grid-content bg-purple">
                    <p class="notice-title">发布公告</p>

                    <div style="position:relative;height:120px;width:410px;margin: 30px 0 30px 0">
                        <el-input
                        id="notice_content"
                        type="textarea"
                        resize='none'
                        maxlength="100"
                        placeholder="请输入内容"
                        v-model="items.notice_content">
                        </el-input>
                        <span id="textCount">还可以输入{{textCount}}字</span>
                    </div>

                    <p class="notice-time">公告持续时间</p>

                    <el-date-picker
                    v-model="date"
                    style="margin-bottom:20px;"
                    type="daterange"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss" 
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>

                    <p class="notice-choose">选择发送对象</p>

                    <el-input v-model="input" style="width:160px" placeholder="手机号"></el-input>

                    <el-button type="primary" id="notice-query" @click="noticeQuery">查询</el-button>
                    
                    <el-table
                        id="notice-table"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width:410px"
                        max-height="250"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="用户名称">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号码">
                        </el-table-column>
                    </el-table>

                    <el-button type="primary" id="notice-submit" @click="noticeSubmit">发布公告</el-button>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <div class="grid-content bg-purple-light">
                    <p class="notice-title" style="margin-left:20px;">已发布公告</p>

                    <el-row style="margin: 20px 0 20px 20px;">
                        <el-col :span="10" style="width:350px;margin-right:20px;">
                            <el-date-picker
                                v-model="queryDate"
                                type="daterange"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss" 
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6">
                            <el-input type="text" placeholder="公告内容" v-model="queryContent"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" id="notice-query" @click="getNoticeList">查询</el-button>
                        </el-col>
                    </el-row>
                        
                    <el-table
                        :data="listTableData"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="序号"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="公告内容"
                            :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                            prop="ctime"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            prop="startTime"
                            label="开始时间">
                        </el-table-column>
                        <el-table-column
                            prop="endTime"
                            label="结束时间">
                        </el-table-column>
                        <el-table-column label="公告状态">
                             <template slot-scope="scope">
                                 <span v-if="scope.row.status == 0">待发布</span>
                                 <span v-else-if="scope.row.status == 1">发布中</span>
                                 <span v-else>已过期</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150px">
                            <template slot-scope="scope">
                                <el-button
                                @click="handleCheck(scope.$index, scope.row)" type="primary">查看</el-button>
                                <el-button
                                type="danger"
                                @click="handleOver(scope.$index, scope.row)">结束</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

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

                </div>
            </el-col>
        </el-row>
        <!-- 公告详情 -->
         <el-dialog title="公告查看" :visible.sync="dialogNoticeDetail" width="600px">
            <el-row style="margin:0 0 20px 20px;">
                <el-col :span="24">
                    <el-input
                        id="detail_content"
                        type="textarea"
                        resize='none'
                        maxlength="100"
                        v-model="items.detail_content">
                    </el-input>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            items:{
                notice_content:'',
                detail_content:''
            },
            date:'',
            input:'',
            tableData: [],
            listTableData:[],
            multipleSelection: [],
            textCount:100, // 输入内容的字体
            // 分页
            current_page:1,
            total:0,
            page_size:0,
            // 对话框
            formLabelWidth:120,
            dialogNoticeDetail:false,
            //查询条件
            queryDate:'',
            queryContent:'',
            query_start_date : '',
            query_end_date : ''

        }
    },
    watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
        items:{
            handler:function(){
                var vm = this;
                var _sum = 100; //字体限制为100个
                vm.textCount = _sum - vm.items.notice_content.length;
            },
            deep:true
        }
    },
    methods: {
        // 查询用户
        noticeQuery(){
            let vm = this
            vm.$ajax({
                method:'get',
                url:'/api/bloc/user',
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    phone:this.input
                }
            }).then(res=>{
                if(res.data.code==200){
                    this.tableData = res.data.data.list
                }
            })
        },
        // 获取接收公告的用户电话号码
        handleSelectionChange(val) {
            let arr = []
            val.map(item =>{
                arr.push(item.phone)
            })
            this.multipleSelection = arr;
        },
        // 发布公告
        noticeSubmit(){
            let vm = this
            if(vm.items.notice_content == '' || vm.date == ''){
                vm.$message({
                    type:'warning',
                    message:"请完善参数"
                })
                return false;
            }else{
               let startTime = vm.date[0];
               let endTime = vm.date[1];
               let Users = []
               Users = vm.multipleSelection
               console.log(Users)
               vm.$ajax({
                   method:'post',
                   url:'/api/annunciate',
                   headers:{'token':sessionStorage.getItem('token')},
                   data:{
                       users:Users,
                       content:this.items.notice_content,
                       startTime:startTime,
                       endTime:endTime,
                       
                   }
               }).then(res=>{
                    if(res.data.code == 200){
                        this.$alert('公告发布成功','提示',{
                            confirmButtonText:'确定',
                            callback:action =>{
                                vm.getNoticeList()
                                vm.noticeQuery()
                                vm.items.notice_content = '',
                                vm.date = ''
                                vm.input = ''
                            }
                        })
                    }
               })

            }
        },
        // 获取已发布的公告列表
        getNoticeList(){
            let vm = this
            if(vm.queryDate != ''){
                vm.query_start_date = vm.queryDate[0]
                vm.query_end_date = vm.queryDate[1]
            }
            vm.$ajax({
                method:'get',
                url:'/api/annunciate/list',
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    content : vm.queryContent,
                    beginTime : vm.query_start_date,
                    endTime : vm.query_end_date
                }
            }).then(res =>{
                if(res.data.code == 200){
                    console.log(res.data.data.list)
                    vm.listTableData=res.data.data.list.slice(0,vm.page_size==0?'10':vm.page_size)
                    vm.total = res.data.data.total
                    vm.listTableData.map(item => {
                        item.ctime = item.ctime.slice(0,10)
                        item.startTime = item.startTime.slice(0,10)
                        item.endTime = item.endTime.slice(0,10)
                    })
                }
            })
        },
        // 结束活动
        handleOver(index,row){
            let vm = this
            let id = row.id
            if(row.status != 2){
                this.$confirm('是否结束此条公告,此操作不可恢复?', '确认信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    vm.$ajax({
                        method:'put',
                        url:'/api/annunciate/'+id,
                        headers:{'token':sessionStorage.getItem('token')},
                    }).then(res => {
                        if(res.data.code == 200){
                            this.$alert('公告结束成功','提示',{
                                confirmButtonText:'确定',
                                callback:action =>{
                                    vm.getNoticeList()
                                }
                            })
                        }
                    })
                })
                .catch(res => {
                    this.$message({
                        type: 'info',
                        message: '已取消此操作！'
                    });          
                });
            }else{
                this.$alert('此条公告已结束！','提示',{
                    confirmButtonText:'确定',
                })
            }
        },
         // 查看详情
        handleCheck(index,row){
            this.dialogNoticeDetail = true
            this.items.detail_content = row.content
        },
        // 分页点击事件
        handleSizeChange(val) {  // pageSize 大小改变 改变时会触发
            let vm = this
            if(vm.queryDate != ''){
                vm.query_start_date = vm.queryDate[0]
                vm.query_end_date = vm.queryDate[1]
            }
            vm.listTableData = []
            vm.$ajax({
                method:'get',
                url:'/api/annunciate/list?page=1&size='+vm.page_size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    content : vm.queryContent,
                    beginTime : vm.query_start_date,
                    endTime : vm.query_end_date
                }
            }).then(res =>{
                if(res.data.code == 200){
                    vm.listTableData = res.data.data.list
                    vm.listTableData.map(item => {
                        item.ctime = item.ctime.slice(0,10)
                        item.startTime = item.startTime.slice(0,10)
                        item.endTime = item.endTime.slice(0,10)
                    })
                }
            })
        },
        handleCurrentChange(val) {  // currentPage 页数改变 改变时会触发
            let vm = this
            if(vm.queryDate != ''){
                vm.query_start_date = vm.queryDate[0]
                vm.query_end_date = vm.queryDate[1]
            }
            let size = vm.page_size==0?'10':vm.page_size
            vm.$ajax({
                method:'get',
                url:'/api/annunciate/list?page='+val+'&size='+size,
                headers:{'token':sessionStorage.getItem('token')},
                params:{
                    content : vm.queryContent,
                    beginTime : vm.query_start_date,
                    endTime : vm.query_end_date
                }
            }).then(res =>{
                if(res.data.code == 200){
                    vm.listTableData = res.data.data.list
                    vm.listTableData.map(item => {
                        item.ctime = item.ctime.slice(0,10)
                        item.startTime = item.startTime.slice(0,10)
                        item.endTime = item.endTime.slice(0,10)
                    })
                }
            })
        },
    },
    created () {
       this.noticeQuery();
       this.getNoticeList()
    }
}
</script>
<style lang="scss">
    #notice_content,#detail_content{
        height: 120px;
        width: 410px;
        border-radius: 0;
    }
    #detail_content{
        width: 100%;
        color: #666666;
    }
    // 字体输入
    #textCount{
        position:absolute;
        bottom:5px;
        right:10px;
        font-size:0.6em;
        color:#CCCCCC
    }
    // 标题
    .notice-title,.notice-choose{
        color:#333333
    }
    .notice-choose{
        font-size: 14px
    }
    .notice-title{
        font-size: 18px;
    }
    // 查询按钮
    #notice-query{
        width:80px;
        height:36px;
        font-size: 14px;
        border-radius:2px;
        margin-left:20px;
    }
    // 表格
    #notice-table{
        margin-top: 20px;
    }
    #notice-table td, #notice-table th{
        padding: 8px 0 8px 0px !important;
    }
    // 提交按钮
    #notice-submit{
        width:410px;
        height:40px;
        margin-top: 40px;
        font-size:18px;
        background:rgba(92,175,230,1);
        border-radius:2px;
    }
    // textarea提示内容的样式
    #notice_content::-webkit-input-placeholder {/*Chrome/Safari*/
        text-align: center;
        font-size:30px;
        color: #CCCCCC;
        line-height: 100px;
    }
    #notice_content::-moz-placeholder {/*Firefox*/
        text-align: center;
        font-size:30px;
        color: #CCCCCC;
        line-height: 100px;
    }
    #notice_content::-ms-input-placeholder {/*IE*/
        text-align: center;
        font-size:30px;
        line-height: 100px;
        color: #CCCCCC;
    }
</style>