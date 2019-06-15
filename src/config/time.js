//获取结束时间
const getEndTime = function(num){
    var GetDate = new Date()
    let Year = GetDate.getFullYear()
    let Month = GetDate.getMonth() + 1
    let Day = GetDate.getDate()
    let hours = GetDate.getHours();
    let minutes = GetDate.getMinutes();
    let seconds =  GetDate.getSeconds();
    
    if(Month < 10){
        Month = '0' + Month
    }
    if(Day < 10){
        Day = '0' + Day
    } 
    if(num==1){
        var timestamp = new Date().getTime();
        var date = new Date(timestamp - (num * 24 * 60 * 60 * 1000) );
        let endTime = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ (date.getDate()+1) +' 00:00:00'
        return endTime
    }else{
        let endTime = Year +'-'+ Month +'-'+ Day +' '+ full(hours) +":"+full(minutes) +":"+full(seconds) 
        return endTime
    }
    
}
function full(value){
    if(value<10){
        return '0'+value;
    }
    return value;
}
//获取开始时间
const getBeginTime = function(value){
    var GetDate = new Date()
    var timestamp =GetDate.getTime(); 
    var date = new Date(timestamp - (value * 24 * 60 * 60 * 1000));
    if(value==7){       
      let beginTime = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ (date.getDate()+1) +' 00:00:00'
      return beginTime
    }else if(value==30){
        let beginTime = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ (date.getDate()+1) +' 00:00:00'  
        return beginTime
    }else{
        let beginTime = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ (date.getDate()) +' 00:00:00'
        return beginTime
    }
    
   
}
//判断月份的天数
function getDayNum(Month){
    if(Month==2){
        if( Year % 4 == 0 && ( Year % 100 != 0 || Year % 400 == 0)){
            DayNum = 29;
        }else{
            DayNum = 28
        }
    }else if (Month==4 || Month==6 || Month==9 || Month==11){
        DayNum = 30;
    }else{
        DayNum = 31;
    }
    return DayNum
}
module.exports = {
    getEndTime,
    getBeginTime
}