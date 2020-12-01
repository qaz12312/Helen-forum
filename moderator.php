<?php
    require_once 'connectDB.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "reportPage";
			cmd["BoardName"] = "美食版"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[i]
				(
                dataDB.data[i].articleID
				dataDB.data[i].reason
				)
            否則
                dataDB.data = ""
         */
        global $input,$conn;
        $sql="SELECT `Title`,`Reason` FROM `Report` NATURAL JOIN `Article` WHERE `BlockID`='".$input['BoardName']."'";
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

<?php
    require_once 'noSecurity.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "deleteReport";
			cmd["articleID"] = "aas987dslk0980983234"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data="成功"	// success
            否則
                dataDB.data = ""
         */
        global $input,$conn;
        $sql="DELETE FROM `Report` WHERE `ArticleID`='"."$input['articleID']";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "刪除文章失敗";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "刪除文章成功";
            $rtn["data"] =$row;
        }
        echo json_encode($rtn);
?>
