<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "browseAuthority";
	cmd["account"] = "00857210@mail.ntou.edu.tw";
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[0] // Permissions:1
		dataDB.data[1] // BoardName
		(
            dataDB.data[1][0]
            .....
        )
	否則
		dataDB.errorCode = "This account(00857210@mail.ntou.edu.tw) does not exist" 
		dataDB.data = "" 
	*/
    function doBrowseAuthority($input){
        global $conn;
    	$sql="SELECT `Permissions` FROM `Users` WHERE `UserID`='".$input['account']."'";
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
            $rtn["data"][0] =$row[0];

			$sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='".$input['account']."'";
			$result = $conn->query($sql);
				if(!$result){
				die($conn->error);
			}
			$row = array();
			
			for($i=1;$i<=$result->num_rows;$i++){
				$row=$result->fetch_row();
				print_r($row);
                $rtn["data"][1][$i]=$row[0];
            }
        }
		echo json_encode($rtn);
    }
?>