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
            dataDB.status = true
            dataDB.errorCode = ""
            dataDB.data="Successfully modified moderator." 
        否則 status = false:
            dataDB.status = false
            dataDB.errorCode = ""
            dataDB.errorCode= "Update without permission." /"Failed to found the update Moderator."/"Failed to appoint moderator."
    */
    function doEditModerator($input){
        global $conn;
        $check= true;
        if(isset($input['oldBoardName'])){
            global $conn;
            $sqlcheck="SELECT `UserID` FROM `Board` WHERE `BoardName` = '".$input['oldBoardName']."' AND `UserID`='".$input['account']."' ";  
            $result=$conn->query($sqlcheck);
            if(!$result){
                die($conn->error);
            } 
            if($resultCount <= 0){
                errorCode("Update without permission.");
            }
            else{
                $updateSql="UPDATE `Board` SET `UserID`='admin' WHERE `BoardName` = '".$input['oldBoardName']."'";
                $result=$conn->query($updateSql);
                if(!$result){
                    die($conn->error);
                }
                $sql ="SELECT `UserID`,`Color`,`BoardName` FROM `Board`NATURAL JOIN`Users`WHERE `BoardName`='".$input['oldBoardName']."' AND`UserID`='admin' " ;
                $result=$conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($resultCount <= 0){
                    errorCode("Failed to found the update Moderator.");
                }
            }
        }
        if(isset($input['newBoardName'])){
            global $conn;
            $sqlcheck="SELECT `UserID` FROM `Board` WHERE `BoardName` = '".$input['newBoardName']."' AND `UserID`='admin' ";  
            $result=$conn->query($sqlcheck);
            if(!$result){
                die($conn->error);
            } 
            if($resultCount <= 0){
                errorCode("Update without permission.");
            }
            else{
                $updateSql2="UPDATE `Board` SET `UserID`='".$input['account']."' WHERE `BoardName` = '".$input['newBoardName']."'";
                $result=$conn->query($updateSql2);
                if(!$result){
                    die($conn->error);
                }
                $sql ="SELECT `UserID`,`Color`,`BoardName` FROM `Board`NATURAL JOIN`Users`  WHERE `BoardName` = '".$input['newBoardName']."' AND`UserID`='".$input['account']."' " ;
                $result=$conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($resultCount <= 0){
                    errorCode("Failed to appoint moderator,Database exception.");
                }
            }
        }
        if($check){
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] ="Successfully modified moderator.";
        }
        echo json_encode($rtn);
    }
?>
