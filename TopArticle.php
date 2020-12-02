<?php
    require_once 'noSecurity.php'; //連線資料庫 

        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "TopArticleChange";
			cmd["articleID"] = "aaad94i30jdsfg3435"
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
				dataDB.data[5]	// ArticleID
            否則
                dataDB.data = ""
         */
        global $input,$conn;	// 置頂
        $sql="SELECT `TopArticleID`, `Title` FROM `Board` NATURAL JOIN `Article` WHERE `TopArticleID`='".$input['articleID']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "置頂失敗";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "置頂成功";
            $rtn["data"] =$row;
        }
        echo json_encode($rtn);
?>

<?php
    require_once 'noSecurity.php'; //連線資料庫 

        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "TopArticleDelete";
			cmd["articleID"] = "aaad94i30jdsfg3435"
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
				dataDB.data[5]	// ArticleID
            否則
                dataDB.data = ""
         */
        global $input,$conn;	// 取消置頂
		$var = NULL;
        $sql="UPDATE `Board` set `TopArticleID`='".$var."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "置頂失敗";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "置頂成功";
            $rtn["data"] =$row;
        }
        echo json_encode($rtn);
?>