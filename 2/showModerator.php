<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showModerator";

    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
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
        $sql="SELECT `UserID`, `Color`, `BoardName` FROM `Board` NATURAL JOIN `Users` order by `UserID` ASC " ;
        $arr = array();
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Failed to show Moderator.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row=$result->fetch_row();
                $log=array("account"=>"$row[0]","userColor"=>"$row[1]","boardName"=>"$row[2]");
                $arr[$i]=$log;
            }
            $rtn = successCode($arr);
        }
        echo json_encode($rtn);
    }
?>
