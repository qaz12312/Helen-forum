<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "heart";
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["articleID"] = 1;

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully added this heart. / Successfully deleted this heart."
		dataDB.data = ""
	否則 
		dataDB.errorCode =  "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..."
		dataDB.data = ""
	*/
	function doAddDeleteHeart($input)
	{
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
			$sql = "SELECT `UserID`,`ArticleID` FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
			// $arr = array($userInfo['account'],$input['articleID']);
			$arr = array($input['account'],$input['articleID']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if ($resultCount <= 0) {//新增HEART
				$sql = "INSERT INTO `FollowHeart`(`ArticleID`,`UserID`) VALUES(?,?)";
				// $arr = array($input['articleID'],$userInfo['account']);
				$arr = array($input['articleID'],$input['account']);
				query($conn,$sql,$arr,"INSERT");
				// writeRecord($userInfo["account"],$userInfo["log"],"add heart for articleID:".$input['articleID']);
				$rtn = successCode("Successfully added this heart.");
			} else {//DELETE HEART
				$sql = "DELETE FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
				// $arr = array($userInfo['account'],$input['articleID']);
				$arr = array($input['account'],$input['articleID']);
				query($conn,$sql,$arr,"DELETE");
				//writeRecord($userInfo["account"],$userInfo["log"],"cancel heart for articleID:".$input['articleID']);
				$rtn = successCode("Successfully deleted this heart.");
			}
			echo json_encode($rtn);
		// }
	}
?>
