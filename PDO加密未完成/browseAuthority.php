<?php
	/*
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "browseAuthority";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data.permission // permission:1
		dataDB.data.boardName // boardName OR 空array
		(
			dataDB.data.boardName[0] //旅遊
			dataDB.data.boardName[1] //星座
            .....
        )
	否則
		dataDB.errorCode = "You don't have permission to do this action."
		dataDB.data = "" 
	*/
    function doBrowseAuthority($input){
        global $conn;
        $token =$input['token'];
        if(!isset($_SESSION[$token])){
           $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "You don't have permission to do this action.";
            $rtn["data"] = "";
        }else{
            $userInfo = $_SESSION[$token];
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"]["permission"] =$userInfo['permission'];
            $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='".$userInfo['account']."'";
            $result = $conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn["data"]["boardName"] = array();
            }
            else{
                $row = array();
                for($i=0;$i<$result->num_rows;$i++){
                    $row=$result->fetch_row();
                    $rtn["data"]["boardName"][$i]=$row[0];
                }
            }
        }
		echo json_encode($rtn);
    }
?>