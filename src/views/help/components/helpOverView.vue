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
import OverView from '@/config/help.js'
export default {
    name:'helpOverView',
    data(){
        return {
            help:[]
        }
    },
    created(){
        this.help = OverView.OverView
    }
}
</script>
