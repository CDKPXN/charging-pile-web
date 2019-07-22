<template>
    <el-menu :default-active="defActive" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse" :unique-opened="true" background-color="#2f4050" text-color="#a6a9ad"
        active-text-color="#fff" 
        :router="true"
        style="height:100%;
        margin-bottom:-10px;
        z-index:1000;
        position:fixed"
    > 
    <div class="userImg">
        <img src="../../static/img/2.jpg" alt="" style="border-radius:50%;width:50px;height:50px;">
    </div>
    <el-menu-item index="/echartsCom">
        <i class="fa fa-home fa-lg" style="width:26px"></i>&nbsp; 
        <span slot="title" class="sidebarTitle">总览</span>
    </el-menu-item>
    <el-submenu v-for="(tmp,index) in navBar" :key="index"  :index="tmp.index" > 
        <template slot="title" >
            <i :class="tmp.icon" style="width:26px"></i>&nbsp; 
            
            <span slot="title">{{tmp.name}}</span>
        </template>
        <el-menu-item-group v-for="(item,index) in tmp.children" :key="index" >
            <el-menu-item :index="item.path"   >{{item.name}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/electricPile">
        <i class="fa fa-bar-chart fa-lg"></i> &nbsp; 
        <span slot="title">统计</span>
    </el-menu-item>
    <el-menu-item index="/notice" v-show="isAdmin">
        <i class="fa fa-volume-up fa-lg" aria-hidden="true"></i> &nbsp; 
        <span slot="title">公告</span>
    </el-menu-item>
    <el-menu-item index="/help">
        <i class="fa fa-question-circle fa-lg" aria-hidden="true"></i> &nbsp; 
        <span slot="title">帮助</span>
    </el-menu-item>
    <!-- 设置 -->
     <el-submenu  index='7' v-show="isAdmin">  
          <template slot="title" >
            <i class="fa fa-question-circle fa-lg" style="width:26px"></i>&nbsp; 
            <span slot="title">设置</span>
          </template>  
           <el-menu-item-group>
                      <el-menu-item index="/setting" >APP设置</el-menu-item>      
             </el-menu-item-group>
    </el-submenu>
</el-menu>
</template>
<script>
import sidebar from './nav.js'
export default {
    props:['defActive'],
    name:'ElMenuAside',
    data(){
        return{
            navBar:[],
            isCollapse:false,
            isAdmin:true
        }
    },
    methods:{
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        newArray(arr){
             let newArray= [];
            arr.map(m=>{
                 if(m.isShow){
                      newArray.push(m)
                  }
            })
            return newArray;
        }
    },
    created(){
        console.log("边导航:",sidebar.nav)
        let user = localStorage.getItem('user')
        console.log('当前用户身份',user)
        if(user !== "admin"){
            this.isAdmin = false;
            let newArray= [];
             let auth = ['站点','充电网络','电站列表','订单','充电订单','充值订单','用户','集团用户']
			let set = new Set();
            auth.map((value)=>{
                set.add(value)
            })
            let i = set.size;      
            let arr = [];   
            sidebar.nav.map((value,index)=>{
                var name = value.name;
                console.log("name",name)
                set.add(name)
                 //console.log('set.size>i',set,set.size)
                if(set.size>i){
                    set.delete(name);
                }else{
                    var childrenArr = [];
                    value.children.map(m=>{
                        var childreName = m.name;
                        // console.log(m)
                        // console.log("www",childreName)
                        //  console.log('set1',set)
                        // console.log('set.size>---0',set.size)
                        set.add(childreName)
                        // console.log('set2',set)
                        //  console.log('set.size>1',set.size)
                         if(set.size>i){
                             console.log("包含")    
                            set.delete(childreName);
                         }else{
                             console.log("不包含")
                             childrenArr.push(m);
                         }
                        //  console.log('set.size>2',set.size)
                    })
                    value.children = childrenArr
                    arr.push(value)
                    
                }
            }
            );
             sidebar.nav = arr;
        //    sidebar.nav.splice(0,1)
        //      sidebar.nav.splice(1,1)
        //      sidebar.nav.splice(2,2)
        //     console.log("边导航a:",sidebar.nav)
        //      sidebar.nav[1].children.splice(1,1)
         
        }
        
        this.navBar=sidebar.nav
        console.log('ddd',sidebar.nav)
    }
}
</script>
<style lang="scss" scoped>
    .sidebarTitle{
        margin-right: 10px;
    }
</style>
