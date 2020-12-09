<?php
/* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteBoard";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["boardName"] =  "BoardName";

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data= "成功刪除此版塊"
    否則
        dataDB.errorCode = "You don't have permission to do this action." / "Your permission can't do this action." / "此版塊不存在" / "刪除失敗，資料庫異常"
        dataDB.data = ""
    */
function doDeleteBoard($input)
{
    global $conn;
    $token = $input['token'];
    if (!isset($_SESSION[$token])) {
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "You don't have permission to do this action.";
        $rtn["data"] = "";
    } else {
        $userInfo = $_SESSION[$token];
        if ($userInfo['permission'] < 3) {
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Your permission can't do this action.";
            $rtn["data"] = "";
        } else {
            $sqlcheck = "SELECT `BoardName` FROM `Board` NATURAL JOIN `Users`  WHERE `BoardName`='" . $input['boardName'] . "' AND `UserID`='" . $userInfo['account'] . "'";
            $result = $conn->query($sqlcheck);
            if (!$result) {
                die($conn->error);
            }
            if ($result->num_rows <= 0) {
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "此版塊不存在";
                $rtn["data"] = "";
            } else {
                $sql = "DELETE FROM `Board`  WHERE `BoardName`='" . $input['boardName'] . "' AND `UserID`='" . $userInfo['account'] . "'  ";
                $result = $conn->query($sql);
                if (!$result) {
                    die($conn->error);
                }
                $sql = "SELECT `BoardName` FROM `Board` WHERE `BoardName` = '" . $input['boardName'] . "' ";
                $result = $conn->query($sql);
                if (!$result) {
                    die($conn->error);
                }
                if ($result->num_rows > 0) {
                    $rtn = array();
                    $rtn["status"] = false;
                    $rtn["errorCode"] = "刪除失敗，資料庫異常";
                    $rtn["data"] = "";
                } else {
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "成功刪除此版塊";
                }
            }
        }
    }
    echo json_encode($rtn);
}