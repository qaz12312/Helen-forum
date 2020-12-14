<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showDirList";

	後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[i]	// 資料夾名稱
		(
			dataDB.data[0]
			dataDB.data[1]
			...
		)
	否則
		dataDB.errorCode = "使用者沒有建立資料夾";
		dataDB.data = ""
	*/
    function doShowDirList($input){
        global $conn;
        $sql="SELECT `DirName` FROM `KeepDir` where `UserID` = '".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "使用者沒有建立資料夾";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $arr[$i]=$row[0];
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>
