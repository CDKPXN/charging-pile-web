// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// ****************************************************************************//
  /**
   * 1. config 配置api地址
   * 2. containers 根组件的容器
   * 3. router 路由
   * 4. style 全局样式
   * 5. views 路由组件
   * 6. 
   *  static 
   *    离线 element ui插件
   *    离线 Font Awesome 字体
   *    离线 vue-baidu-map 地图
   *    离线 echarts 图层
   * 7. test 单元测试
   */
//*****************************************************************************//
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui';
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import url from './config/url.js'
import 'vue/dist/vue.js'
import $ from  'jquery'
import VDistpicker from 'v-distpicker' // 引入省市选择器
import auth from './config/auth.js'

Vue.component('v-distpicker', VDistpicker) // 注册组件

Vue.prototype.$token=url.token
Vue.prototype.auth=auth

window.eventBus = new Vue();

window.eventHub = new Vue();

// 封装一个全局跳转
Vue.prototype.jump = function () {
  if(arguments.length == 1){
    this.$router.push(arguments[0])
  }else{
    this.$router.push({
      path: arguments[0],
      query:arguments[1]
    })
  }
  if(arguments.length>2){
    console.error('参数超过封装好的jump方法')
  }
  
}

//全局封装一个congsole.log()打印方法
Vue.prototype.clg= function(val){
  console.log(val)
}

// 封装定义请求的地址
let ajax = axios.create({
  baseURL: url.localSrc,
  timeout: 20000,
  // headers: {'Header': url.token}
})

Vue.prototype.$ajax = ajax

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'cT9pk8FfbzTsI2hWhkgMdqfB2xQPO5yF'
})
Vue.use(Element, { size: 'small' });

Vue.config.productionTip = false //** 关闭生产模式下给出的提示 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})