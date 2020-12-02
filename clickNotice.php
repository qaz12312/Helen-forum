<?php
 //點通知 PRIMARY KEY ('UserID', 'Time', 'Content')
    /* 前端 to 後端:
            cmd["UserID"] = "UserID";
            cmd["Time"] = "Time";
            cmd["detail"] = "Content";
        */
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 state = true:
                dataDB.data[0] // success or not
            否則
                dataDB.data = ""
         */
    $sql ="DELETE FROM  `Notice` where `UserID`=$cmd->UserID, `Time`=$input[`Time`],`Content`=$input[`detail`]" ;
    global $conn;
    $result=$conn->query($sql);
    if(!$result or mysql_query( $sql, $conn )){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "沒有";
        $rtn["data"] = "";
    }
    else{
        $arr=array();
        for($i=0;$i<$result->num_rows;$i++){
            $row=$result->fetch_row();
            $log=array("title"=>"$row[0]","blockName"=>"$row[1]","like"=>"$row[2]","keepID"=>"$row[3]");
            $arr[$i]=$log;
        }
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] =$arr;
    }
    echo json_encode($rtn);
?>