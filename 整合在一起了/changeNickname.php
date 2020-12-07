<!-- 前端 to 後端:
let cmd = {};
cmd["act"] = "changeNickname";
cmd["account"] = "0123456";
cmd["nickname"] = "poo poo";
<!--
後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data="success to change the Nickname"
否則
dataDB.data = "no user had found" -->

<!--User[UserID,Password,Permission,Color,Nickname]-->

<?php
	require_once 'connectDB.php'; //連線資料庫

	global $input,$conn;
	$sql="SELECT `UserID` FROM `User` WHERE `UserID`='".$input['account']."'";
	$result=$conn->query($sql);
	if(!$result){
		die($conn->error);
	}
	if($result->num_rows <= 0){	//找不到用戶
		$rtn = array();
		$rtn["status"] = false;
		$rtn["errorCode"] = "no user had found";
		$rtn["data"] = "";
	}
		else{	//更改用戶暱稱
			$keepsql="Update `User` SET `Nickname` = '".$input['nickname']."' WHERE `UserID` ='".$input['account']."'";
			$keepresult = $conn->query($keepsql);
			if(!$keepresult){
			die($conn->error);
			}
			$rtn = array();
			$rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"] = "success to change the Nickname";
		}
	echo json_encode($rtn);
?>