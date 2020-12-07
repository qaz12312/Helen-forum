<?php
    require_once("test.php"); //連線資料庫 

        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "TopArticleDelete";
			cmd["articleID"] = "1"
			cmd["boardName"] = "美食"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data[0]	// TopArticleID
				dataDB.data[1]  // title
            否則
                dataDB.data = ""
         */
        //global $input,$conn;	// 取消置頂
		$sqlcheck="SELECT `BoardName` FROM `Board` WHERE `BoardName`='".$input['boardName']."' AND `UserID`='".$input['account']."'";  
		$result=$conn->query($sqlcheck);
		if(!$result){
			die($conn->error);
		} 
		if($result->num_rows <= 0){
			$rtn = array();
			$rtn["status"] = false;
			$rtn["errorCode"] = "no permission";
			$rtn["data"] = "";
		}
        else{
			$updateSql="UPDATE `Board` SET `TopArticleID`= NULL WHERE `TopArticleID`='".$input['articleID']."'";
			$result=$conn->query($updateSql);
			if(!$result){
				die($conn->error);
			}
			$sql="SELECT `TopArticleID`, `Title` FROM `Board` JOIN `Article` ON Board.BoardName = Article.BlockName WHERE `TopArticleID`='".$input['articleID']."'";
            $result=$conn->query($sql);
			if(!$result){
				die($conn->error);
			}
            if($result->num_rows > 0){
				$rtn = array();
				$rtn["status"] = false;
				$rtn["errorCode"] = "Top article delete error";
				$rtn["data"] = "";
			}
			else{
				$row=$result->fetch_row();
				$rtn = array();
				$rtn["status"] = true;
				$rtn["errorCode"] = "Top article delete success";
				$rtn["data"] = $row;
			}
        }
        echo json_encode($rtn);
?>