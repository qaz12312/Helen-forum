<?php
    /* 
    前端 to 後端:
    let cmd = {};
	cmd["act"] = "clickNotice";
    cmd["account"] = "00757033";
    cmd["timer"] = "2020-12-08 23:59:59";
    cmd["detail"] = "Content";
        
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 state = true:
        dataDB.errorCode = ""
        dataDB.data = ""
    否則
        dataDB.errorCode = ""
        dataDB.data = ""
    */
    function doClickNotice($input){ //user點通知->刪除此則通知
        global $conn;
        $sql ="DELETE FROM  `Notice` where `UserID`=$input['account'], `Time`=$input['timer'],`Content`=$input['detail']" ;
        global $conn;
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "沒有";
            $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
        echo json_encode($rtn);
    }
?>