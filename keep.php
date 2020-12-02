<?php
require_once 'connectDB.php'; //連線資料庫

global $input,$conn;
$sql="SELECT `UserID`,`ArticleID` FROM `Follow` WHERE `UserID`='".$input['account']."' AND `ArticleID`='".$input['articleId']."'";
$result=$conn->query($sql);
if(!$result){
	die($conn->error);
}
//KEEP
if($result->num_rows <= 0){	//收藏文章
	$keepsql="INSERT INTO `FollowKeep` VALUES(".$input['articleId'].", '".$input['account']."', '".$input['dirId']."', '".$input['time']."')";
	$keepresult = $conn->query($keepsql);
	if(!$keepresult){
		die($conn->error);
	}
	$rtn = array();
	$rtn["status"] = true;
	$rtn["errorCode"] = "";
	$rtn["data"] = "success to keep the article";
}
	else{	//收回收藏
		$row=$result->fetch_row();
		$keepsql="DELETE FROM `FollowKeep` WHERE `UserID`='".$input['account']."' AND `ArticleID`='".$input['articleId']."'";
		$keepresult = $conn->query($keepsql);
		if(!$keepresult){
		die($conn->error);
		}
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "success to delete the article";
	}
echo json_encode($rtn);