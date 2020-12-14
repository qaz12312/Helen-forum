<?php
	/*
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showAuthority";
    cmd["account"] = "00757007";
    
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status = true:
    dataDB.errorCode = ""
    dataDB.data // 0(訪客)、1(一般使用者)、2(版主)、3(admin)
    如果是版主: dataDB.data.boardName[0] //旅遊
                dataDB.data.boardName[1] //星座
                .....
	*/
    function doShowAuthority($input){
        global $conn;
        $rtn = array();
        $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='".$input['account']."'";
        $arr = array();
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $sql="SELECT `IsAdmin` FROM `Users` WHERE `UserID`='".$input['account']."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                $rtn = successCode(0);
            }else if($result[0]){
                $rtn = successCode(3);
            }else{
                $rtn = successCode(1);
            }
        }
        else{
            $arr = array(0=>2,"boardName"=>$result);
            $rtn = successCode($arr);
        }
		echo json_encode($rtn);
    }
?>