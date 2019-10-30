<?php
  	header("Content-type:text/html;charset=utf-8");
	//print_r($_POST);
	//打开JSON文件
	$file = file_get_contents("user.json");
	
	//将文件的数据转换出来
	$obj = json_decode($file);
	
	//判断该用户是否存在
	foreach($obj->userinfo as $el){
		if($el->user === $_POST["user"]){
			echo '{"type":"error","code":"1"}';//代表用户名重复
			exit;
		}
	}
	//根据自己的需求添加新的数据
	$user = ["user"=>$_POST["user"],"pass"=>$_POST["pass"]];
	//将新的数据添加到整体内容之中
	$obj ->userinfo[] = $user;
	
	//将数据保存回文件中
	file_put_contents("user.json", json_encode($obj));
	
	echo '{"type":"success","code":"1"}';
?>