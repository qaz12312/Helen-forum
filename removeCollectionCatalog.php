<?php
    require_once 'connectDB.php'; //連線資料庫 
    /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "delKeepDir";
            cmd["account"] = "UserID"
            cmd["dirID"] = "DirID"
            cmd["dirName"] ="我喜歡的"

        */
		
         /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				
            否則
                dataDB.data = ""
         */
    $delkeep="DELETE FROM `FollowKeep` WHERE `KeepID` = $input["dirID"] AND  `UserID` = $input["userID"]";
    $result=$conn->query($delkeep);
    if(!$result){
            die($conn->error);
    }
    if($result->num_rows >= 0){
        $rtn = array();
        $rtn["statue"] = false;
        $rtn["errorCode"] = "刪除失敗";
        $rtn["data"] = "";
    }
    else{
        $del="DELETE FROM `KeepDir` WHERE `DirID` = $input["dirID"] AND  `UserID` = $input["userID"]";
        $result=$conn->query($del);
            if(!$result){
                die($conn->error);
            }
        $sql="SELECT `UserID`,`DirID`,`DirName` FROM `KeepDir` WHERE `UserID`=$input['userID'] AND`DirID`=['dirID'] AND`DirName`=$input['dirName']";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows >= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "刪除資料夾失敗";
            $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
    }
    echo json_encode($rtn);

?>