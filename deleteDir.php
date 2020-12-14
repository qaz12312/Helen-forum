<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteDir";
    cmd["account"] = "00757007";
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
        $sqlcheck = "SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`='" . $input['dirName'] . "' AND `UserID`='" . $input['account'] . "' ";
        $result = $conn->query($sqlcheck);
        if (!$result) {
            die($conn->error);
        }
        if ($result->num_rows <= 0) {
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "This folder doesn't exit.";
            $rtn["data"] = "";
        } else {
            $delkeep = "DELETE FROM `KeepDir` WHERE `DirName`='" . $input['dirName'] . "' AND `UserID`='" . $input['account'] . "'";
            $result = $conn->query($delkeep);
            if (!$result) {
                die($conn->error);
            }
            $sql = "SELECT `DirName` FROM `KeepDir` WHERE `DirName`='" . $input['dirName'] . "' AND `UserID`='" . $input['account'] . "'";
            $result = $conn->query($sql);
            if (!$result) {
                die($conn->error);
            }
            if ($result->num_rows > 0) {
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Failed to delete,Database exception.";
                $rtn["data"] = "";
            } else {
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = "Successfully deleted this folder.";
            }
        }
        echo json_encode($rtn);
    }
?>