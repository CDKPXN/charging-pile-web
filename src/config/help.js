// 总览
const OverView = [
    {'title':'登录与退出','content':'在界面右上方找到并点击admin模块，即可弹出下拉菜单“修改密码”，“退出登录”，点击相应的功能模块即可进行修改密码操作和退出登录操作。','src':'static/img/help/OverView/log_out.png'},
    {'title':'常驻图表显示详细信息','content':'鼠标常驻在图表上，会显示图标的详细信息。','src':'static/img/help/OverView/ov_details.png'},
    {'title':'总览4个栏目','content':'总览首页顶部四个区域显示了本月的一些信息，点击可进入详情界面。','src':'static/img/help/OverView/ov_header.png'},
]
// 财务
const Financial = [
    {'title':'财务-总览界面','content':'财务首页-总览界面可看到本年与本周的收入情况柱状图,并且可以看到应收，实收的对比图。','src':'static/img/help/Financial/fin_ov.png'},
    {'title':'财务-应收界面','content':'应收界面由左右两部分区域组成，左侧区域是应收列表，可通过上方筛选得到想要的结果，右侧区域是对应收数据的的一个简单汇总。','src':'static/img/help/Financial/fin_y.png'},
    {'title':'财务-实收界面','content':'实收界面由左右两部分区域组成，左侧区域是实收列表，可通过上方筛选得到想要的结果，右侧区域是对实收数据的的一个简单汇总。','src':'static/img/help/Financial/fin_s.png'},
] 
// 站点
const Site = [
    {'title':'站点-充电网络界面','content':'点击站点子菜单“充电网络”，右侧为地图界面，所有的充电站点分布在地图上，点击任意站点图标，弹出详情窗口，详情窗口显示了站点名称等一些相关信息，点击详情窗口可进入该充电站的详情管理界面。','src':'static/img/help/Site/site_map.png'},
    {'title':'站点-电站列表','content':'电站列表界面以列表形式展示出了所有电站，点击详情可进入电站的详情页，点击新增站点可进行增加站点操作,通过筛选功能可快速定位到想查询的电站。','src':'static/img/help/Site/site_list.png'},
    {'title':'站点-电站详情','content':'电站详情主要由上下两个区域组成，上部分三个色块展示了电站的详细信息，下部分区域是电站中电桩的列表展示，点击“修改信息”可修改电站的信息，点击“新增电桩”可进行新增电桩操作，点击详情可查看电桩的详细信息。','src':'static/img/help/Site/site_details.png'},
    {'title':'站点-信息修改','content':'电站的信息修改界面由左右两部分区域组成，在右侧拖到小红点到任意地点，最侧区域会自动填充相关的地理位置信息。点击“费率设置”可进入费率设置页面进行电站的费率修改。','src':'static/img/help/Site/site_amend.png'},
    {'title':'站点-费率设置','content':'电站费率设置界面分为左侧列表和右侧折线图，点击上方时间区域可进行时间段的切换，点击编辑可对当前时间段电费服务费的设置，右侧点击“慢充详情”“快充详情”可进行快慢充折线图的切换。','src':'static/img/help/Site/site_rate.png'},
]
// 用户
const User = [
    {'title':'用户-业主用户界面','content':'业主页面主要以列表形式展示出了所有的业主用户，通过左上方筛选条件可进行条件查询查到所需要的信息，点击右上方“新增业主”可进行新增业主的操作，点击列表上的详情按钮可跳转到详情界面查看详情，点击编辑可对业主信息进行修改。','src':'static/img/help/User/user_list.png'},
    {'title':'用户-业主详情','content':'业主详情界面分为上下两块区域，上方蓝色色块区域显示了业主的详细信息，下方以列表展示了所关联的电站，点击“绑定电站”可进行绑定电站操作，点击列表上的“解绑”可进 行解绑操作，右上角返回按钮可返回“业主用户”界面。','src':'static/img/help/User/user_details.png'},
]
// 订单
const Order = [
    {'title':'订单-充电订单界面','content':'充电订单界面主要以列表形式展示出了所有的充电订单，通过上方筛选功能可查到所需要的信息，点击“导出报表”可将所有充电订单导出为excel表。','src':'static/img/help/Order/order_charging.png'},
    {'title':'订单-充值订单界面','content':'充值订单界面主要以列表形式展示出了所有的充值订单，通过上方筛选功能可查到所需要的信息，点击“导出报表”可将所有充值订单导出为excel表。','src':'static/img/help/Order/order_recharge.png'},
]
// 车辆
const Vehicle = [
    {'title':'车辆-集团车辆界面','content':'集团车辆界面以列表形式展示出了所有集团的车辆信息，通过筛选可查出某一集团下的所有车辆。','src':'static/img/help/Vehicle/veh_group.png'},
    {'title':'车辆-私家车辆界面','content':'私家车辆界面以列表形式展示出了所有私家车辆的信息，可通过车牌号筛选到对应的车辆信息。','src':'static/img/help/Vehicle/veh_private.png'},
]
const Alarm = [
    {'title':'告警页面的进入','content':'在界面右上方找到并点击小铃铛，即可进入告警页面。','src':'static/img/help/Alarm/alarm_enter.png'},
    {'title':'告警界面','content':'告警界面以列表形式展示出了所有告警信息，点击“详情”进入详情界面，通过上方筛选功能可搜索所需要的信息。','src':'static/img/help/Alarm/alarm_list.png'},
    {'title':'告警-详情页面','content':'告警详情界面展示了一些告警时间地点等的详细信息，点击右上角“返回”可返回上一级页面。','src':'static/img/help/Alarm/alarm_details.png'},
]
// 统计
const Statistical = [
    {'title':'统计-快速查看','content':'快速查看区域无需搜索即可快速查看到“今天”，“昨天”，”最近7天”等数据，若有更多需求，可使用右侧筛选功能来实现，下方则是相应的数据显示。','src':'static/img/help/Statistical/sta_fastLook.png'},
    {'title':'统计-折线图','content':'折线图有六部分，点击相应的区域切换显示，鼠标移动到折线图的端点上，会显示详细数据，可通过折线图看到今年的趋势情况。','src':'static/img/help/Statistical/sta_line.png'},
    {'title':'统计-电站信息','content':'饼状图区域主要由“故障详情构成”饼状图和“用户构成”饼状所组成，鼠标移到饼状图上会显示相应的数据。','src':'static/img/help/Statistical/sta_siteList.png'},
    {'title':'统计-电站详情','content':'电站详情由三部分组成，从上到下依次是电桩列表，电站折线图，饼状图。','src':'static/img/help/Statistical/sta_pie.png'},
    {'title':'统计-折线图','content':'折线图有六部分，点击相应的区域切换显示，鼠标移动到折线图的端点上，会显示详细数据，可通过折线图看到今年的趋势情况。','src':'static/img/help/Statistical/sta_siteDetails.png'},
]
module.exports = {
    OverView,
    Financial,
    Site,
    User,
    Order,
    Vehicle,
    Statistical,
    Alarm
}