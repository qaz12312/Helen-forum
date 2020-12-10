<?php
    /* 
    前端 to 後端:
            let cmd = {};
            cmd["act"] = "editDir";
            cmd["account"] = "UserID"
            cmd["oldDirName"] ="我喜歡的"
            cmd["newDirName"] ="我不喜歡的"

        */
		
         /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// UserID
				dataDB.data[1]	// DirID
				dataDB.data[2]	// DirName
            否則
                dataDB.data = ""
         */
    function doEditDir($input){
        global $conn;
        $sqlcheck="SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`='".$input['oldDirName']."' AND `UserID`='".$input['account']."' ";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無權限修改";
            $rtn["data"] = "";
        }
        else{
            $updateSql="UPDATE `KeepDir` SET `DirName`='".$input['newDirName']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`='".$input['account']."'  AND`DirName`='".$input['newDirName']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "修改失敗";
                $rtn["data"] = "";
            }
            else{
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = "";
            }
        }
        echo json_encode($rtn);
    }
?>
