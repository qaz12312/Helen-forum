<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "logIn";
	cmd["account"] = "00757007";(base64加密後) //cmd["token"]
	cmd["password"] = "00757007";(base64加密後)
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[0] // account:"00757007" // token:"c93b3e8ab496d786030fbf8a17c3da51"
		dataDB.data[1] // color:"#ffffff"
		dataDB.data[2] // nickname:"00757007"
	否則
		dataDB.errorCode = "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..." / "Could not find the user."
		dataDB.data = "" 
	*/
    function doLogIn($input){
    	global $conn;
    	$sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`=? AND `Password`=?";
		//$arr = array(base64_decode($input['account']),base64_decode($input['password']) );
		$arr = array($input['account'],$input['password'] );
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
	    if($resultCount <= 0){
			errorCode("Could not find the user.");
	    }
	    else{
			// token
			// $date = date_create('now', new DateTimeZone('Asia/Taipei'));
			// $time = date_format($date, 'Y-m-d H-i-s');
			// writeRecord($row[0],$time,"---\nlog in");
			// $str = $result[0]."010helen";
			// $token = base64_encode($str);
			// $per = showAuthority($row[0]);
			// $ip = GetIP();
			// $_SESSION[$token] = array("account"=>$row[0],"permission"=>$per,"ip"=>$ip,"log"=>$time);
			// $rtn = successCode(array("token"=>$token,"color"=>$row[1],"nickname"=>$row[2]));
			$rtn = successCode("Successfully log in.",$result[0]);
		}
		echo json_encode($rtn);
    }
?>