<?php 
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editBoard";
    cmd["boardName"] = "BoardName"
    cmd["account"] = "UserID" //cmd["token"]
    cmd["rule"] = "Rule"
    
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
        dataDB.info = "Successfully edited this board."
        dataDB.data = 更新後的版
    否則
        dataDB.errorCode = "Failed to found the update board."/ "Delete without permission." 
        dataDB.data = ""
    */
    function doEditBoard($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName`=? AND `UserID`=? LIMIT 1)";//版是否存在
        $arr = array($input['boardName'],$user);
		$result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Delete without permission.");
        }
        else{
            $sql="UPDATE `Board` SET `Rule`=? where `BoardName`=? AND `UserID`=?";
            $arr = array($input['rule'], $input['boardName'],$user);
            query($conn,$sql,$arr,"UPDATE");
            
            $sql ="SELECT EXISTS(SELECT 1 FROM `Board` JOIN `Users` ON Board.UserID=Users.UserID WHERE `BoardName`=? AND Board.UserID=? AND `Rule`=? LIMIT 1)";
            $arr = array($input['boardName'],$user, $input['rule']);
            $result = query($conn,$sql,$arr,"SELECT");
            if(!$result[0][0]){
                errorCode("Failed to found the update board.");
            }
            else{ 
                $rtn = successCode("Successfully edited this board.",$result);
            }
        }
        echo json_encode($rtn);
    }
?>
