<template>
  <div class="main">
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="总览" name="first">         
          <detail-pandect></detail-pandect>          
        </el-tab-pane>
        <el-tab-pane label="应收" name="second">
          <detailBody></detailBody>
        </el-tab-pane>
        <el-tab-pane label="实收" name="third">
          <detail-paid></detail-paid>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import detailBody from './components/detailBody.vue'
  import detailPaid from './components/detailPaid.vue'
  import detailPandect from './components/detailPandect.vue'
  export default {
    components:{
        detailBody,
        detailPaid,
        detailPandect,
    },
    data () {
      return {
        activeName: 'first',
      }
    },
    methods:{
      handleClick(tab, event) {
      
      },
    }
 }
</script>