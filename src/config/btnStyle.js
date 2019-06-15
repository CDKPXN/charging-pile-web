//按钮切换颜色
const btnStyle = function(value){
    $(".btn").css({
        "background-color": "white",
        'color':'#606266'  
    });
    $(value).css({
        "background-color": "#409EFF",
        'color':'white'
    }); 
    $(value).removeClass('.btn');
}
module.exports = {
    btnStyle
}