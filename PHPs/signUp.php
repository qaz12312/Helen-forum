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
        dataDB.data[0] // account:"00757007"
		dataDB.data[1] // color:"#ffffff"
		dataDB.data[2] // nickname:"00857210"
    否則
        dataDB.errorCode = "Account has been registered." / "Failed to register,Database exception."
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
            $rtn["errorCode"] = "Account has been registered.";
            $rtn["data"] = "";
        }
        else{
            $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Color`,`Nickname`) VALUES('".$input['account']."','".$input['password']."','\#ffffff','".$input['account']."')";
            $resultNew=$conn->query($sql);
            if(!$resultNew){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Failed to register,Database exception.";
                $rtn["data"] = "";
            }
            else{
                $row=$result->fetch_row();
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"][0] =$row[0];
                $rtn["data"][1] =$row[1];
                $rtn["data"][2] =$row[2];
            }
        }
        echo json_encode($rtn);
    }
?>