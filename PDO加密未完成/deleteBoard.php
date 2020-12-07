<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteBoard";
    cmd["userID"] = "00757033";
    cmd["boardName"] =  "BoardName";

    後端 to 前端
    dataDB.status
    dataDB.errorCode
    若 status = true:
        dataDB.data[0]	// BoardName
        dataDB.data[1]	// UserID
        dataDB.data[2]	// Rule
        dataDB.data[3]	// TopArticleID
    否則
        dataDB.data = ""
    */
    $sqlcheck="SELECT `BoardName` FROM `Board` NATURAL JOIN `Users`  WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."' ";  
    $result=$conn->query($sqlcheck);
    if(!$result){
        die($conn->error);
    } 
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "無權限刪除";
        $rtn["data"] = "";
    }
    else{
        $sql="DELETE FROM `Board`  WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."'  ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        $sql="SELECT `BoardName` FROM `Board` WHERE `BoardName` = '".$input['boardName']."' ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows > 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "刪除失敗，資料庫異常";
        $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
    }
    echo json_encode($rtn);
?>