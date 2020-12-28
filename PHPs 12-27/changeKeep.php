<?php
	/* 前端 to 後端:
		let cmd = {};
		cmd["act"] = "keep";
		cmd["account"] = "00857210";
		cmd["articleID"] = "2";
		cmd["dirName"] = "旅遊景點";
	  後端 to 前端
		dataDB.status
		若 status = true:
			dataDB.status = true
			dataDB.info = "Successfully kept this article." / "Successfully deleted this article." /"Keep without folder."
			dataDB.data = ""
		否則
			dataDB.errorCode = "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..."
			dataDB.data = "" 
		*/

	function doAddDeleteKeep($input)
	{
		global $conn;
		$sql = "SELECT `UserID`,`ArticleID` FROM `FollowKeep` WHERE `UserID`=? AND `ArticleID`=?";
		$arr = array($input['account'],$input['articleID']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		//KEEP
		if ($resultCount <= 0) {	//收藏文章
			$sql ="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`=? AND`DirName`=?";
			$arr = array($input['account'], $input['dirName']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Keep without folder.");
			}
			else{
				$sql = "INSERT INTO `FollowKeep`(`ArticleID`,`UserID`,`DirName`) VALUES(?,?,?)";
				$arr = array($input['articleID'],  $input['account'],$input['dirName'] );
				query($conn,$sql,$arr,"INSERT");
				$rtn = successCode("Successfully kept this keep the article.");
			}
		} 
		else {	//收回收藏
			$sql = "DELETE FROM `FollowKeep` WHERE `UserID`=? AND `ArticleID`=?";
			$arr = array($input['account'], $input['articleID']);
			query($conn,$sql,$arr,"DELETE");
			$rtn = successCode("Successfully deleted this article.");
		}
		echo json_encode($rtn);
	}
?>