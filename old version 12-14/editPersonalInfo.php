<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editPersonalInfo";
    cmd["option"] = "password" / "nickname" / "color";
    cmd["account"] = "00757007";
    cmd["new"] = "987654321" / "beauty cook" / "\#028d5f";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
         dataDB.status = true
        dataDB.errorCode = ""
        dataDB.data = "success to change the (password/nickname/color)"
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "Cannot find the user.Failed to Update personal information in (password/nickname/color) .You need to login again." / 
        "Failed to Update personal information in (password/nickname/color) .You need to login again."/
        dataDB.data = "" 
	*/
    switch($input["option"]){
        case "password": // 修改密碼
            $optionAttr = "Password";
            break;
        case "nickname": // 修改暱稱
            $optionAttr = "Nickname";
            break;
        case "color": // 修改頭貼
            $optionAttr = "Color";
            break;
    }
    doChangeInfo($input,$optionAttr);
?>

<?php
    function doChangeInfo($input,$optionAttr){
        global $conn;
        $sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Cannot find the user.Failed to Update personal information in ".$input["option"].".You need to login again.";
            $rtn["data"] = "";
        }
        else{
            $sql="UPDATE `Users` SET `".$optionAttr."`='".$input['new']."' WHERE `UserID` ='".$input['account']."'";
            $result=$conn->query($sql);
            if(!$result){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Failed to Update personal information in ".$input["option"].".You need to login again.";
                $rtn["data"] = "";
                die($conn->error);
            }else{
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = "Success to change the ".$input["option"];
            }
        }
        echo json_encode($rtn);
    }
?>