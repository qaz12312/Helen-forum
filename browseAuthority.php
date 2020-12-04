<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "browseAuthority";
	cmd["account"] = "00857210@mail.ntou.edu.tw";
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[0] // UserID:"00857210@mail.ntou.edu.tw"
		dataDB.data[1] // Permissions:1
		dataDB.data[2] // Color:"#ffffff"
		dataDB.data[3] // Nickname:"cook"
	否則
		dataDB.errorCode = "This account(00857210@mail.ntou.edu.tw) does not exist" /  "Incorrect account or password"
		dataDB.data = "" 
	*/
    function browseAuthority($input){
    	global $conn;
    	$sql="SELECT `UserID`,`Permissions`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
	    $result = $conn->query($sql);
	    if(!$result){
	        die($conn->error);
	    }
	    if($result->num_rows <= 0){
			$sql="SELECT `UserID`,`Permissions`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."'";
			$resultFindAccount = $conn->query($sql);
			if(!$resultFindAccount){
				die($conn->error);
			}
			if($resultFindAccount->num_rows <= 0){
				$rtn = array();
				$rtn["status"] = false;
				$rtn["errorCode"] = "The account(".$input['account'].") does not exist";
				$rtn["data"] = "";
			}else{
				$rtn = array();
				$rtn["status"] = false;
				$rtn["errorCode"] = "Incorrect account or password";
				$rtn["data"] = "";
			}
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