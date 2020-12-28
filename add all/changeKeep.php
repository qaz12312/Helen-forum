<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "keep";
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["articleID"] = 2;
	cmd["dirName"] = "旅遊景點";(如果是收藏文章才要)

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully kept this article." / "Successfully deleted this article." /"Keep without folder."
		dataDB.data = ""
	否則
		dataDB.errorCode = "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..."
		dataDB.data = "" 
	*/
	function doAddDeleteKeep($input)
	{
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
			$sql = "SELECT `UserID`,`ArticleID` FROM `FollowKeep` WHERE `UserID`=? AND `ArticleID`=?";
			// $arr = array($userInfo['account'],$input['articleID']);
			$arr = array($input['account'],$input['articleID']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if ($resultCount <= 0) {	//收藏文章
				$sql ="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`=? AND`DirName`=?";
				//$arr = array($userInfo['account'], $input['dirName']);
				$arr = array($input['account'], $input['dirName']);
				$result = query($conn,$sql,$arr,"SELECT");
				$resultCount = count($result);
				if($resultCount <= 0){
					errorCode("Keep without folder.");
				}
				else{
					$sql = "INSERT INTO `FollowKeep`(`ArticleID`,`UserID`,`DirName`) VALUES(?,?,?)";
					//$arr = array($input['articleID'], $userInfo['account'],$input['dirName'] );
					$arr = array($input['articleID'],  $input['account'],$input['dirName'] );
					query($conn,$sql,$arr,"INSERT");
				// writeRecord($userInfo["account"],$userInfo["log"],"add articleID:".$input['articleID']."in dirName=".$input['dirName']);
					$rtn = successCode("Successfully kept this keep the article.");
				}
			} 
			else {	//收回收藏
				$sql = "DELETE FROM `FollowKeep` WHERE `UserID`=? AND `ArticleID`=?";
				//$arr = array($userInfo["account"], $input['articleID']);
				$arr = array($input['account'], $input['articleID']);
				query($conn,$sql,$arr,"DELETE");
				// writeRecord($userInfo["account"],$userInfo["log"],"remove articleID:".$input['articleID']."from dirName=".$input['dirName']);
				$rtn = successCode("Successfully deleted this article.");
			}
			echo json_encode($rtn);
		// }	
	}
?>