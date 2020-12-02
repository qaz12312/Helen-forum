<?php 
    require_once 'connectDB.php'; //連線資料庫 
    /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "addKeepDir";
			cmd["account"] = "UserID"
            cmd["dirID"] = "DirID"
            cmd["dirName"] ="我喜歡的"

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
    global $input,$conn;
    $total="SELECT count(distinct `DirID`)FROM `KeepDir` where `AuthorID` = $input['userID']";
    if(!$total){
        die($conn->error);
    }
    $new="INSERT INTO  `KeepDir `(`UserID`,`DirID`,`DirName`) 
    VALUES('".$input['userID']."','".$total[0]+1."','".$input['dirName'].)";
    $resultNew=$conn->query($new);
    if(!$resultNEW){
        die($conn->error);
    }
    $sql="SELECT `UserID`,`DirID`,`DirName` FROM `KeepDir` WHERE `UserID`=$input['userID'] AND`DirID`=$total[0]+1 AND`DirName`=$input['dirName']";
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "新增資料夾失敗";
        $rtn["data"] = "";
    }
    else{
        $row=$result->fetch_row();
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] = $row[0];
        $rtn["articleID"] =$articleID;
    }
    echo json_encode($rtn);
?>