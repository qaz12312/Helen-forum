<?php
	/*
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "browseAuthority";
    cmd["account"] = "00757007";
    
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status = true:
    dataDB.errorCode = ""
    如果是版主: dataDB.data.boardName[0] //旅遊
                dataDB.data.boardName[1] //星座
                .....
    其他: dataDB.data // 0(訪客)、1(一般使用者)、3(admin)
	*/
    function doBrowseAuthority($input){
        global $conn;
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='".$input['account']."'";
            $result = $conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $sql="SELECT `IsAdmin` FROM `Users` WHERE `UserID`='".$input['account']."'";
                $result2 = $conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($result2->num_rows <= 0){
                    $rtn["data"] = 0;
                }else if($result2[0]){
                    $rtn["data"] = 3;
                }else{
                    $rtn["data"] = 1;
                }
            }
            else{
                $row = array();
                for($i=0;$i<$result->num_rows;$i++){
                    $row=$result->fetch_row();
                    $rtn["data"]["boardName"][$i]=$row[0];
                }
            }
		echo json_encode($rtn);
    }
?>