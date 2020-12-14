<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newDir";
	cmd["account"] = "UserID";
	cmd["dirName"] ="搞笑";

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data = "Successfully new the dir.";
	否則
		dataDB.errorCode = "Failed to upload dir,Database exception.";
		dataDB.data = "";
	*/
    function doNewDir($input){
        global $conn;
        $new="INSERT INTO  `KeepDir`(`UserID`,`DirName`) VALUES('".$input['account']."','".$input['dirName']."')";
        $resultNew=$conn->query($new);
        if(!$resultNew){
			$rtn = array();
		    $rtn["status"] = false;
		    $rtn["errorCode"] ="Failed to upload dir,Database exception.";
			$rtn["data"] = "";
			echo json_encode($rtn);
            die($conn->error);
		}
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "Successfully new the dir.";
        echo json_encode($rtn);
    }
?>
