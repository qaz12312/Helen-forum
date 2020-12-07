<?php
	/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "creatAccount";
    cmd["account"] = 00857210;
    cmd["password"] = 00857210;

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[0] // token:"c93b3e8ab496d786030fbf8a17c3da51"
		dataDB.data[1] // color:"#ffffff"
		dataDB.data[2] // nickname:"00857210"
    否則
        dataDB.errorCode = "帳號已註冊" / "資料庫異常，註冊失敗"
        dataDB.data = "" 
	*/
    function doCreatAccount($input){
    	global $conn;
    	$sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "帳號已註冊";
            $rtn["data"] = "";
        }
        else{
            $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Permission`,`Color`,`Nickname`) VALUES('".$input['account']."','".$input['password']."',1,'\#ffffff','".$input['account']."')";
            $resultNew=$conn->query($sql);
            if(!$resultNew){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`Permission`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "資料庫異常，註冊失敗";
                $rtn["data"] = "";
            }
            else{
                $row=$result->fetch_row();
                $str = $row[0]."helen";
                $token=md5($str);
                $_SESSION[$token] = array("account"=>$row[0],"permission"=>$row[1]);
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"][0] =$token;
                $rtn["data"][1] =$row[2];
                $rtn["data"][2] =$row[3];
            }
        }
        echo json_encode($rtn);
    }
?>
