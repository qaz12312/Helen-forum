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
        $sql = "SELECT `BoardName` FROM `Board` NATURAL JOIN `Users`  WHERE `BoardName`='" . $input['boardName'] . "'";
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
        
        if ($resultCount <= 0) {
            errorCode("This board doesn't exist.");
        } else {
            $sql = "DELETE FROM `Board`  WHERE `BoardName`='" . $input['boardName'] ."'";
            $arr = array();
			query($conn,$sql,$arr,"DELETE");

            $sql = "SELECT `BoardName` FROM `Board` WHERE `BoardName` = '" . $input['boardName'] . "'";
            $arr = array();
		    $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            
            if ($resultCount > 0) {
                errorCode("Failed to delete,Database exception.");
            } else {
                $rtn = successCode("Successfully deleted this board.");
            }
        }
        echo json_encode($rtn);
    }
?>
