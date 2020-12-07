<!-- 前端 to 後端:
let cmd = {};
cmd["act"] = "changePassword";
cmd["account"] = "0123456";
cmd["password"] = "789789789";
<!--
後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data="success to change the password"
否則
dataDB.data = "fail to change the password" -->

<!--User[UserID,Password,Permissions,Color,Nickname]-->

<?php
	require_once 'connectDB.php'; //連線資料庫

	global $input,$conn;
	$sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$input['account']."'";
	$result=$conn->query($sql);
	if(!$result){
		die($conn->error);
	}
	if($result->num_rows <= 0){	//找不到用戶
		$rtn = array();
		$rtn["status"] = false;
		$rtn["errorCode"] = "fail to change the password";
		$rtn["data"] = "";
	}
		else{	//更改用戶密碼
			$keepsql="Update `User` SET `Password` = '".$input['password']."' WHERE `UserID` ='".$input['account']."'";
			$keepresult = $conn->query($keepsql);
			if(!$keepresult){
			die($conn->error);
			}
			$rtn = array();
			$rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"] = "success to change the password";
		}
	echo json_encode($rtn);
?>