<template>
<!-- ****** 根组件-包含所有路由 ******* -->
  <div id="app">
    <router-view  v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
   provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods:{
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
  }
}
}
</script>

<style>
  @import './style/style.scss';
</style>