<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "browseAuthority";
	cmd["account"] = "00857210";
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data.permissions // Permission:1
		dataDB.data.color // Color:"#ffffff"
		dataDB.data.nickname // NickName:"00857210"
		dataDB.data.boardName // BoardName
		(
			dataDB.data.boardName[0]
			dataDB.data.boardName[1]
            .....
        )
	否則
		dataDB.errorCode = "This account(00857210@mail.ntou.edu.tw) does not exist" 
		dataDB.data = "" 
	*/
    function doBrowseAuthority($input){
        global $conn;
    	$sql="SELECT `Permissions`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."'";
	    $result = $conn->query($sql);
	    if(!$result){
	        die($conn->error);
	    }
	    if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "This account(".$input['account'].") does not exist";
            $rtn["data"] = "";
	    }
	    else{
	        $row=$result->fetch_row();
	        $rtn = array();
	        $rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"]["permissions"] =$row[0]["Permissions"];
			$rtn["data"]["color"] =$row[0]["Color"];
			$rtn["data"]["nickname"] =$row[0]["Nickname"];

			$sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='".$input['account']."'";
			$result = $conn->query($sql);
				if(!$result){
				die($conn->error);
			}
			$row = array();
			
			for($i=0;$i<$result->num_rows;$i++){
				$row=$result->fetch_row();
				print_r($row);
                $rtn["data"]["boardName"][$i]=$row[0];
            }
        }
		echo json_encode($rtn);
    }
?>
