<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editDir";
	cmd["account"] = "UserID";
	cmd["old"] ="我喜歡的"; (oldDirName)
	cmd["new"] ="我不喜歡的"; (newDirName)

	後端 to 前端
	dataDB.status
    若 status = true:
        dataDB.status = true
		dataDB.errorCode = ""
		dataDB.data=更新後的資料夾名稱
    否則 status = false:
        dataDB.status = false
		dataDB.data=""
		dataDB.errorCode = "Update without permission." / "Failed to found the update folder."
	*/
    function doEditDir($input){
        global $conn;
        $sql="SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`='".$input['old']."' AND `UserID`='".$input['account']."' ";  
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Update without permission.");
        }
        else{
            $sql="UPDATE `KeepDir` SET `DirName`='".$input['new']."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"UPDATE");

            $sql="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`='".$input['account']."'  AND`DirName`='".$input['new']."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to found the update folder.");
            }
            else{
                $rtn = successCode($result);
            }
        }
        echo json_encode($rtn);
    }
?>
