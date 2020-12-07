<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "EditPermission";
    cmd["UserID"] = "00757000"
    cmd["Permission"] = "1"
    
    
    後端 to 前端
    dataDB.status
    dataDB.errorCode
    若 status = true:
        dataDB.data[0]	// 
        dataDB.data[1]	// BoardName
        dataDB.data[2]	// UserID
    否則
        dataDB.data = ""
    */
    require_once 'noSecurity.php'; //連線資料庫 
	function EditPermission(){
        global $input,$conn;	// 置頂
		$sql="UPDATE `Users` SET `Permission` = CASE WHEN `Permission` = 1 THEN `Permission` = 2 WHEN `Permission` = 2 THEN `Permission` = 1";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "變更失敗";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "變更成功";
            $rtn["data"] =$row;
        }
        echo json_encode($rtn);
	}
?>