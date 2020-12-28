<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newDir";
	cmd["account"] = "UserID"; //cmd["token"]
	cmd["dirName"] ="搞笑";

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data = "Successfully new the dir.";
	否則
		dataDB.errorCode = "Failed to upload dir,Database exception.";
		dataDB.data = "";
	*/
    function doNewDir($input){
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
		$sql="SELECT `DirName` FROM `KeepDir` WHERE `UserID` = ? AND `DirName` = ?";
		$arr = array($input['account'], $input['dirName']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);

        if($resultCount > 0){
            errorCode("Folder exist.");
		}
		else{
        	$sql="INSERT INTO `KeepDir`(`UserID`,`DirName`) VALUES(?,?)";
        	$arr = array($input['account'], $input['dirName']);
			query($conn,$sql,$arr,"INSERT");

			$sql="SELECT `DirName` FROM `KeepDir` WHERE `UserID` = ? AND `DirName` = ?";
			$arr = array($input['account'], $input['dirName']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Failed to upload folder ,Database exception.");
			}
			else{
				$rtn = successCode("Successfully new the dir.");
			}
		}
        echo json_encode($rtn);
    }
?>
