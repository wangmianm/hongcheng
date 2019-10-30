//跳到搜索页
$(".search input").focus(function(){
    $(".search input").val("");
    window.location.href="pro-search.html";
});

//选项卡切换
$(".nav ul li").click(function () {
    $(this).addClass("on");
    $(this).siblings().removeClass("on")
})

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
angular.module("app",[])
    .controller("list",function ($scope) {
        $scope.info=[
            {"list_id":16,"title":"床上用品系列","name":"松木实木折叠床","price":3555,"src":"img/list01.jpg"},
            {"list_id":17,"title":"床上用品系列","name":"时尚简约四件套","price":355,"src":"img/list02.jpg"},
            {"list_id":18,"title":"床上用品系列","name":"活泼可爱儿童三件套","price":3255,"src":"img/list03.jpg"},
            {"list_id":19,"title":"床上用品系列","name":"动物世界儿童四件套","price":3555,"src":"img/list04.jpg"}
        ];
        // 跳转
        $scope.details=function(index){
            var skip=[];
            skip.push({"id":$scope.info[index].list_id,"name":$scope.info[index].name,"price":$scope.info[index].price,"src":$scope.info[index].src,"check":false})
            setCart(skip);
            console.log(skip);
            location.href="pro-details.html";
        };
        //立即购买
        $scope.buyCart=function(index){
            var arr=[];
            arr.push({"name":$scope.info[index].name,"title":$scope.info[index].title,"price":$scope.info[index].price,"src":$scope.info[index].src,"color":"白色","size":"2.0m","num":1,"check":true});
            setCart(arr);
            location.href="confirm-order.html";
        };
        //加入购物车
        $scope.addCart = function (index) {
            var add = getCart1();
            add.push({"id":$scope.info[index].list_id,"name":$scope.info[index].name,"title":$scope.info[index].title,"price":$scope.info[index].price,"src":$scope.info[index].src,"color":"白色","size":"2.0m (6.6英尺） 床","num":1,"check":false});
            setCart1(add);
            Toast("加入购物车成功",1000);
            console.log(add)
        }
    });
function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 2.2rem;min-width: 100px;opacity: 0;height: 0.5rem;color: rgb(255, 255, 255);line-height: 0.5rem;text-align: center;border-radius: 5px;position: fixed;top: 18%;left: 50%;z-index: 999;background: rgb(0, 0, 0);font-size: 0.24rem;margin-left:-1.1rem;";
    document.body.appendChild(m);
    setTimeout(function(){
        m.style.webkitTransition = '-webkit-transform ' + 0.3 + 's ease-in, opacity ' + 0.3 + 's ease-in';
        m.style.opacity = '0.8';
    },1)
    setTimeout(function() {
        var d = 1;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0.8';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}