<?php
    require_once 'connectDB.php'; //連線資料庫 
/* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// BoardName
				dataDB.data[1]	// UserID
				dataDB.data[2]	// Rule
				dataDB.data[3]	// TopArticleID
            否則
                dataDB.data = ""
         */
        $sql="DELETE FROM `Board` WHERE `BoardName` = $input["boardName"]  AND `Rule` = $input["rule"] ";
        $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "刪除失敗，資料庫異常";
            $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
    }

?>