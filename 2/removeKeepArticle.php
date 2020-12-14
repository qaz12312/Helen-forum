<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "removeKeepArticle";
    cmd["account"] = "00857210";
    cmd["articleID"] = "1";
    cmd["dirName"] ="旅遊景點";
		
    後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = "Successfully remove article in keepDir."
		dataDB.data = ""
	否則
		dataDB.errorCode = "Failed to remove article in keepDir,Database exception."
		dataDB.data = "" 
     */
    function doRemoveKeepArticle($input){ // 將文章從收藏資料夾移除
    	global $conn;
        $sql="DELETE FROM `FollowKeep` WHERE  `DirName`='".$input['dirName']."' AND`UserID`='".$input['account']. "'AND`ArticleID`='".$input['articleID']."'";
        $arr = array();
        query($conn,$sql,$arr,"DELETE");
            
        $sql="SELECT `ArticleID`,`UserID`,`DirName` FROM `FollowKeep` WHERE `ArticleID`='".$input['articleID']."' AND`UserID`='".$input['account']."'AND`DirName`='".$input['dirName']."'";
        $arr = array();
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