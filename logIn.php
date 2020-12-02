<!-- 
前端 to 後端:
let cmd = {};
cmd["act"] = "logIn";
cmd["account"] = "00857210@email.ntou.edu.tw";
cmd["password"] = "123456789";

後端 to 前端:
dataDB = JSON.parse(data);
dataDB.status
若 status = true:
    dataDB.errorCode = ""
    dataDB.data[0] // UserID:"00857210@email.ntou.edu.tw"
    dataDB.data[1] // Permissions:1
    dataDB.data[2] // Color:"#ffffff"
    dataDB.data[3] // Nickname:"cook"
否則
    dataDB.errorCode = "找不到會員"
    dataDB.data = "" 
-->

<?php
    function doLogIn($input){
    	global $conn;
    	$sql="SELECT `UserID`,`Permissions`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
	    $result = $conn->query($sql);
	    if(!$result){
	        die($conn->error);
	    }
	    if($result->num_rows <= 0){
	        $rtn = array();
	        $rtn["status"] = false;
	        $rtn["errorCode"] = "找不到會員";
	        $rtn["data"] = "";
	    }
	    else{
	        $row=$result->fetch_row();
	        $rtn = array();
	        $rtn["status"] = true;
	        $rtn["errorCode"] = "";
	        $rtn["data"] =$row;
	    }
	    echo json_encode($rtn);
    }
?>
