<?php
    //點通知 PRIMARY KEY ('UserID', 'Time', 'Content')
    /* 
    前端 to 後端:
    cmd["account"] = "UserID";
    cmd["timer"] = "Time";
    cmd["detail"] = "Content";
        
    後端 to 前端
    dataDB.status
    dataDB.errorCode
    若 state = true:
    否則
        dataDB.data = ""
    */
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
?>