<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "EditPermission";
    cmd["account"] = "00857210";
    cmd["Permission"] = 1;
    
    
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data = "變更成功"
    否則
        dataDB.errorCode = "變更失敗"
        dataDB.data = ""
    */ 
	function EditPermission($input){ //變成版主or 一般使用者
        global $conn;
		$sql="UPDATE `Users` SET `Permission` = ( CASE WHEN `Permission` = 1 THEN '2' WHEN `Permission` = 2 THEN '1' END ) WHERE `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "變更失敗";
            $rtn["data"] = "";
            die($conn->error);
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "變更成功";
            $rtn["data"] = "success change";
        }
        echo json_encode($rtn);
	}
?>