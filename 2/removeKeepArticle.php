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
        $del="DELETE FROM `FollowKeep` WHERE  `DirName`='".$input['dirName']."' AND`UserID`='".$input['account']. "'AND`ArticleID`='".$input['articleID']."'";
        $result=$conn->query($del);
            if(!$result){
                die($conn->error);
            }
        $sql="SELECT `ArticleID`,`UserID`,`DirName` FROM `FollowKeep` WHERE `ArticleID`='".$input['articleID']."' AND`UserID`='".$input['account']."'AND`DirName`='".$input['dirName']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($resultCount > 0){
            errorCode("Failed to remove article in keepDir,Database exception.");
        }
        else{
            $rtn = successCode("Successfully remove article in keepDir.");
        }
        echo json_encode($rtn);
    }
?>