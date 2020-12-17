<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteBoard";
    cmd["boardName"] =  "BoardName";

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.status = true
        dataDB.errorCode = ""
        dataDB.data= "Successfully deleted this board."
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "This board doesn't exist." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteBoard($input)
    {
        global $conn;
        $sqlcheck = "SELECT `BoardName` FROM `Board` NATURAL JOIN `Users`  WHERE `BoardName`='" . $input['boardName'] . "'";
        $result = $conn->query($sqlcheck);
        if (!$result) {
            die($conn->error);
        }
        if ($result->num_rows <= 0) {
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "This board doesn't exist.";
            $rtn["data"] = "";
        } else {
            $sql = "DELETE FROM `Board`  WHERE `BoardName`='" . $input['boardName'] ."'";
            $result = $conn->query($sql);
            if (!$result) {
                die($conn->error);
            }
            $sql = "SELECT `BoardName` FROM `Board` WHERE `BoardName` = '" . $input['boardName'] . "'";
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
                $rtn["data"] = "Successfully deleted this board.";
            }
        }
        echo json_encode($rtn);
    }
?>
