<template>
    <div>
        <el-row>
            <el-col :span="24">
                <span>优惠界面</span>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="8" class="activity">
                <el-row class="activity-list">
                    <el-col :span="24">
                        <span style="font-size:20px;">注册送红包</span>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="margin-top:20px;line-height:36px;">
                    <el-col :span="12">
                        <span>红包金额（元）：</span>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="h_money"  type="number" class="activity_input"></el-input>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="margin-top:20px;">
                    <el-col :span="8">
                    <span>活动状态：</span>
                    </el-col>
                    <el-col :span="14">
                        <el-radio v-model="h_radio" label="1">开启</el-radio>
                        <el-radio v-model="h_radio" label="2">结束</el-radio>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="text-align:center;">
                    <el-col :span="24">
                        <el-button type="primary" @click="saveActivity(1)">保存</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8" class="activity">
                <el-row class="activity-list">
                    <el-col :span="24">
                        <span style="font-size:20px;">充电打折</span>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="margin-top:20px;line-height:36px;">
                    <el-col :span="12">
                        <span>打折折扣（折）：</span>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="d_money" type="number" class="activity_input"></el-input>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="margin-top:20px;">
                    <el-col :span="8">
                    <span>活动状态：</span>
                    </el-col>
                    <el-col :span="14">
                        <el-radio v-model="d_radio" label="1">开启</el-radio>
                        <el-radio v-model="d_radio" label="2">结束</el-radio>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="text-align:center;">
                    <el-col :span="24">
                        <el-button type="primary" @click="saveActivity(2)">保存</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8" class="activity">
                <el-row class="activity-list">
                    <el-col :span="24">
                        <span style="font-size:20px;">推广送红包</span>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="margin-top:20px;line-height:36px;">
                    <el-col :span="12">
                        <span>红包金额（元）：</span>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="t_money" type="number" class="activity_input"></el-input>
                    </el-col>
                </el-row>
                <!-- <el-row class="activity-list" style="line-height:36px;">
                    <el-col :span="12">
                        <span>红包上限（个）：</span>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="t_h_number" class="activity_input"></el-input>
                    </el-col>
                </el-row> -->
                <el-row class="activity-list">
                    <el-col :span="8">
                    <span>活动状态：</span>
                    </el-col>
                    <el-col :span="14">
                        <el-radio v-model="t_radio" label="1">开启</el-radio>
                        <el-radio v-model="t_radio" label="2">结束</el-radio>
                    </el-col>
                </el-row>
                <el-row class="activity-list" style="text-align:center;">
                    <el-col :span="24">
                        <el-button type="primary" @click="saveActivity(3)">保存</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
             <el-col :span="24" id="activity_c">
                <el-row>
                    <el-col :span="24">
                        <span style="font-size:20px;">充值送红包</span>
                    </el-col>
                </el-row>
                <el-row  style="line-height:36px;">
                    <el-col :span="4">
                        <span>充值金额（元）：</span>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="charFrom.money_one" disabled class="activity_input activity_right"></el-input>
                        <el-input v-model="charFrom.money_two" disabled class="activity_input activity_right"></el-input>
                        <el-input v-model="charFrom.money_three" disabled class="activity_input activity_right"></el-input>
                        <el-input v-model="charFrom.money_four" disabled class="activity_input activity_right"></el-input>
                        <el-input v-model="charFrom.money_five" disabled class="activity_input activity_right"></el-input>
                        <el-input v-model="charFrom.money_six" disabled class="activity_input activity_right"></el-input>
                    </el-col>
                </el-row>
                <el-row style="line-height:36px;">
                    <el-col :span="4">
                        <span>赠送金额（元）：</span>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="giveFrom.money_one" type="number" class="activity_input activity_right"></el-input>
                        <el-input v-model="giveFrom.money_two" type="number" class="activity_input activity_right"></el-input>
                        <el-input v-model="giveFrom.money_three" type="number" class="activity_input activity_right"></el-input>
                        <el-input v-model="giveFrom.money_four" type="number" class="activity_input activity_right"></el-input>
                        <el-input v-model="giveFrom.money_five" type="number" class="activity_input activity_right"></el-input>
                        <el-input v-model="giveFrom.money_six" type="number" class="activity_input activity_right"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                    <span>活动状态：</span>
                    </el-col>
                    <el-col :span="4">
                        <el-radio v-model="c_radio" label="1">开启</el-radio>
                        <el-radio v-model="c_radio" label="2">结束</el-radio>
                    </el-col>
                </el-row>
                <el-row style="text-align:center;">
                    <el-col :span="24">
                        <el-button type="primary" @click="saveActivity(4)">保存</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 注册
            h_money:'',
            h_radio:'',
            h_id:'',
            // 打折
            d_money:'',
            d_radio:'',
            d_id:'',
            // 推广
            t_money:'',
            t_h_number:'',
            t_radio:'',
            t_id:'',
            // 充值
            charFrom:{
                money_one:10,
                money_two:20,
                money_three:50,
                money_four:100,
                money_five:200,
                money_six:300,
            },
            giveFrom:{
                money_one:'',
                money_two:'',
                money_three:'',
                money_four:'',
                money_five:'',
                money_six:'',
            },
            c_radio:'',
            c_id:'',

            // 活动amount
            h_amount:[],
            d_amount:[],
            t_amount:[],
            c_amount:[],
        }
    },
    methods:{
        // 获取活动列表
        getActivity(){
            let vm = this
            vm.$ajax({
                method:'get',
                url:'/api/activity',
                headers:{'token':sessionStorage.getItem('token')}
            }).then(res => {
                if(res.data.code == 200){
                    console.log(res.data.data)
                    // 活动内容json字符串转json对象
                    let register = eval('(' + res.data.data[0].content + ')');  
                    let charging = eval('('+ res.data.data[1].content +')') 
                    let extension = eval('(' + res.data.data[2].content + ')'); 
                    let discount = eval('(' + res.data.data[3].content + ')');
                    
                    vm.h_amount = register.amount
                    vm.c_amount = charging.amount
                    vm.t_amount = extension.amount
                    vm.d_amount = discount.amount

                    vm.h_money = register.amount[0] / 100  // 注册赠送金额
                    vm.t_money = extension.amount[0] / 100  // 推广赠送金额
                    vm.d_money = discount.discount / 10  // 打折折扣率

                    vm.giveFrom.money_one =charging.amount[0] / 100
                    vm.giveFrom.money_two =charging.amount[1] / 100
                    vm.giveFrom.money_three =charging.amount[2] / 100
                    vm.giveFrom.money_four =charging.amount[3] / 100
                    vm.giveFrom.money_five =charging.amount[4] / 100
                    vm.giveFrom.money_six =charging.amount[5] / 100

                    // 活动状态
                    vm.h_radio = String(res.data.data[0].status)  //注册
                    vm.h_id = res.data.data[0].id
                    vm.c_radio = String(res.data.data[1].status)  // 充值
                    vm.c_id = res.data.data[1].id
                    vm.t_radio = String(res.data.data[2].status)  // 推荐
                    vm.t_id = res.data.data[2].id
                    vm.d_radio = String(res.data.data[3].status) // 折扣
                    vm.d_id = res.data.data[3].id
                }
            })
        },
        // 保存注册活动
        saveActivity(index){
            let vm =  this
            let Id = ''
            let Status = ''
            let obj = {}
            if(index == 1){  // 注册活动参数
                Id = vm.h_id
                Status = vm.h_radio
                vm.h_amount[0] = parseFloat(vm.h_money * 100)
                obj = JSON.stringify({amount:vm.h_amount,discount:90})
            }else if(index == 2){   // 充电打折活动参数
                Id = vm.d_id;
                Status = vm.d_radio;
                obj = JSON.stringify({amount:vm.d_amount,discount:vm.d_money * 10})
            }else if(index == 3){   // 推广活动参数
                Id = vm.t_id
                Status = vm.t_radio
                vm.t_amount[0] = parseFloat(vm.t_money * 100)
                obj = JSON.stringify({amount:vm.t_amount,discount:90})
            }else{  // 充值活动参数
                Id = vm.c_id
                Status = vm.c_radio
                vm.c_amount[0] = parseFloat(vm.giveFrom.money_one * 100)
                vm.c_amount[1] = parseFloat(vm.giveFrom.money_two * 100)
                vm.c_amount[2] = parseFloat(vm.giveFrom.money_three * 100)
                vm.c_amount[3] = parseFloat(vm.giveFrom.money_four * 100)
                vm.c_amount[4] = parseFloat(vm.giveFrom.money_five * 100)
                vm.c_amount[5] = parseFloat(vm.giveFrom.money_six * 100)
                obj = JSON.stringify({amount:vm.c_amount,discount:90})
            }
            vm.$ajax({
                method:'put',
                url:'/api/activity',
                headers:{'token':sessionStorage.getItem('token')},
                data:{
                    id:Id,
                    status:Status,
                    content:obj
                }
            }).then(res => {
                if(res.data.code == 200){
                    this.$alert('保存成功!', '消息提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            vm.getActivity()
                        }
                    });
                }else if(res.data.code == 400){
                    this.$alert(res.data.message+'若要修改金额,请先开启活动!', '消息提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            vm.getActivity()
                        }
                    });
                }
            })
        },
    },
    created () {
        this.getActivity()
    }
}
</script>

<style lang="scss" scoped>
    .activity{
        width: 280px;
        height: 332px;
        color: rgba(80, 80, 80, 1);
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        font-size: 14px;
        margin-right: 30px;
        padding: 10px 0 0 30px;
        .activity-list{
            margin-top: 20px;
        }
    }
    #activity_c{
        width: 900px;
	    height: 332px;
        padding: 10px 0 0 30px;
        background-color: rgb(255, 255, 255);
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        border-radius: 4px;
        .el-row{
            margin-top: 20px;
        }
    }
    .activity_input{
        width: 80px;
    }
    .activity_right{
        margin-right: 10px;
    }
</style>
