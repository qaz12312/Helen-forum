<?php
            /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "showModerator";

            後端 to 前端
            dataDB.state
            若 state = true:
            dataDB.errorCode = ""
            dataDB.data[i] //有i筆版資訊
            (
                        dataDB.data[i].account 
                        dataDB.data[i].userColor 
                        dataDB.data[i].boardName 
            ) 
            否則
            dataDB.errorCode = "沒有指明版主"
            dataDB.data = ""
            */
    function doShowModerator($input){
        global $conn;
        $sql ="SELECT `UserID`, `Color`, `BoardName` FROM `Board` NATURAL JOIN `Users` order by `UserID` ASC " ;
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "沒有指明版主";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("account"=>"$row[0]","userColor"=>"$row[1]","boardName"=>"$row[2]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>
