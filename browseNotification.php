<?php
        require_once 'connectDB.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "browseNotification";
            cmd["account"] = "UserID"
			cmd["timer"] = "Times"
            cmd["content"] = "Content"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// Times
				dataDB.data[1]	// Content
            否則
                dataDB.data = ""
         */
        global $input,$conn;
        $sql="SELECT `Times`,`Content` FROM  `Notice` WHERE `UserID`='".$input['account']."' ORDER BY `Times` DESC";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無通知";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("Time"=>"$row[0]","Content"=>"$row[1]";
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>