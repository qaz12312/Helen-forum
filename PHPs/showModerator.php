<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showModerator";

    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = ""
        dataDB.data[i] //有i筆版資訊
        (
        dataDB.data[i].account 
        dataDB.data[i].userColor 
        dataDB.data[i].boardName 
        ) 
    否則
        dataDB.errorCode = "Failed to show Moderator. "
        dataDB.data = ""
    */
    function doShowModerator($input){
        global $conn;
        $sql="SELECT `UserID`, `Color`, `BoardName` FROM `Board` NATURAL JOIN `Users` WHERE `UserID` NOT IN('admin') order by `UserID` ASC `BoardName` ASC";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("this system didn't have board.");
        }
        else{
            $arr=array();
            // foreach($result as $row){
            for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=array("account"=>$row[0],"userColor"=>$row[1],"boardName"=>$row[2]);
            }
            $rtn = successCode("Successfully show board's manager list.",$arr);
        }
        echo json_encode($rtn);
    }
?>
