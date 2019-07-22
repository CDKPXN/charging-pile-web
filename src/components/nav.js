const nav = [
    {
        'index': '1',
        'name': '财务',
        'icon': 'fa fa-cc-visa fa-lg',
        'children': [
            {   
               
                'name': '财务统计',
                'path': '/incomeDetail',
              
            },
            {
                'name': '用户财务',
                'path': '/userBalance',

            },
            {
                'name': '电子发票',
                'path': '/invoiceChart',
                
            }

        ]
    },
    {
        'index': '2',
        'name': '站点',
        'icon': 'fa fa-television fa-lg',
        
        'children': [
            {
                'name': '充电网络',
                'path': '/chargingNetwork',
                
            },
            {
                'name': '电站列表',
                'path': '/controlRecord',
                
            }
        ]
    },
    {
        'index':'3',
        'name':'用户',
        'icon':'fa fa-address-card-o fa-lg',
        
        'children':[
            {
                'name':'业主用户',
                'path':'/management',
                
            },{
                'name':'集团用户',
                'path':'/evaluate',
                
            },
            {
                'name':'刷卡用户',
                'path':'/shuakaUser',
                
            }
        ]
    },{
        'index':'4',
        'name':'订单',
        'icon':'fa fa-indent fa-lg',
        
        'children':[
            {
                'name':'充电订单',
                'path':'/charging',
                
            },{
                'name':'充值订单',
                'path':'/recharge',
                
            }
        ]
    },{
        'index':'5',
        'name':'活动',
        'icon':'fa fa-tags fa-lg',
        
        'children':[
            {
                'name':'活动管理',
                'path':'/activityList',
                
            },{
                'name':'红包列表',
                'path':'/redEnvelopes',
                
            }
        ]
    },{
        'index':'6',
        'name':'车辆',
        'icon':'fa fa fa-car fa-lg',
        
        'children':[
            {
                'name':'集团车辆',
                'path':'/groupVehicles',
                
            },{
                'name':'私家车辆',
                'path':'/privateVehicles',
                
            }
        ]
    },

    // {
    //     'index':'7',
    //     'name':'评价',
    //     'icon':'fa fa-pencil-square-o fa-lg',
    //     'children':[
    //         {
    //             'name':'评价列表',
    //             'path':'/evaluation'
    //         }
    //     ]
    // }
]
module.exports = {
    nav
}