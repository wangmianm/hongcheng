var sub=document.querySelector(".total a");
var show=document.querySelector(".show");
var pay=document.querySelector(".pay");
var hide=document.querySelector(".hide");
var confirm=document.querySelector(".confirm");
var alert=document.querySelector(".alert");
sub.onclick=function () {
    show.style.display="block";
    pay.style.display="block";
}
hide.onclick=function () {
    show.style.display = "none";
    pay.style.display = "none";
}
confirm.onclick=function () {
        alert.style.display="block";
        alert.style.zIndex=11;
}
// 本地储存
function getCart() {
    var cartArr=[];
    if(localStorage.getItem("cart")){
        cartArr=JSON.parse(localStorage.cart);
    }
    return cartArr;
}

angular.module("app",[])
.controller("order",function ($scope) {
    if(getCart()!=null){
        $scope.info=getCart();
    }else{
        $scope.info=[];
    }
    $scope.check = function (index) {
        if($scope.info[index].check!=true){
            return false;
        }
        else {
            return true;
        }
    };
    var number=0;
    $scope.sums=0;
    for (var j=0;j<$scope.info.length;j++){
        if($scope.info[j].check==true){
            number=number+parseInt($scope.info[j].num);
            $scope.sums+=$scope.info[j].num*$scope.info[j].price
        }
    }
    $scope.nums="X"+number;
    $scope.sum="Y"+$scope.sums;

// console.log($scope.info)

    // //跳转
    $scope.details=function(index){
        location.href="pro-details.html?id="+index;
    };
})
