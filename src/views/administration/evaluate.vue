<template>
  <div class="card" style="margin:30px 0 0 20px">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有用户" name="first">
            <user-list></user-list>
          </el-tab-pane>
          <el-tab-pane label="集团列表" name="second" v-if="auth.isAdmin()">
            <evaluate-list></evaluate-list>
          </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import UserList  from './components/userList.vue'
  import EvaluateList from './components/evaluateList.vue'

  export default {
    components:{
      EvaluateList,
      UserList
    },
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
    
      //标签切换
      handleClick(tab, event) {
        // sessionStorage.setItem('activeName',this.activeName)  
      },
    },
    created(){
        // this.activeName = sessionStorage.getItem('activeName')
    },
  };
</script>