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
		dataDB.errorCode = "已從資料夾中移除文章"
		dataDB.data = ""
	否則
		dataDB.errorCode = "收藏文章移除失敗"
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
        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "收藏文章移除失敗";
            $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "已從資料夾中移除文章";
			$rtn["data"] = "";
        }
        echo json_encode($rtn);
    }
?>