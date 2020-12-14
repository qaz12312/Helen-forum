<?php 
/*
前端 to 後端:
let cmd = {};
cmd["act"] = "editModerator";
cmd["account"] = "UserID";

cmd["oldBoardName"] = "BoardName";
cmd["newBoardName"] = "BoardName";

後端 to 前端:
dataDB.status
若 status = true:
dataDB.errorCode = ""
dataDB.data="" 
否則
dataDB.errorCode = ""
dataDB.errorCode= 刪除版主失敗 /任命版主失敗
*/
    function doEditModerator($input){
        global $conn;
        $check= true;
        if(isset($input['oldBoardName'])){
            $updateSql="UPDATE `Board` SET `UserID`='admin' WHERE `BoardName` = '".$input['oldBoardName']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
                $check= false;
            }
            $sql ="SELECT `UserID`,`Color`,`BoardName` FROM `Board`NATURAL JOIN`Users`WHERE `BoardName`='".$input['oldBoardName']."' AND`UserID`='admin' " ;
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
                $check= false;
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "刪除版主失敗";
                $rtn["data"] = "";
                $check= false;
            }
        }
        if(isset($input['newBoardName'])){
            $updateSql2="UPDATE `Board` SET `UserID`='".$input['account']."' WHERE `BoardName` = '".$input['newBoardName']."'";
            $result=$conn->query($updateSql2);
            if(!$result){
                die($conn->error);
                $check= false;
            }
            $sql ="SELECT `UserID`,`Color`,`BoardName` FROM `Board`NATURAL JOIN`Users`  WHERE `BoardName` = '".$input['newBoardName']."' AND`UserID`='".$input['account']."' " ;
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
                $check= false;
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "任命版主失敗";
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
    }
?>
