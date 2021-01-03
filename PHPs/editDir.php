<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editDir";
	cmd["account"] = "UserID"; //cmd["token"]
	cmd["old"] ="我喜歡的"; (oldDirName)
	cmd["new"] ="我不喜歡的"; (newDirName)
    
    後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
		dataDB.info = "Successfully edited this dictionary."
		dataDB.data = 更新後的資料夾名稱
    否則
        dataDB.errorCode = "Update without permission." / "Failed to found the update folder."
		dataDB.data=""
	*/
    function doEditDir($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `DirName`=? AND `UserID`=? LIMIT 1)";//收藏資料夾是否存在
        $arr = array($input['old'], $user);
		$result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Update without permission.");
        }
        else{
            $sql="UPDATE `KeepDir` SET `DirName`=? WHERE `UserID`=? AND`DirName`=?";
            $arr = array($input['new'],$user,$input['old']);
            query($conn,$sql,$arr,"UPDATE");

            $sql="SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `UserID`=?  AND`DirName`=? LIMIT 1)";//收藏資料夾是否已改名
            $arr = array($user,$input['new'] );
            $result = query($conn,$sql,$arr,"SELECT");
            if(!$result[0][0]){
                errorCode("Failed to found the update folder.");
            }
            else{
                $rtn = successCode("Successfully edited this dictionary.",$result);
            }
        }
        echo json_encode($rtn);
    }
?>
