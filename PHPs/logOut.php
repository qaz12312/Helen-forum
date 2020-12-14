<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "logOut";
	cmd["account"] = "00757007";
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	status = true
    dataDB.errorCode = ""
    dataDB.data = "already log out!"
	*/
    function doLogOut($input){
        global $conn;
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "already log out!";
		echo json_encode($rtn);
    }
?>
