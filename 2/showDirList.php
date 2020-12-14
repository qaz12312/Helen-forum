<?php
	/* 
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showDirList";
    cmd["account"] = "00757033";

    後端 to 前端:
    dataDB = JSON.parse(data);
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
		dataDB.errorCode = "User didn't create any folder.";
		dataDB.data = ""
	*/
    function doShowDirList($input){
        global $conn;
        $sql="SELECT `DirName` FROM `KeepDir` where `UserID` = '".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($resultCount <= 0){
            errorCode("User didn't create any folder.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row=$result->fetch_row();
                $arr[$i]=$row[0];
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>
