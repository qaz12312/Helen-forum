<?php
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "addKeepDir";
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// UserID
				dataDB.data[1]	// DirID
				dataDB.data[2]	// DirName
            否則
                dataDB.data = ""
         */
        global $sql,$conn;
        $sql="SELECT `DirID`,`DirName` FROM `KeepDir` where `UserID` = $input['userID']";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "資料夾為空";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("DirID"=>"$row[0]","DirName"=>"$row[1]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>
