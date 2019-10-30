// $(document).delegate(".delete>div", "click", function() {
//     $("#idNumber1").val($(this).text());
// });

$(".search input").focus(function(){
    $(".search input").val("");
});
/*搜索记录相关*/
//从localStorage获取搜索时间的数组
var hisTime;
//从localStorage获取搜索内容的数组
var hisItem;
//从localStorage获取最早的1个搜索时间
var firstKey;

function init() {
    //每次执行都把2个数组置空
    hisTime = [];
    hisItem = [];
    //模拟localStorage本来有的记录
    //localStorage.setItem("a",12333);
    //本函数内的两个for循环用到的变量
    var i = 0
    for(; i < localStorage.length; i++) {
        if(!isNaN(localStorage.key(i))) {
            hisItem.push(localStorage.getItem(localStorage.key(i)));
            hisTime.push(localStorage.key(i));
        }
    }
    i = 0;
    //执行init(),每次清空之前添加的节点
    $(".his-record").html("");
    for(; i < hisItem.length; i++) {
        //alert(hisItem);
        $(".his-record").prepend('<li><a href="pro-list.html">'+ hisItem[i] +'</a></li>')
    }
}
init();

$(".search img").click(function() {
    var value = $(".search input").val();
    window.location.href="pro-list.html";
     var time = (new Date()).getTime();

    if(!value) {
        alert("请输入搜索内容");
        window.location.reload();
        return false;
    }

    //输入的内容localStorage有记录
    if($.inArray(value, hisItem) >= 0) {
        for(var j = 0; j < localStorage.length; j++) {
            if(value == localStorage.getItem(localStorage.key(j))) {
                localStorage.removeItem(localStorage.key(j));
            }
        }
        localStorage.setItem(time, value);
    }
    //输入的内容localStorage没有记录
    else {
        //由于限制了只能有6条记录，所以这里进行判断
        if(hisItem.length > 10) {
            firstKey = hisTime[0]
            localStorage.removeItem(firstKey);
            localStorage.setItem(time, value);
        } else {
            localStorage.setItem(time, value)
        }
    }
    init();
    //正式的时候要提交的！！！
    //$("#form1").submit()

});

//清除记录功能
$(".del").click(function() {
    var f = 0;
    for(; f < hisTime.length; f++) {
        localStorage.removeItem(hisTime[f]);
    }
    init();
});
//苹果手机不兼容出现input无法取值以下是解决方法
$(function() {
    $('.his-record li a').click(function() {
        var div = $(this).text();
        $('.search input').val(div);
    })
})