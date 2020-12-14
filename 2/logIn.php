<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "logIn";
	cmd["account"] = "00757007";
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
    	$sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
	    $result = $conn->query($sql);
	    if(!$result){
	        die($conn->error);
	    }
	    if($resultCount <= 0){
			errorCode("Could not find the user.");
	    }
	    else{
			$row=$result->fetch_row();
	        $rtn = array();
	        $rtn["status"] = true;
	        $rtn["errorCode"] = "";
			$rtn["data"] =$row;
	    }
		echo json_encode($rtn);
    }
?>