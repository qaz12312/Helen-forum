<?php
    //require_once 'connectDB.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "showNotice";
			cmd["account"] = "UserID"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// Time
				dataDB.data[1]	// Content
            否則
                dataDB.data = ""
         */
    function doShowNotification($input){
        global $conn;
        $sql="SELECT `Times`,`Content`,`UserID` FROM `Notice` WHERE `UserID`='".$input['account']."' order by `Times`DESC ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "沒有通知";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("Times"=>"$row[0]","Content"=>"$row[1]","userid"=>"$row[2]");
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