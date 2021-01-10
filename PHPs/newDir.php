<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newDir";
	cmd["account"] = "UserID"; //cmd["token"]
	cmd["dirName"] ="搞笑";

	後端 to 前端
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully new the dir.";
		dataDB.data = "";
	否則
		dataDB.errorCode = "Failed to upload dir,Database exception.";
		dataDB.data = "";
	*/
    function doNewDir($input){
		global $conn;
		// $token =$input['token'];
		// if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
		// }
		// $userInfo = $_SESSION[$token];
		// $user = $userInfo['account'];

		$user = $input['account'];
		$sql="SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `UserID` = ? AND `DirName` = ? LIMIT 1)";//收藏資料夾是否存在
		$arr = array($user, $input['dirName']);
		$result = query($conn,$sql,$arr,"SELECT");
        if($result[0][0]){
            errorCode("Folder exist.");
		}
		else{
        	$sql="INSERT INTO `KeepDir`(`UserID`,`DirName`) VALUES(?,?)";
        	$arr = array($user, $input['dirName']);
			query($conn,$sql,$arr,"INSERT");
			$sql="SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `UserID` = ? AND `DirName` = ? LIMIT 1)";//是否成功新增收藏資料夾
			$arr = array($user, $input['dirName']);
			$result = query($conn,$sql,$arr,"SELECT");
			if(!$result[0][0]){
				errorCode("Failed to upload folder ,Database exception.");
			}
			else{
				$rtn = successCode("Successfully new the dir.");
			}
		}
        echo json_encode($rtn);
    }
?>
