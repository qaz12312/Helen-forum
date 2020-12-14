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
        dataDB.status = true
        dataDB.errorCode = ""
        dataDB.data = "Successfully deleted this notification. "
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "Update without permission. / Without notice."
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
            $rtn["errorCode"] = "Update without permission.";
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
                $rtn["errorCode"] = "Without notice.";
                $rtn["data"] = "";
            }
            else{
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = "Successfully deleted this notification.";
                
            }
        }
        echo json_encode($rtn);
    }
?>