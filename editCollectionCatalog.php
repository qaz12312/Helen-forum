<?php
    /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "addKeepDir";
			cmd["userID"] = "UserID"
            cmd["dirID"] = "DirID"
            cmd["dirName"] ="我喜歡的"

        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data[0]	// BoardID
				dataDB.data[1]	// BoardName
				dataDB.data[2]	// UserID
				dataDB.data[3]	// Rule
				dataDB.data[4]	// TopArticleID
            否則
                dataDB.data = ""
         */
        $sql="UPDATE `Board` SET Rule='".$input['rule']."'".$input['userID']."'";
        $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "註冊失敗，資料庫異常";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] = $new[0];
        }

?>