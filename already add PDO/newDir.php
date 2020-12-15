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
        $sql="INSERT INTO `KeepDir`(`UserID`,`DirName`) VALUES(?,?)";
        $arr = array($input['account'], $input['dirName']);
		query($conn,$sql,$arr,"INSERT");
		
		$rtn = successCode("Successfully new the dir.");
        echo json_encode($rtn);
    }
?>
