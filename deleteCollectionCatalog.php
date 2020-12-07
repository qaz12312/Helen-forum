<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "addKeepDir";
    cmd["account"] = "UserID"
    cmd["dirName"] ="我喜歡的"

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data = ""
    否則
        dataDB.errorCode = ""
        dataDB.data = ""
    */
    require_once 'test.php'; //連線資料庫 
    $sqlcheck="SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`='".$input['dirName']."' AND `UserID`='".$input['account']."' ";  
    $result=$conn->query($sqlcheck);
    if(!$result){
        die($conn->error);
    } 
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "無權限修改";
        $rtn["data"] = "";
    }
    else{
        $delkeep="DELETE FROM `KeepDir` WHERE `DirName`='".$input['dirName']."' AND `UserID`='".$input['account']."'";
        $result=$conn->query($delkeep);
        if(!$result){
                die($conn->error);
        }
        $del="DELETE FROM `KeepDir` WHERE `DirName`='".$input['dirName']."' AND `UserID`='".$input['account']."'";
        $result=$conn->query($del);
            if(!$result){
                die($conn->error);
            }
        $sql="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `DirName`='".$input['dirName']."' AND `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "刪除資料夾失敗";
            $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
    }
    echo json_encode($rtn);
?>