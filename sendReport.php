<?php
    require_once 'connectDB.php'; //連線資料庫 
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "sendReport";
            cmd["reason"] = "Reason"
			cmd["timer"] = "Times"
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
    global $input,$conn;
    $new="INSERT INTO  `Report`(`ArticleID`,`Reason`,`Times`) 
    VALUES('".$input['articleID']."','".$input['reason']."'','".$input['timer']."')";
    $resultNew=$conn->query($new);
    if(!$resultNEW){
        die($conn->error);
    }
    $sql="SELECT `ArticleID`,`Reason`,`Times` FROM `Report` WHERE `ArticleID`=$input['articleID'] AND `reason`=$input['Reason'] ";
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
?>