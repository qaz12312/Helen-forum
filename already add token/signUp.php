<?php
	/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "creatAccount";
    cmd["account"] = "00757007";
    cmd["password"] = "00757007";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[0] // token:"c93b3e8ab496d786030fbf8a17c3da51"
		dataDB.data[1] // color:"#ffffff"
		dataDB.data[2] // nickname:"00857210"
    否則
        dataDB.errorCode = "Account has been registered." / "Failed to register,Database exception."
        dataDB.data = "" 
	*/
    function doCreatAccount($input){
    	global $conn;
    	$sql="SELECT `UserID` FROM `Users` WHERE `UserID`=?";
        $arr = array($input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount > 0){
            errorCode("Account has been registered.");
        }
        else{
            $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Color`,`Nickname`) VALUES(?,?,?,?)";
            $arr = array($input['account'], $input['password'],"#ffffff",$input['account']);
            query($conn,$sql,$arr,"INSERT");
        
            $sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`=? AND `Password`=?";
            $arr = array($input['account'], $input['password']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to register,Database exception.");
            }
            else{
                // $str = $result[0]."helen";
                // $token=md5($str);
                // $_SESSION[$token] = array("account"=>$row[0],"permission"=>$row[1]);
                $rtn = successCode($result);
            }
        }
        echo json_encode($rtn);
    }
?>