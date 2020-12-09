<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "browseNotification";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data // 通知
        (
            dataDB.data[0].time    // 第1筆通知的時間
            dataDB.data[0].content // 第1筆通知的內文
            ...
        )
    否則
        dataDB.errorCode = "You don't have permission to do this action." / "目前無任何通知"
        dataDB.data = ""
    */
    function doBrowseNotification($input){ //查看user的通知
        global $conn;
        $token = $input['token'];
        if (!isset($_SESSION[$token])) {
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "You don't have permission to do this action.";
            $rtn["data"] = "";
        } else {
            $userInfo = $_SESSION[$token];
            $sql = "SELECT `Times`,`Content` FROM  `Notice` WHERE `UserID`='" . $userInfo['account'] . "' ORDER BY `Times` DESC";
            $result = $conn->query($sql);
            if (!$result) {
                die($conn->error);
            }
            if ($result->num_rows <= 0) {
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "目前無任何通知";
                $rtn["data"] = "";
            } else {
                $arr = array();
                for ($i = 0; $i < $result->num_rows; $i++) {
                    $row = $result->fetch_row();
                    $log = array("time" => "$row[0]", "content" => "$row[1]");
                    $arr[$i] = $log;
                }
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $arr;
            }
        }
        echo json_encode($rtn);
    }
?>