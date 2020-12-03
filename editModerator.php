<?php 
    require_once 'connectDB.php'; //連線資料庫
    /*前端 to 後端:
    let cmd = {};
    cmd["act"] = "editMode";
    cmd["oldboardID"] = "BoardName"
    cmd["newboardID"] = "BoardName"
    cmd["userID"] = "UserID"
*/ 
/* 後端 to 前端
        dataDB.state
        dataDB.errorCode
        若 state = true:
            dataDB.data[i] //有i筆文章
            (
                dataDB.data[i].UserID 
                dataDB.data[i].UserColor 
                dataDB.data[i].BoardName 
            ) 
        否則
            
        */
    $check= true;
    if($input['oldboardID']){
        $updateSql="UPDATE `Board` SET `UserID`='admin' WHERE `BoardID` = $input['oldboardID']";
        $result=$conn->query($updateSql);
        if(!$result){
            die($conn->error);
        }
        $sql ="SELECT `UserID`,`UserColor`,`BoardName` FROM `Board`NATURAL JOIN`User` ON User.UserID =Board.UserID  WHERE `BoardID` = $input['oldboardID'] AND`UserID`='admin' " ;
        global $conn;
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "修改oldboardID失敗";
            $rtn["data"] = "";
            $check= false;
        }
    }
    if($input['newboardID']){
        $updateSql2="UPDATE `Board` SET `UserID`='".$input['userID']."' WHERE `BoardID` = $input['newboardID']";
        $result=$conn->query($updateSql2);
        if(!$result){
            die($conn->error);
        }
        sql ="SELECT `UserID`,`UserColor`,`BoardName` FROM `Board`NATURAL JOIN`User` ON User.UserID =Board.UserID  WHERE `BoardID` = $input['oldboardID'] AND`UserID`='admin' " ;
        global $conn;
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "修改oldboardID失敗";
            $rtn["data"] = "";
            $check= false;
        }
    }
    if($check){
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] ="";
    }
    echo json_encode($rtn);
?>