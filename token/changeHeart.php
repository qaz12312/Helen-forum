<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "heart";
	cmd["token"]
	cmd["articleID"] = 1;

	後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.status = true
		dataDB.info = "Successfully added this heart. / Successfully deleted this heart."
		dataDB.data = ""
	否則 
		dataDB.errorCode = "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..." / "token doesn't exist."
		dataDB.data = ""
	*/
	function doAddDeleteHeart($input)
	{
		global $conn;
		$token =$input['token'];
        if(!isset($_SESSION[$token])){
			errorCode("token doesn't exist.");
        }else{
		    $userInfo = $_SESSION[$token];
			$sql = "SELECT `UserID`,`ArticleID` FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
			$arr = array($userInfo["account"],$input['articleID']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			//HEART
			if ($resultCount <= 0) {	//新增HEART
				$sql = "INSERT INTO `FollowHeart`(`ArticleID`,`UserID`) VALUES(?,?)";
				$arr = array($input['articleID'],$userInfo['account']);
				query($conn,$sql,$arr,"INSERT");
				writeRecord(array("account"=>$userInfo["account"],"time"=>$userInfo["log"],"info"=>"add heart for articleID:".$input['articleID']));
				$rtn = successCode("Successfully added this heart.");
			} else {	//DELETE HEART
				$sql = "DELETE FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
				$arr = array($input['account'],$input['articleID']);
				query($conn,$sql,$arr,"DELETE");
				writeRecord(array("account"=>$userInfo["account"],"time"=>$userInfo["log"],"info"=>"cancel heart for articleID:".$input['articleID']));
				$rtn = successCode("Successfully deleted this heart.");
			}
		}
		echo json_encode($rtn);
	}
?>
