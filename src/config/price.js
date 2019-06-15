// 快充 + 基础电价 总费
const fPrice = function(arr){
    var fastSum = []
    let fastPrice = []
    let basicEprice = []
    arr.map(item => {
        fastPrice.push(item.fPrice)  // 快充费用
        basicEprice.push(item.ePrice)  // 基础费用
    })
    for(var i = 0 ; i < arr.length;i++){
        let fast = (parseFloat(fastPrice[i])+parseFloat(basicEprice[i])).toFixed(2)  // 快充+基础费用
        fastSum.push(fast)
    }
    return fastSum
} 
// 慢充 + 基础电价 总费
const sPrice = function(arr){
    var slowSum = []
    let slowPrice = []
    let basicEprice = []
    arr.map(item => {
        slowPrice.push(item.fPrice) // 慢充费用
        basicEprice.push(item.ePrice) // 基础费用
    })
    for(var i = 0 ; i < arr.length;i++){
        let slow = (parseFloat(slowPrice[i])+parseFloat(basicEprice[i])).toFixed(2) // 慢充+基础费用
        slowSum.push(slow)
    }
    return slowSum
} 
module.exports = {
    fPrice,
    sPrice
}