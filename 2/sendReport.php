<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "sendReport";
	cmd["account"] = "00757007";
	cmd["reason"] = "Reason";
	cmd["articleID"] = articleID;	
	
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		(需要回傳東西麼?還是就傳"成功送出檢舉"呢?)
		dataDB.data[0]	// ArticleID
		dataDB.data[1]	// Reason
		dataDB.data[2]	// times
	否則
		dataDB.errorCode = "Failed to send report,Database exception."
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
        if($resultCount <= 0){
            errorCode("Failed to send report,Database exception.");
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
