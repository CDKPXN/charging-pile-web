<template>
    <div id="helpOverView">
        <div v-for="(item,index) in help" :key="index" :index='index'>
            <el-row>
                <el-col :span="24">
                    <span class="ov_Login">{{item.title}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <ul>
                        <li>{{item.content}}</li>
                    </ul>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <img :src="item.src" alt="">
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import Vehicle from '@/config/help.js'
export default {
    name:'Vehicle',
    data(){
        return {
            help:[]
        }
    },
    created(){
        this.help = Vehicle.Vehicle
    }
}
</script>
