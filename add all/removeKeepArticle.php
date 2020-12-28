<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "removeKeepArticle";
    cmd["account"] = "00857210"; //cmd["token"]
    cmd["articleID"] = "1";
    cmd["dirName"] ="旅遊景點";
		
    後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully remove article in keepDir."
		dataDB.data = ""
	否則
		dataDB.errorCode = "Failed to remove article in keepDir,Database exception."
		dataDB.data = "" 
     */
    function doRemoveKeepArticle($input){ // 將文章從收藏資料夾移除
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
        $sql="SELECT `ArticleID`,`UserID`,`DirName` FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=? AND`DirName`=?";
        $arr = array($input['articleID'], $input['account'], $input['dirName']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Keep article not exist in ".$input['dirName'].".");
        }

        $sql="DELETE FROM `FollowKeep` WHERE  `DirName`=? AND`UserID`=? AND`ArticleID`=?";
        $arr = array($input['dirName'], $input['account'], $input['articleID']);
        query($conn,$sql,$arr,"DELETE");
            
        $sql="SELECT `ArticleID`,`UserID`,`DirName` FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=? AND`DirName`=?";
        $arr = array($input['articleID'], $input['account'], $input['dirName']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount > 0){
            errorCode("Failed to remove article in keepDir,Database exception.");
        }
        else{
            $rtn = successCode("Successfully remove article in keepDir.");
        }
        echo json_encode($rtn);
    }
?>