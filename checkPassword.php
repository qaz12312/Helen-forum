<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "checkPassword";
	cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
	cmd["password"] = "00757007";
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[0] // account:"00757007"
		dataDB.data[1] // color:"#ffffff"
		dataDB.data[2] // nickname:"00757007"
	否則
		dataDB.errorCode = "Could not find the user."
		dataDB.data = "" 
	*/
    function doLogIn($input){
        global $conn;
        
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //    $rtn = array();
        //     $rtn["status"] = false;
        //     $rtn["errorCode"] = "You don't have permission to do this action.";
        //     $rtn["data"] = "";
        // }else{
        //     $userInfo = $_SESSION[$token];
    	$sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`=? AND `Password`=?";
	    $arr = array($input['account'],$input['password'] );//$userInfo['account']
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
	    if($resultCount <= 0){
			errorCode("password error.");
	    }
	    else{
			$rtn = successCode($result);
	    }
		echo json_encode($rtn);
    }
?>