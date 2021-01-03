<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteBoard";
    cmd["boardName"] =  "BoardName";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully deleted this board."
        dataDB.data = ""
    否則
        dataDB.errorCode = "This board doesn't exist." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteBoard($input)
    {
        require_once("toAllNotification.php");
        global $conn;
        $board = $input['boardName'];
        $sql = "SELECT EXISTS(SELECT 1 FROM `Board` NATURAL JOIN `Users` WHERE `BoardName`=? LIMIT 1)";//版是否存在
		$result = query($conn,$sql,array($board),"SELECT");
        if (!$result[0][0]) {
            errorCode("This board doesn't exist.");
        } else {
            $sql = "DELETE FROM `Board`  WHERE `BoardName`=?";
			query($conn,$sql,array($board),"DELETE");

            $sql = "SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName` = ? LIMIT 1)";
		    $result = query($conn,$sql, array($board),"SELECT");     
            if ($result[0][0]) {
                errorCode("Failed to delete,Database exception.");
            } 
            else {
                doToAllNotification(array("content" => "The board 【".$board."】 does not exit."),0);
                $rtn = successCode("Successfully deleted this board.");
            }
        }
        echo json_encode($rtn);
    }
?>
