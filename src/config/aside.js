//  左侧菜单  判断
const defActive = function(defUrl){
    if(defUrl == '/ownerDetail'){
        defUrl = '/management'
    }
    if(defUrl == '/addDialog' || defUrl == '/addCharge' || defUrl == '/rate'){
        defUrl = '/controlRecord'
    }
    if(defUrl == '/registered'){
        defUrl = '/evaluate'
    }
    if(defUrl == '/siteDetails'){
        defUrl = '/electricPile'
    }
    return defUrl
}
module.exports = {
    defActive
}