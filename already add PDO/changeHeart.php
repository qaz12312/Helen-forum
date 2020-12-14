<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "heart";
	cmd["account"] = "00857210";
	cmd["articleId"] = 1;

	後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.status = true
		dataDB.errorCode = ""
		dataDB.data = "Successfully added this heart. / Successfully deleted this heart."
	否則 
		dataDB.errorCode =  "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..."
		dataDB.data = ""
	*/
	function doAddDeleteHeart($input)
	{
		global $conn;
		$sql = "SELECT `UserID`,`ArticleID` FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
		$arr = array($input["account"],$input['articleId']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		//HEART
		if ($resultCount <= 0) {	//新增HEART
			$sql = "INSERT INTO `FollowHeart`(`ArticleID`,`UserID`) VALUES(?,?)";
			$arr = array($input['articleId'],$input['account']);
			query($conn,$sql,$arr,"INSERT");

			$rtn = successCode("Successfully added this heart.");
		} else {	//DELETE HEART
			$sql = "DELETE FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
			$arr = array($input['account'],$input['articleId']);
			query($conn,$sql,$arr,"DELETE");
			
			$rtn = successCode("Successfully deleted this heart.");
		}
		echo json_encode($rtn);
	}
?>