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
                dataDB.info = ""
                dataDB.status = true
            否則 status = false:
                dataDB.status = false
                dataDB.data = ""
               dataDB.errorCode = "Failed to found the update board."/ "Delete without permission." 
         */
    function doEditBoard($input){
        global $conn;
        $sql="SELECT `BoardName` FROM `Board` WHERE `BoardName`=? AND `UserID`=? ";  
        $arr = array($input['boardName'], $input['account']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Delete without permission.");
        }
        else{
            $sql="UPDATE `Board` SET `Rule`=? where `BoardName`=? AND `UserID`=?";
            $arr = array($input['rule'], $input['boardName'],$input['account'] );
            query($conn,$sql,$arr,"UPDATE");
            
            $sql ="SELECT `BoardName`, `Rule` FROM `Board` JOIN `Users` ON Board.UserID=Users.UserID WHERE `BoardName`=? AND Board.UserID=? AND `Rule`=?" ;
            $arr = array($input['boardName'], $input['account'], $input['rule']);
            $result = query($conn,$sql,$arr,"SELECT");
            // print_r($result);
			$resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to found the update board.");
            }
            else{
                $rtn = successCode("Successfully edited this board.",$result);
            }
        }
        echo json_encode($rtn);
    }
?>
