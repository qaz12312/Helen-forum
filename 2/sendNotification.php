<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sendNotification";
    cmd["recipient"] = "收通知的account";
    cmd["content"] = "Content"

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[0]	// UserID
        dataDB.data[1]	// Times
        dataDB.data[2]	// Content
    否則
        dataDB.errorCode = "Failed to send notification,Database exception."
        dataDB.data = ""
    */
    function doSendNotification($input){
        global $conn;
        $new="INSERT INTO  `Notice`(`UserID`,`Content`)VALUES('".$input['recipient']."','".$input['content']."')";
        $resultNew=$conn->query($new);
        if(!$resultNew){
            die($conn->error);
        }
        $sql="SELECT `UserID`,`Times`,`Content` FROM `Notice` WHERE `UserID`='".$input['recipient']."' AND`Content`='".$input['content']."' ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($resultCount <= 0){
            errorCode("Failed to send notification,Database exception.");
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
