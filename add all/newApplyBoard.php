<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newApplyBoard";
	cmd["account"] = "00757033"; //cmd["token"]
	cmd["content"] ="我想要成為美食版版主";

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data = "Successfully Apply the Board.";
	否則
		dataDB.errorCode = "Failed to Apply the Board,Database exception.";
		dataDB.data = "";
	*/
    function doNewApplyBoard($input){
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
		$sql="SELECT `Content` FROM `Issue` WHERE `UserID` = ? AND `Content` = ?";
		$arr = array($input['account'], $input['content']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		if($resultCount > 0){
			errorCode("You have already sent this message.");
		}
		else{
			$sql="INSERT INTO `Issue`(`UserID`,`Content`) VALUES(?,?)";
        	$arr = array($input['account'], $input['content']);
			$result=query($conn,$sql,$arr,"INSERT");

			$sql="SELECT `Content` FROM `Issue` WHERE `UserID` = ? AND `Content` = ?";
			$arr = array($input['account'], $input['content']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Failed to Apply the Board,Database exception.");
			}
			else{
				$rtn = successCode("Successfully Apply the Board.");
			}
		}	
        echo json_encode($rtn);
    }
?>
