<?php 
      /*前端 to 後端:
        let cmd = {};
        cmd["act"] = "editBoard";
        cmd["boardName"] = "BoardName"
        cmd["account"] = "UserID"
        cmd["rule"] = "Rule"
    */ 
    /* 後端 to 前端
            
            若 status = true:
                dataDB.data = 更新後的版
                dataDB.status = true
            否則 status = false:
                dataDB.status = false
                dataDB.data = ""
               dataDB.errorCode = "Failed to found the update board."/ "Delete without permission." 
         */
    function doEditBoard($input){
        global $conn;
        $sqlcheck="SELECT `BoardName` FROM `Board` WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."' ";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($resultCount <= 0){
            errorCode("Delete without permission.");
        }
        else{
            $updateSql="UPDATE `Board` SET `Rule`='".$input['rule']."'where `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
            }
            $sql ="SELECT `BoardName` FROM `Board` NATURAL JOIN`Users` WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."'AND `Rule`='".$input['rule']."'" ;
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($resultCount <= 0){
                errorCode("Failed to found the update board.");
            }
            else{
                $row=$result->fetch_row();
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $row;
            }
        }
        echo json_encode($rtn);
    }
?>
