<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "reportPage";
    cmd["title"] = "Title"
    cmd["reason"] = "Reason"
    cmd["timer"] = "Times"

    後端 to 前端
    dataDB.status
    dataDB.errorCode
    若 status = true:
        dataDB.data[i]
        (
            dataDB.data[i].articleID
            dataDB.data[i].reason
            dataDB.data[i].articleName
        )
    否則
        dataDB.data = ""
    */
    require_once 'connectDB.php'; //連線資料庫 
        global $input,$conn;
        $sql="SELECT `Title`,`Reason`,`Times` FROM `Report` NATURAL JOIN `Article` WHERE `BlockID`='".$input['boardName']."'ORDER BY `Times` DESC ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "檢舉文章為空";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row\();
                $log=array("Title"=>"$row[0]","Reason"=>"$row[1]";
                $arr[$i]=$log;a
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>


