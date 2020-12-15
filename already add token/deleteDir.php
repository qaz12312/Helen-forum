<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteDir";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["dirName"] ="我喜歡的";

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.status = true
        dataDB.errorCode = ""
        dataDB.data= "Successfully deleted this folder."
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "This folder doesn't exit." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteDir($input)
    {
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("You don't have permission to do this action.");
        // }else{
        //     $userInfo = $_SESSION[$token];
            $sql = "SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
            $arr = array($input['dirName'], $input['account'] );//$userInfo['account']
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            
            if ($resultCount <= 0) {
                errorCode("This folder doesn't exit.");
            } else {
                $sql = "DELETE FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
                $arr = array($input['dirName'], $input['account']);//$userInfo['account']
                query($conn,$sql,$arr,"DELETE");
                
                $sql = "SELECT `DirName` FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
                $arr = array($input['dirName'],  $input['account']);//$userInfo['account']
                $result = query($conn,$sql,$arr,"SELECT");
                $resultCount = count($result);
                if ($resultCount > 0) {
                    errorCode("Failed to delete,Database exception.");
                } else {
                    $rtn = successCode("Successfully deleted this folder.");
                }
            }
        // }
        echo json_encode($rtn);
    }
?>