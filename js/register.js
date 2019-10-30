var form=document.querySelector(".content form");
var user=form.user;
var pass=form.password;
var passWord=form.passwords;
var code=form.code;
var gain=document.querySelector(".gain");
var unensure=document.querySelector(".unensure");
var imgs=document.querySelector(".unensure img");
var register=document.querySelector(".register");
var unp=document.querySelector(".protocol p");
var reg_user=/^[a-zA-Z_]\w{7,15}$/;
var phone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
var reg_pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
var reg_code=/^\d{4}$/;

//用户名
function vuser(){
    if(reg_user.test(user.value)||phone.test(user.value)&&user.value!=""){
        return true;
    }else{
        return false;
    }
}
user.onblur=function () {
   vuser();
};
//密码
function valpass(){
    if(reg_pass.test(pass.value)&&pass.value!=""){
        return true;
    }else{
        return false;
    }
}
pass.onblur=function(){
    console.log(2)
    valpass();

};
//确认密码
function vpassWord(){
    if(pass.value==passWord.value){
        return true;
    }else{
        return false;
    }
}
passWord.onblur=function () {
   vpassWord();
};
//验证码
function vcode(){
    if(reg_code.test(code.value)&&code.value!=""){
        return true;
    }else{
        return false;
    }
}
code.onblur=function () {
   vcode();
};
//获取验证码
gain.onclick=function(){
    var time=60;
    gain.innerText=time+'秒后重发';
    this.style.pointerEvents='none';
    var timer = setInterval(function() {
        if (time > 1) {
            time--;
            gain.innerText = time + '秒后重发';
        }
        else if (time == 1) {
            gain.innerText = '获取';
            gain.style.pointerEvents = 'auto';
            clearInterval(timer);
        }
    },1000)
};
//确认阅读
unensure.onclick=function () {
    if(this.className=="unensure"){
        this.className="";
        this.className="ensure";
        imgs.src="img/check02.png";
        // return true;
    }else{
        this.className="";
        this.className="unensure";
        imgs.src="img/case.png";
        // return false;
    }
};
unp.onclick=function(){
    if(unensure.className=="unensure"){
        unensure.className="";
        unensure.className="ensure";
        imgs.src="img/check02.png";
        // return true;
    }else{
        unensure.className="";
        unensure.className="unensure";
        imgs.src="img/case.png";
        // return false;
    }
};
//验证码输入
code.onkeyup = function () {
    if(this.value.length>=4){
        this.value=this.value.substr(0,4)
    }
};

register.onclick=function () {
   if(!vuser()){
        Toast("会员名由8-16位中英文组成/手机号",1000);
    }else if(vuser()&&!valpass()){
        Toast("密码由8-20位中英文组成",1000);
        return
    }else if(passWord.value==""){
        Toast("请填写确认密码",1000);
        return;
    }else if(vuser()&&valpass()&&!vpassWord()){
        Toast("密码不一致",1000);
        return;
    }else if(vuser()&&valpass()&&vpassWord()&&!vcode()){
        Toast("验证码为四位数字",1000);
        return;
    }else if(vuser()&&valpass()&&vpassWord()&&vcode()&&unensure.className=="unensure"){
        Toast("请勾选用户协议",1000);
        return;
   }
    else if(vuser()&&valpass()&&vpassWord()&&vcode()){
		reg();
		location.href = "login.html";
        return false;
   }
	function reg(){
		$.ajax({
				type:"post",
				url:"admin/register.php",
				async:true,
				data:{
					//数据获取
					"user":user.value,
					"pass":pass.value
				},
				success:function(data){
					console.log(data);
					//将后端返回的字符串数据转成json
					var json = JSON.parse(data);
					//通过判断json数据的不同，进行不同的操作
					if(json.type === "error"){
						switch(json.code){
							case "1":
								Toast("该用户/手机号已经被注册",1000);
								break;
						}
					}else{
						Toast("注册成功",2000)
						alert("注册成功")
					}
				},
	//			error:function(){
	//				alert("网络错误");				
	//			}
			});
	
	}


};










function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 4.2rem;min-width: 100px;opacity: 0;height: 0.5rem;color: rgb(255, 255, 255);line-height: 0.5rem;text-align: center;border-radius: 5px;position: fixed;bottom: 15%;left: 50%;z-index: 999;background: rgb(0, 0, 0);font-size: 0.24rem;margin-left:-2.1rem;";
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