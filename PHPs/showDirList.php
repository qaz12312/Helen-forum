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
		dataDB.info = ""
		dataDB.data[i]	// 資料夾名稱
	否則
		dataDB.errorCode = "User didn't create any folder.";
		dataDB.data = ""
	*/
    function doShowDirList($input){
        global $conn;
        $sql="SELECT `DirName` FROM `KeepDir` where `UserID` = ?";
        $arr = array($input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("User didn't create any folder.");
        }
        else{
            $arr=array();
		for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=array("dirName"=>$row[0]);
            }
            $rtn = successCode("Successfully show dirctionaryName list.",$arr);
        }
        echo json_encode($rtn);
    }
?>
