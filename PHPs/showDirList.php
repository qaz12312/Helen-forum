<?php
	/* 
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showDirList";
    cmd["account"] = "00757033"; //cmd["token"]

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "User didn't create any folder." / "Successfully show dirctionaryName list.";
		dataDB.data[i] = array形式 // 資料夾名稱
	否則
		dataDB.errorCode = "";
		dataDB.data = ""
	*/
    function doShowDirList($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT `DirName` FROM `KeepDir` where `UserID` = ?";
        $result = query($conn,$sql,array($user),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("User didn't create any folder.", array());
        }
        else{
            $arr=array();
		    for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=$row[0];
            }
            $rtn = successCode("Successfully show dirctionaryName list.",$arr);
        }
        echo json_encode($rtn);
    }
?>
