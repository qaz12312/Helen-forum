<?php
/* 前端 to 後端:
let cmd = {};
cmd["act"] = "keep";
cmd["account"] = "0123456";
cmd["articleId"] = 540654;
cmd["dirId"] = 4564;

後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data="success"
否則
dataDB.data = "" */
function doAddDeleteKeep($input)
{
	global $conn;
	$sql = "SELECT `UserID`,`ArticleID` FROM `FollowKeep` WHERE `UserID`='" . $input['account'] . "' AND `ArticleID`='" . $input['articleId'] . "'";
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}
	//KEEP
	if ($result->num_rows <= 0) {	//收藏文章
		$keepsql = "INSERT INTO `FollowKeep`(`ArticleID`,`UserID`,`DirName`) VALUES(" . $input['articleId'] . ", '" . $input['account'] . "', '" . $input['dirId'] . "')";
		$keepresult = $conn->query($keepsql);
		if (!$keepresult) {
			die($conn->error);
		}
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "success to keep the article";
	} else {	//收回收藏
		$row = $result->fetch_row();
		$keepsql = "DELETE FROM `FollowKeep` WHERE `UserID`='" . $input['account'] . "' AND `ArticleID`='" . $input['articleId'] . "'";
		$keepresult = $conn->query($keepsql);
		if (!$keepresult) {
			die($conn->error);
		}
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "success to delete the article";
	}
	echo json_encode($rtn);
}
