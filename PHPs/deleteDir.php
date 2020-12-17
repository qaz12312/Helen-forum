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
        dataDB.info = "Successfully deleted this folder."
        dataDB.data= ""
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "This folder doesn't exit." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteDir($input)
    {
        global $conn;
        $sql = "SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
        $arr = array($input['dirName'], $input['account'] );
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
        
        if ($resultCount <= 0) {
            errorCode("This folder doesn't exit.");
        } else {
            $sql = "DELETE FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
            $arr = array($input['dirName'], $input['account']);
			query($conn,$sql,$arr,"DELETE");
            
            $sql = "SELECT `DirName` FROM `KeepDir` WHERE `DirName`=? AND `UserID`=?";
            $arr = array($input['dirName'],  $input['account']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);

            if ($resultCount > 0) {
                errorCode("Failed to delete,Database exception.");
            } else {
                $rtn = successCode("Successfully deleted this folder.");
            }
        }
        echo json_encode($rtn);
    }
?>