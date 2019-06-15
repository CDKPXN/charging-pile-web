import http from './public'

//             登录
export const api_login = (params) => {
  return http.post_data('/api/auth',params)
}

//              总览 

    //统计：年收入，月收入，本周的每天收入
export const api_overview = () => {
  return http.get_null('/api/pandect/statisticsForYearMonthWeek')
}
    //查询前7电站详情
export const api_topSeven = () => {
  return http.get_null('/api/pandect/top')
}
    //查询前7电站详情
export const api_topTen = () => {
  return http.get_null('/api/pandect/topForPile')
}

// 上传文件
export const api_file = (params) => {
  return http.post_data('/api/files',params)
}
//              集团

    //  集团列表
export const api_groupList = (page,size,params) => {
  return http.post_data('/api/bloc/list?page='+page+'&size='+size,params)
}
    //  创建集团
export const api_addGroup = (params) => {
  return http.post_data('/api/bloc',params)
}
    //  修改集团
export const api_modifyGroup = (params) => {
  return http.put_data('/api/bloc',params)
}
//              业主

    //  业主列表
export const api_ownerList = (page,size,params) => {
  return http.get_data('/app/admin/list?page='+page+'&size='+size,params)
}
    //  业主添加
export const api_addOwner = (params) => {
  return http.post_data('/api/admin',params)
}
    //  业主修改
export const api_modifyOwner = (params) => {
  return http.put_data('/app/admin',params)
}
   //  业主详情
export const api_detailOwner = (page,size,params) => {
  return http.get_data('/app/admin/list?page='+page+'&size='+size,params)
}
//              车辆

    //  集团车辆列表
export const api_groupCarList = (page,size,params) => {
  return http.post_data('/api/car/bloc?page='+page+'&size='+size,params)
}
//             站点管理
    //请求/查询站点列表
export const api_groupSiteList = () => {
  return http.get_null('/api/site/list')
}
   //添加站点请求
export const api_addSite = (params) => {
  return http.post_data('/api/site',params)
}
    //修改站点信息
export const api_changeSite = (params) => {
  return http.put_data('/api/site',params)
}
    //根据传过来的参数获取站点详细信息
export const api_detailSite = (params) => {
  return http.get_data('/api/site/list',params)
}
     //查询桩点
export const api_groupPileList = (id) => {
  return http.get_null('/api/pile/site/'+id)
}
    //添加桩点
export const api_addPile = (params) => {
  return http.post_data('/api/pile',params)
}