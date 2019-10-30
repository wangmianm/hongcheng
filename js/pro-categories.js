//跳到搜索页
$(".search input").focus(function(){
    window.location.href="pro-search.html";
    $(".search input").val("")
})

var li=document.querySelectorAll(".sidebar li");
var main=document.querySelectorAll(".main");
for(var i=0;i<li.length;i++){
    li[i].index=i;
    li[i].onclick=function () {
        for(var j=0;j<li.length;j++){
            li[j].className="";
            main[j].className="main";
        }
        this.className="on";
        main[this.index].className="main on"
    }
}