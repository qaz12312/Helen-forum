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
        $sql="SELECT `BoardName` FROM `Board` WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."' ";  
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Delete without permission.");
        }
        else{
            $sql="UPDATE `Board` SET `Rule`='".$input['rule']."'where `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"UPDATE");
            
            $sql ="SELECT `BoardName` FROM `Board` NATURAL JOIN`Users` WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."'AND `Rule`='".$input['rule']."'" ;
            $arr = array();
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to found the update board.");
            }
            else{
                $rtn = successCode($result);
            }
        }
        echo json_encode($rtn);
    }
?>