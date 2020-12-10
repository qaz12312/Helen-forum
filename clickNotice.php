<?php
    /* 
    前端 to 後端:
    let cmd = {};
	cmd["act"] = "clickNotice";
    cmd["account"] = "00757033";
    cmd["detail"] = "Content";
        
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data = ""
    否則
        dataDB.errorCode = "無權限更新 / 沒有通知"
        dataDB.data = ""
    */
    function doClickNotice($input){ //user點通知->刪除此則通知
        global $conn;
        $sqlcheck="SELECT `Times` FROM `Notice` Where `UserID`='".$input['account']."'AND `Content`='".$input['detail']."'";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無權限更新";
            $rtn["data"] = "";
        }
        else{
            $sql ="DELETE FROM  `Notice` Where `UserID`='".$input['account']."'AND`Content`='".$input['detail']."'" ;
            global $conn;
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows > 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "沒有通知";
                $rtn["data"] = "";
            }
            else{
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
            }
        }
        echo json_encode($rtn);
    }
?>