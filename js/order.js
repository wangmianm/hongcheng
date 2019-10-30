var li=document.querySelectorAll(".nav ul li");
for (var i=0;i<li.length;i++){
    li[i].onclick=function () {
        for(var j=0;j<li.length;j++) {
            li[j].className = "";
        }
        this.className="on";
    }
}


angular.module("app",[])
.controller("first",function ($scope) {
    $scope.arr=[
        {"order":"订单号：1234567890","title":"床上用品系列","name":"棉加厚1.8m秋冬纯棉被套保暖床单","src":"img/order01.jpg","colour":"颜色：白色","size":"尺寸：2.0m (6.6英尺） 床","num":481,"number":1,"sum":4211},
        {"order":"订单号：1234567890","title":"床上用品系列","name":"儿童动物世界秋冬纯棉被套保暖床单","src":"img/order02.jpg","colour":"颜色：绿色","size":"尺寸：2.0m (6.6英尺） 床","num":211,"number":1,"sum":4211},
        {"order":"订单号：1234567890","title":"床上用品系列","name":"时尚简约纯棉被套","src":"img/order03.jpg","colour":"颜色：白色","size":"尺寸：2.0m (6.6英尺） 床","num":846,"number":1,"sum":4211}
    ]
    //显示
    $scope.edit=function () {
        var del=document.querySelectorAll(".del");
        for (var i=0;i<$scope.arr.length;i++){
          if(del[i].style.display=="block"){
              del[i].style.display="none";
          }else {
              del[i].style.display="block";
          }
        }
    }
    $scope.del=function (index) {
        $scope.arr.splice(index,1);
    }
})