<?php
    
    /* 前端 to 後端:
        let cmd = {};
        cmd["act"] = "delFollowKeep";
        cmd["articleID"] = "ArticleID"
        cmd["account"] = "UserID"
        cmd["keepID"] ="KeepID"
    */
		
    /* 後端 to 前端
        dataDB.status
        dataDB.errorCode
        若 status = true:
           
        否則
            dataDB.data = ""
     */
    require_once 'connectDB.php'; //連線資料庫 
    $del="DELETE FROM `FollowKeep` WHERE  `KeepID`='".$input['keepID'].' AND`UserID`='".$input['userID']. "'AND`ArticleID`='".$input['articleID'].";
    $result=$conn->query($del);
        if(!$result){
            die($conn->error);
        }
    $sql="SELECT `ArticleID`,`UserID`,`KeepID`,`ArticleID` FROM `FollowKeep` WHERE `ArticleID`='".$input['articleID'].' AND`UserID`='".$input['userID']."'AND`KeepID`='".$input['keepID']."'";
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows > 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "收藏刪除失敗";
        $rtn["data"] = "";
    }
    else{
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
    }
    echo json_encode($rtn);
?>