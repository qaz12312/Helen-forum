<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "logOut";
	cmd["token"]
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	status = true
    dataDB.info = "Successfully log out!"
    dataDB.data = ""
	*/
    function doLogOut($input){
		$token =$input['token'];
		$info = $_SESSION[$token];
		writeRecord(array("account"=>$info["account"],"time"=>$info["log"],"info"=>"log out"));
        unset($_SESSION[$token]);
        session_destroy();
		$rtn = successCode("Successfully log out!");
		echo json_encode($rtn);
    }
?>
