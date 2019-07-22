import Vue from 'vue'
import Router from 'vue-router'
import full from '@/containers/full'
// 左侧菜单栏
// import sidebar from '@/views/menu/sidebar' 
//站点
import chargingNetwork from '@/views/monitor/chargingNetwork'  
import controlRecord from '@/views/monitor/controlRecord'
import addCharge from '@/views/monitor/addCharge'       
import rate from '@/views/monitor/rate'   
import addDialog from '@/views/monitor/dialog/addDialog'
// 财务-电子发票管理
import invoiceChart from '@/views/postage/invoiceChart'
// 财务-充值记录管理
import incomeDetail from '@/views/postage/incomeDetail'
// 财务-用户资费管理
import userBalance from '@/views/postage/userBalance'
//告警
import giveAnAlarm from '@/views/alarm/giveAnAlarm'
// import historyAlarm from '@/views/alarm/historyAlarm'
import detailAlarm from '@/views/alarm/components/detailAlarm'
//图表
import echartsCom from '@/views/overview/echartsCom'
//用户
import evaluate from '@/views/administration/evaluate'
import management from '@/views/administration/management'
import shuakaUser from '@/views/administration/shuakaUser'
import shuakaChildren from '@/views/administration/components/shuakaChildren'
import ownerDetail from '@/views/administration/components/ownerDetail'
import registered from '@/views/administration/components/registered'
import costList from '@/views/administration/components/costList'

//订单
import charging from '@/views/indent/charging'  //充电记录
import recharge from '@/views/indent/recharge'  //充值记录

//活动
import activityList from '@/views/activity/activityList'  //活动管理
import redEnvelopes from '@/views/activity/redEnvelopes'  //红包列表

//车辆
import groupVehicles from '@/views/vehicle/groupVehicles'  //集团车辆
import privateVehicles from '@/views/vehicle/privateVehicles' //车架车辆

//评价
import evaluation from '@/views/evaluation/evaluation' //评价列表



import electricPile from '@/views/statistics/electricPile'
import siteDetails from '@/views/statistics/components/siteDetails'

// 公告
import notice from '@/views/notice/notice'

//设置

import setting from '@/views/setting/Appsetting'


//管理帮助
import help from '@/views/help/help'

import login from '@/views/pages/login'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: full,
      children:[
        {
          path: '/',
          component: login
        },
        {
          path: '/echartsCom',
          name:'总览',
          component: echartsCom
        },
        {
          path: '/chargingNetwork',
          component: chargingNetwork
        },
        {
          path: '/chargingNetwork',
          name: '充电网络',
          component: chargingNetwork,
         
        },
        {
          path: '/controlRecord',
          name: '电站列表',
          component: controlRecord,
      
        },
        {
          path: '/addCharge',
          name: '新增电站',
          component: addCharge,
      
        },
        {
          path: '/addDialog',
          name:'电站详情',
          component: addDialog
        },
        {
          path: '/rate',
          name: '费率管理',
          component: rate
        },
     
        {
          path: '/incomeDetail',
          name: '财务充值管理',
          component: incomeDetail
        },
        {
          path: '/userBalance',
          name: '用户资费管理',
          component: userBalance
        },
        {
          path: '/invoiceChart',
          name: '财务发票管理',
          component: invoiceChart
        },
        {
          path: '/giveAnAlarm',
          name: '实时告警',
          component: giveAnAlarm
        },
        {
          path: '/detailAlarm',
          name: '告警详情',
          component: detailAlarm
        },
        {
          path: '/evaluate',
          name: '集团列表',
          component: evaluate
        },
        {
          path: '/registered',
          name: '集团用户',
          component: registered
        },
        {
          path: '/costList',
          name: '消费记录',
          component: costList
        },
        {
          path: '/management',
          name: '业主用户',
          component: management
        },
        {
          path: '/shuakaUser',
          name: '刷卡用户',
          component: shuakaUser
        },
        {
          path: '/shuakaChildren',
          name: '刷卡子用户',
          component: shuakaChildren
        },
        {
          path: '/ownerDetail',
          name:'业主详情',
          component: ownerDetail
        },
        {
          path: '/recharge',
          name: '充值订单',
          component: recharge
        },
        {
          path: '/charging',
          name: '充电订单',
          component: charging
        },{
          path: '/activityList',
          name: '活动管理',
          component: activityList
        },
        {
          path: '/redEnvelopes',
          name: '红包列表',
          component: redEnvelopes
        },      
        {
          path: '/groupVehicles',
          name: '集团车辆',
          component: groupVehicles
        },
        {
          path: '/privateVehicles',
          name: '私家车辆',
          component: privateVehicles
        },
        {
          path: '/evaluation',
          name: '评价管理',
          component: evaluation
        },
        {
          path: '/siteDetails',
          name: '统计站点详情',
          component: siteDetails
        },
        {
          path: '/help',
          name: '帮助管理',
          component: help,
        },
        {
          path: '/setting',
          name: '设置',
          component: setting,
        },
        {
          path: '/electricPile',
          name: '数据统计',
          component: electricPile,
        },
        {
          path: '/notice',
          name: '公告管理',
          component: notice,
        },

      ]
    },
    {
      path: '/login',
      name: '登录',
      component: login
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.fullPath!=='/login') {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router