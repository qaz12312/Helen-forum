<?php
    //require_once 'connectDB.php'; //連線資料庫 
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "sendReport";
            cmd["reason"] = "Reason"
			cmd["account"] = "userid"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// ArticleID
                dataDB.data[1]	// Reason
                dataDB.data[2]	// times
            否則
                dataDB.data = ""
         */
    function doSendReport($input){
        global $conn;
        $new="INSERT INTO  `Report`(`UserID`,`ArticleID`,`Reason`) 
        VALUES('".$input['account']."','".$input['articleID']."','".$input['reason']."')";
        $resultNew=$conn->query($new);
        if(!$resultNew){
            die($conn->error);
        }
        $sql="SELECT `ArticleID`,`Reason`,`Times` FROM `Report` WHERE `ArticleID`='".$input['articleID']."' AND `reason`='".$input['reason']."' ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "傳送檢舉失敗";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] = $row;
        }
        echo json_encode($rtn);
    }
?>