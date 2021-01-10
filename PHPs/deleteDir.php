<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteDir";
    cmd["account"] = "00757003"; //cmd["token"]
    cmd["dirName"] ="資料夾名稱";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully deleted this folder."
        dataDB.data = ""
    否則
        dataDB.errorCode = "This folder doesn't exit." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteDir($input)
    {
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql = "SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `DirName`=? AND `UserID`=? LIMIT 1)";
        $arr = array($input['dirName'],$user);
        $result = query($conn,$sql,$arr,"SELECT");
        if (!$result[0][0]) {
            errorCode("This folder doesn't exit.");
        } else {
            $sql = "DELETE FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
            $arr = array($input['dirName'],$user);
            query($conn,$sql,$arr,"DELETE");
            
            $sql = "SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `DirName`=? AND `UserID`=? LIMIT 1)";
            $arr = array($input['dirName'],$user);
            $result = query($conn,$sql,$arr,"SELECT");
            if ($result[0][0]) {
                errorCode("Failed to delete,Database exception.");
            } else {
                $rtn = successCode("Successfully deleted this folder.");
            }
        }
        echo json_encode($rtn);
    }
?>