<?php
	/*前端 to 後端:
	let cmd = {};
	cmd["act"] = "heart";
	cmd["account"] = "00857210";
	cmd["articleId"] = 1;

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data="success to add heart / success to delete heart"
	否則
		dataDB.errorCode = ??????
		dataDB.data = ""
	*/
function doAddDeleteHeart($input)
{
	global $conn;
	$sql = "SELECT `UserID`,`ArticleID` FROM `FollowHeart` WHERE `UserID`='" . $input['account'] . "' AND `ArticleID`='" . $input['articleId'] . "'";
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}
	//HEART
	if ($result->num_rows <= 0) {	//新增HEART
		$heartsql = "INSERT INTO `FollowHeart` VALUES(" . $input['articleId'] . ", '" . $input['account'] . "')";
		$heartresult = $conn->query($heartsql);
		if (!$heartresult) {
			die($conn->error);
		}
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "success to add heart";
	} else {	//DELETE HEART
		$row = $result->fetch_row();
		$heartsql = "DELETE FROM `FollowHeart` WHERE `UserID`='" . $input['account'] . "' AND `ArticleID`='" . $input['articleId'] . "'";
		$heartresult = $conn->query($heartsql);
		if (!$heartresult) {
			die($conn->error);
		}
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "success to delete heart";
	}
	echo json_encode($rtn);
}
