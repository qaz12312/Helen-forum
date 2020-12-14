<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "logOut";
	cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	status = true
    dataDB.errorCode = ""
    dataDB.data = "already log out!"
	*/
    function doLogOut($inputJS){
        global $conn;
        $token =$inputJS['token'];
        unset($_SESSION[$token]);
        session_destroy();
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "already log out!";
		echo json_encode($rtn);
    }
?>