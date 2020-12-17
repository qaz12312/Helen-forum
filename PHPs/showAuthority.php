<?php
	/*
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showAuthority";
    cmd["account"] = "00757007";
    
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status = true:
    dataDB.info = ""
    dataDB.data.permission // 0(訪客)、1(一般使用者)、2(版主)、3(admin)
    如果是2 or 3: dataDB.data.boardName[0] //旅遊
                dataDB.data.boardName[1] //星座
                .....
	*/
    function doShowAuthority($input){
        global $conn;
        $rtn = array();
        $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`=? AND `UserID` not in ('admin')";
        $arr = array($input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $sql="SELECT `IsAdmin` FROM `Users` WHERE `UserID`=?";
            $arr = array($input['account']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                $rtn = successCode("",array("permission"=>0));
            }else if($result[0][0]){
                $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='admin'";
                $result = query($conn,$sql,array(),"SELECT");
                $rtn = successCode("",array("permission"=>3,"boardName"=>$result));
            }else{
                $rtn = successCode("",array("permission"=>1));
            }
        }
        else{
            $arr = array("permission"=>2,"boardName"=>$result);
            $rtn = successCode("",$arr);
        }
		echo json_encode($rtn);
    }
?>