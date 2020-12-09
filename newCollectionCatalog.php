<?php 
    //require_once 'test.php'; //連線資料庫 
    /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "newCollectionCatalog";
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
    function doNewCollectionCatalog($input){
         global $conn;
        $new="INSERT INTO  `KeepDir`(`UserID`,`DirName`) 
        VALUES('".$input['account']."','".$input['dirName']."')";
        $resultNew=$conn->query($new);
        if(!$resultNew){
            die($conn->error);
        }
        $sql="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`='".$input['account']."' AND`DirName`='".$input['dirName']."'";
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
            $rtn["articleID"] =$row;
        }
        echo json_encode($rtn);
    }
?>