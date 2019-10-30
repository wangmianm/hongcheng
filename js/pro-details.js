//本地储存
function getCart() {
    var cartArr=[];
    if(localStorage.getItem("cart")){
        cartArr=JSON.parse(localStorage.cart);
    }
    return cartArr;
}
function setCart(arr) {
    localStorage.cart=JSON.stringify(arr);
}
function getCart1() {
    var cartArr=[];
    if(localStorage.getItem("data")){
        cartArr=JSON.parse(localStorage.data);
    }
    return cartArr;
}
function setCart1(arr) {
    localStorage.data=JSON.stringify(arr);
}

//商品列表
var list=getCart();
list.forEach(function (v) {
        $(".title p").html(v.name);
        $(".price span").html(v.price);
});
//购物车返回
var shop=getCart();
shop.forEach(function (v) {
    $(".title p").html(v.name);
    $(".price span").html(v.price);
})
var confirm=getCart();
confirm.forEach(function (v) {
    if(v.id==location.search.slice(4)){
        $(".title p").html(v.name);
        $(".price span").html(v.price);
    }
});
var arr=[];
//获取json文件中的数据
$.ajax({
    type:"get",
    url:"js/test.json",
    dataType:"json",
    cache:false,   //关闭json数据的缓存
    success:function(data){
        data.new.forEach(function (v) {
            if(v.id==location.search.slice(1)){
                $(".title p").html(v.title);
                $(".price span").html(v.price);
                arr.push({"src":v.src,"id":v.id});
                setCart(arr);
                // console.log(arr)
            }
        });
        data.bursting.forEach(function (i) {
            if(i.id==location.search.slice(1)){
                $(".title p").html(i.title);
                $(".price span").html(i.price);
                arr.push({"src":i.src,"id":i.id});
                setCart(arr);
                // console.log(arr)
            }
        })
    }
})

//失焦
$(".num").blur(function () {
    if($(this).val()==""){
      $(this).val("1")
    }
});
//跳到搜索页
$(".search input").focus(function(){
    $(".search input").val("");
    window.location.href="pro-search.html";
})
//颜色
$(".colour ul li").click(function () {
        $(this).addClass("on");
        $(this).siblings().removeClass("on");
});
//尺码
var bol=false;
$(".size ul li").click(function () {
    $(this).addClass("on");
    $(this).siblings().removeClass("on");
    bol=true;
})
//数量加减
var n=$(".num");
$(".reduce").click(function () {
    if(parseInt(n.val())==1){
        parseInt(n.val("1"))
    }else{
        n.val(Math.abs(parseInt(n.val()))-1);
    }
});
$(".plus").click(function () {
    n.val(Math.abs(parseInt(n.val()))+1);
});

var buy=document.querySelector(".buy");
var li=document.querySelectorAll(".size ul li");
var car=document.querySelector(".car");
//立即购买
buy.onclick=function () {
    if(bol){
        var arr=[];
        var name=$(".title p").html();
        var color=$(".colour ul li[class=on]").html();
        var size=$(".size ul li[class=on]").html().slice(0,4);
        var num=$(".num").val();
        var price=$(".price span").html();
        var aa=getCart();
        aa.forEach(function (i) {
           return src= i.src;
        });
        arr.push({"title":"床上用品系列","name":name,"src":src,"price":price,"color":color,"size":size,"num":num,"check":true});
        setCart(arr);
        location.href="confirm-order.html";
    }else{
        Toast("请选择商品属性",1000);
    }
}
//加入购物车

car.onclick=function () {
    if(bol){
        var add=getCart1();
        // console.log(add)
        var name=$(".title p").html();
        var price=$(".price span").html();
        var color=$(".colour ul li[class=on]").html();
        var size=$(".size ul li[class=on]").html();
        var num=$(".num").val();
            var src=getCart()[0].src;
        var id=getCart()[0].id;
            var obj={"title":"床上用品系列","name":name,"src":src,"id":id,"price":price,"color":color,"size":size,"num":num,"check":false};
            add.push(obj);
        setCart1(add);

        Toast('加入购物车成功',1000);
    }else{
        Toast("请选择商品属性",1000)
    }
};


function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 2.2rem;min-width: 100px;opacity: 0;height: 0.5rem;color: rgb(255, 255, 255);line-height: 0.5rem;text-align: center;border-radius: 5px;position: fixed;bottom: 15%;left: 50%;z-index: 999;background: rgb(0, 0, 0);font-size: 0.24rem;margin-left:-1.1rem;";
    document.body.appendChild(m);
    setTimeout(function(){
        m.style.webkitTransition = '-webkit-transform ' + 0.3 + 's ease-in, opacity ' + 0.3 + 's ease-in';
        m.style.opacity = '1';
    },1)
    setTimeout(function() {
        var d = 1;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}



