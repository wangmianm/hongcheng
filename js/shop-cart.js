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
// 点击编辑
var edit=document.querySelector(".edit");
var fun=document.querySelector(".fun");
var body=document.getElementsByTagName("body")[0];
edit.onclick=function () {
    if(this.innerHTML=="编辑"){
        this.innerHTML="完成";
        fun.style.display="block";
        body.style.paddingTop="1.48rem";
        $(".set a").attr("disabled",true);
        $(".set a").css({"pointer-events":"none","background":"#cccccc"});
    }else{
        this.innerHTML="编辑";
        fun.style.display="none";
        body.style.paddingTop=".88rem";
        $(".set a").attr("disabled",false);
        $(".set a").css({"pointer-events":"auto","background":"#eb5310"});
    }
};
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
 // console.log(getCart1())
angular.module("app",[])
    .controller("cart",function ($scope) {
        $scope.bol=true;
        $scope.info=[];
        if(getCart1()!=null){
            for(var i=0;i<getCart1().length;i++){
                $scope.info.push(getCart1()[i]);

            }
        }else{
            $scope.info=[];
        }

        //加入收藏夹
        $scope.favour = function () {
            Toast('加入收藏夹成功',1000);
        }

        //减
         $scope.reduce=function (index) {
             if($scope.info[index].num>1){
                 $scope.info[index].num--;
             }
         };
         //加
        $scope.plus=function (index) {
            $scope.info[index].num++;
        };
        $scope.checknum = function (index) {
            if($scope.info[index].num<1||$scope.info[index].num==''){
                $scope.info[index].num=1;
            }
        }
        //复选框
        //改变图片的路径
        $scope.check=function(index){
            if($scope.info[index].check==true){
              return  $scope.src="img/tick.png"

            }else{
               return $scope.src="img/round.png"
            }
        };
        $scope.dan = function (index) {
            $scope.info[index].check=!$scope.info[index].check;
        }
        //全选框
        $scope.all=function () {
            if($scope.bol){
                for(var i=0;i<$scope.info.length;i++){
                    $scope.info[i].check=false;
                }
                $scope.bol=false;
            }
            else {
                for(var i=0;i<$scope.info.length;i++){
                    $scope.info[i].check=true;
                }
                $scope.bol=true;
            }
        };
        //改变图片的路径
        $scope.alls = function () {
            var bool=true;
            for (var i = 0; i < $scope.info.length; i++) {
                if($scope.info[i].check==false)
                {
                    bool=false;
                    break;
                }
            }
            if(bool){
                return  $scope.src="img/tick.png"
            }
            else {
                return $scope.src="img/round.png"
            }
        }
        //总计
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.info.length; i++) {
                if($scope.info[i].check==true)
                {
                    total+=Number($scope.info[i].price*$scope.info[i].num);
                }
            }
            return total;
        }
        //总数量
        $scope.sum=function () {
            var sums=0;
            for (var i=0;i<$scope.info.length;i++){
                if($scope.info[i].check==true){
                    sums++;
                    var number="("+sums+")"
                }else{
                    var number="("+sums+")"
                }
            }
            return number;
        };

        //结算
        $scope.confirm = function () {
            var f=0;
            for (var i = 0; i < $scope.info.length; i++) {
                if($scope.info[i].check==false){
                 f++;
                }
            }
            if(f==$scope.info.length){
                Toast("还没有选择宝贝哦",1000);
            }else {

                setCart($scope.info);

                window.location.href='confirm-order.html';
            }
        };

        // 删除
        $scope.del = function () {
            var con=$(document).dialog({
                type : 'confirm',
                style: 'ios',
                titleText: '删除商品',
                content: '确认删除商品？',
                overlayClose: true,
                closeBtnShow: true,
                onClickConfirmBtn: function(){
                    $scope.$apply(function(){
                        var flag=0;
                        for (var i=$scope.info.length-1;i>=0;i--) {
                            if($scope.info[i].check==true)
                            {
                                $scope.info.splice(i, 1);
                            }
                            else {
                                flag++;
                            }
                        }
                        localStorage.data=JSON.stringify($scope.info);
                    })
                },
                onClickCancelBtn : function(){
                    //...dosomething
                },
                onClickCloseBtn  : function(){
                    //...dosomething
                }
            });
        }
            //跳转
        $scope.details=function(index){
            var arr=[];
            arr.push({"id":$scope.info[index].id,"name":$scope.info[index].name,"price":$scope.info[index].price,"src":$scope.info[index].src,"check":false})
            setCart(arr);
            location.href="pro-details.html";
        };

    });

function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 2.2rem;min-width: 100px;opacity: 0;height: 0.5rem;color: rgb(255, 255, 255);line-height: 0.5rem;text-align: center;border-radius: 5px;position: fixed;bottom: 15%;left: 50%;z-index: 999;background: rgb(0, 0, 0);font-size: 0.24rem;margin-left:-1.1rem;";
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
